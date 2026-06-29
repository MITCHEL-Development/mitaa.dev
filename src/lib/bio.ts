import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import remarkGfm from "remark-gfm";
import remarkHtml from "remark-html";

const bioPath = path.join(process.cwd(), "content/bio.md");

export interface Bio {
  title: string;
  updated: string;
  /** One HTML string per paragraph (inline markdown rendered, no wrapping <p>). */
  paragraphs: string[];
}

/** Read the intro/bio text from content/bio.md. */
export function getBio(): Bio {
  const raw = fs.readFileSync(bioPath, "utf8");
  const { data, content } = matter(raw);

  const paragraphs = content
    .split(/\n\s*\n/)
    .map((block) => block.trim())
    .filter(Boolean)
    .map((block) =>
      remark()
        .use(remarkGfm)
        .use(remarkHtml)
        .processSync(block)
        .toString()
        .trim()
        // strip the wrapping <p> so the component controls paragraph styling
        .replace(/^<p>/, "")
        .replace(/<\/p>$/, "")
    );

  return {
    title: (data.title as string) ?? "mitaa.dev",
    updated: (data.updated as string) ?? "",
    paragraphs,
  };
}
