import fs from "fs";
import path from "path";
import { remark } from "remark";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeHighlight from "rehype-highlight";
import rehypeStringify from "rehype-stringify";

const postsDirectory = path.join(process.cwd(), "content/blog");
const postsJsonPath = path.join(postsDirectory, "posts.json");

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  tags: string[];
  readTime: string;
}

export interface TocItem {
  id: string;
  text: string;
  level: number;
}

export interface BlogPostWithHtml extends BlogPost {
  content: string;
  contentHtml: string;
  toc: TocItem[];
}

interface PostEntry {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  tags: string[];
  readTime: string;
}

/** Read the posts registry from posts.json. */
function readPostsJson(): PostEntry[] {
  const raw = fs.readFileSync(postsJsonPath, "utf8");
  return JSON.parse(raw) as PostEntry[];
}

/** Get metadata for all posts, sorted by date (newest first). */
export function getAllPosts(): BlogPost[] {
  const entries = readPostsJson();

  return entries
    .map((entry) => ({
      slug: entry.slug,
      title: entry.title,
      date: entry.date,
      excerpt: entry.excerpt,
      tags: entry.tags ?? [],
      readTime: entry.readTime ?? "",
    }))
    .sort((a, b) => (a.date > b.date ? -1 : 1));
}

/** Get all slugs for static generation. */
export function getAllSlugs(): string[] {
  return readPostsJson().map((entry) => entry.slug);
}

/** Get a single post by slug, with HTML-rendered content. */
export async function getPostBySlug(slug: string): Promise<BlogPostWithHtml | null> {
  const entries = readPostsJson();
  const entry = entries.find((e) => e.slug === slug);

  if (!entry) return null;

  const mdPath = path.join(postsDirectory, `${slug}.md`);

  if (!fs.existsSync(mdPath)) return null;

  const content = fs.readFileSync(mdPath, "utf8");
  const processedContent = await remark()
    .use(remarkGfm)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeHighlight, { detect: true })
    .use(rehypeStringify, { allowDangerousHtml: true })
    .process(content);
  let contentHtml = processedContent.toString();

  // Add language labels to code blocks
  contentHtml = contentHtml.replaceAll(
    /<pre><code class="hljs language-(\w+)">/g,
    (_match, lang: string) => {
      const displayLang = lang.charAt(0).toUpperCase() + lang.slice(1);
      return `<pre><div class="code-lang-label" data-lang="${lang}">${displayLang}</div><code class="hljs language-${lang}">`;
    }
  );

  // Wrap images in <figure> with auto-numbered captions
  let figureCount = 0;
  contentHtml = contentHtml.replaceAll(
    /<img src="([^"]+)"(?: alt="([^"]*)")?\s*\/?>/g,
    (_match, src: string, alt: string | undefined) => {
      figureCount++;
      const rawAlt = alt || '';
      // Support ![alt|width](url) syntax, e.g. ![Photo|300px] or ![Photo|50%]
      const pipeMatch = rawAlt.match(/^(.*?)\|(\d+(?:px|%|rem|em|vw))$/);
      const caption = pipeMatch ? pipeMatch[1].trim() : rawAlt;
      const widthStyle = pipeMatch ? ` style="max-width:${pipeMatch[2]}"` : '';
      const figId = `fig-${figureCount}`;
      return [
        `<figure id="${figId}" class="blog-figure">`,
        `<img src="${src}" alt="${caption}"${widthStyle} />`,
        `<figcaption><span class="fig-number">Fig. ${figureCount}</span>${caption ? ` — ${caption}` : ''}</figcaption>`,
        `</figure>`
      ].join('');
    }
  );

  // Extract headings and add IDs
  const toc: TocItem[] = [];
  contentHtml = contentHtml.replaceAll(
    /<h([23])>(.*?)<\/h[23]>/g,
    (_match, level: string, text: string) => {
      const plainText = text.replaceAll(/<[^>]+>/g, "");
      const id = plainText
        .toLowerCase()
        .replaceAll(/[^\w\s-]/g, "")
        .replaceAll(/\s+/g, "-")
        .replaceAll(/-+/g, "-")
        .trim();
      toc.push({ id, text: plainText, level: Number.parseInt(level) });
      return `<h${level} id="${id}"><span class="heading-label"></span>${text}</h${level}>`;
    }
  );

  return {
    slug: entry.slug,
    title: entry.title,
    date: entry.date,
    excerpt: entry.excerpt,
    tags: entry.tags ?? [],
    readTime: entry.readTime ?? "",
    content,
    contentHtml,
    toc,
  };
}
