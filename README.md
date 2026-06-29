# mitaa.dev

> Personal portfolio and blog of a Junior Embedded Systems Engineer & Software Developer.
> Built with Next.js, TypeScript, Tailwind CSS, and a love for clean, minimal design.

---

## Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Features](#features)
- [Project Structure](#project-structure)
- [Architecture](#architecture)
  - [Content Management](#content-management)
  - [Blog System](#blog-system)
  - [Projects System](#projects-system)
  - [GitHub Integration](#github-integration)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Development](#development)
  - [Build](#build)
- [Configuration](#configuration)
- [Content Guide](#content-guide)
  - [Adding a Blog Post](#adding-a-blog-post)
  - [Adding a Project](#adding-a-project)
- [Comments & Social](#comments--social)
- [Deployment](#deployment)
- [Roadmap](#roadmap)
- [License](#license)

---

## Overview

**mitaa.dev** is a statically-generated portfolio website showcasing projects, technical blog posts, and GitHub activity. It is designed with a minimalist aesthetic, smooth scroll animations, and a focus on readability and performance.

The site is fully static — no database, no server runtime, no dynamic API routes at deploy time. Everything is pre-rendered at build time, making it perfect for hosting on GitHub Pages, Vercel, or any static CDN. voor

---

## Tech Stack

| Layer | Technology |
|---|---|
| **Framework** | [Next.js 16](https://nextjs.org/) (App Router) |
| **Language** | [TypeScript](https://www.typescriptlang.org/) |
| **Styling** | [Tailwind CSS v4](https://tailwindcss.com/) |
| **UI Primitives** | [shadcn/ui](https://ui.shadcn.com/) |
| **Animations** | [GSAP](https://greensock.com/gsap/) + [Motion](https://motion.dev/) |
| **Smooth Scroll** | [Lenis](https://lenis.studiofreight.com/) |
| **Markdown** | [Remark](https://remark.js.org/) + [Rehype](https://github.com/rehypejs/rehype) |
| **Syntax Highlighting** | [highlight.js](https://highlightjs.org/) |
| **Icons** | [Lucide React](https://lucide.dev/) |
| **Font** | [Inter](https://rsms.me/inter/) (Google Fonts) |
| **Build Output** | Static Export (`output: "export"`) |

---

## Features

### General
- ⚡ **Fully static** — zero runtime dependencies, instant page loads
- 🎨 **Minimalist light theme** — clean whites, subtle grays, green accents
- 📱 **Responsive** — optimized for mobile, tablet, and desktop
- 🔤 **Inter font** — crisp, modern typography with tight tracking
- ✨ **Scroll animations** — blur, fade, and slide effects via `animate-ui` primitives
- 📊 **Scroll progress bar** — subtle indicator at the top of the viewport
- 🧭 **Sticky table of contents** — auto-highlighting active section on blog posts

### Home Page (`/`)
- Bio section with staggered fade-in paragraphs
- Latest blog posts list with date and primary tag

### Projects (`/projects`)
- Curated projects from `content/projects/projects.json`
- Dynamically fetched public GitHub repos (deduplicated against curated projects)
- Category filter tabs (Embedded, Web, ML, Open Source, etc.)
- Live search by title, description, or tech stack
- Star/fork counts for GitHub-sourced projects
- Detail pages with rich markdown content, tech stack, features, and context

### Blog (`/blog`)
- Markdown-driven blog posts with frontmatter
- Auto-generated table of contents from `h2`/`h3` headings
- Syntax-highlighted code blocks with language labels
- Auto-numbered figure captions for images
- GitHub-flavored Markdown (tables, task lists, strikethrough)
- SEO-friendly metadata per post

### GitHub Integration
- Contribution calendar heatmap (via GitHub GraphQL API)
- Public repo listing with metadata (stars, forks, language, topics)

---

## Project Structure

```
mitaa.dev/
├── content/                    # All content source files
│   ├── blog/
│   │   ├── posts.json          # Blog post registry (metadata)
│   │   └── *.md                # Individual blog posts
│   └── projects/
│       ├── projects.json       # Curated project registry
│       └── *.md                # Project detail content
├── public/                     # Static assets
│   └── data/                   # Pre-fetched GitHub data (generated at build time)
│       ├── github-contributions.json
│       └── github-repos.json
├── scripts/
│   └── fetch-github-data.mjs   # Pre-build script to fetch GitHub data
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── blog/               # Blog list & post pages
│   │   ├── projects/           # Project list & detail pages
│   │   ├── layout.tsx          # Root layout (font, footer)
│   │   ├── page.tsx            # Home page
│   │   └── globals.css         # Global styles + prose-blog
│   ├── components/             # React components
│   │   ├── animate-ui/         # Animation primitives (Blur, Fade, Slide, etc.)
│   │   ├── DiscussOnX.tsx      # Link to X/Twitter discussion
│   │   ├── Footer.tsx
│   │   ├── GitHubContributions.tsx
│   │   ├── Navbar.tsx
│   │   ├── ScrollProgressBar.tsx
│   │   ├── TableOfContents.tsx
│   │   └── icons.tsx           # Custom SVG icons
│   ├── data/                   # Static data (skills, legacy project data)
│   ├── hooks/                  # Custom React hooks
│   ├── lib/                    # Utility libraries
│   │   ├── blog.ts             # Blog parsing & rendering
│   │   ├── github.ts           # GitHub API helpers + JSON readers
│   │   ├── projects.ts         # Project parsing & rendering
│   │   └── utils.ts            # cn() helper
│   └── ...
├── components.json             # shadcn/ui config
├── next.config.ts              # Next.js config (static export)
├── postcss.config.mjs          # PostCSS config
└── tsconfig.json               # TypeScript config
```

---

## Architecture

### Content Management

All content lives in the `content/` directory as plain files (JSON + Markdown). There is **no CMS, no database, and no API** for content. This makes the site:

- **Version-controlled** — content changes are Git commits
- **Portable** — move the folder, the content moves with it
- **Fast** — content is read at build time, never fetched at runtime

### Blog System

The blog uses a **registry + file** pattern:

1. **`content/blog/posts.json`** — a JSON array where each entry defines:
   - `slug` — URL segment (e.g., `"building-rtos-from-scratch"`)
   - `title` — display title
   - `date` — ISO date string (`"2026-01-15"`)
   - `excerpt` — short description for list views
   - `tags` — array of strings
   - `readTime` — human-readable string (e.g., `"12 min read"`)

2. **`content/blog/{slug}.md`** — the Markdown content for that post.

At build time, `lib/blog.ts`:
- Reads `posts.json` for metadata
- Reads the corresponding `.md` file for content
- Processes Markdown through Remark → Rehype → HTML
- Applies custom transforms:
  - Code block language labels
  - Image → `<figure>` with auto-numbered captions
  - Heading IDs for anchor links
  - Table of Contents extraction

### Projects System

Similar to the blog, projects use:

1. **`content/projects/projects.json`** — curated project metadata:
   - `slug`, `title`, `description`, `category`, `techStack[]`
   - `github`, `demo`, `featured`
   - `context`, `role`, `goal`, `features[]`

2. **`content/projects/{slug}.md`** — optional rich markdown content (Overview section).

Curated projects and GitHub-sourced projects are merged and deduplicated on the projects list page.

### GitHub Integration

Because the site uses static export (`output: "export"`), it cannot use API routes at runtime. Instead, GitHub data is fetched **at build time** by a pre-build script and written to JSON files in `public/data/`:

| File | Purpose |
|---|---|
| `public/data/github-contributions.json` | Contribution calendar data (last 52 weeks) |
| `public/data/github-repos.json` | Public repositories (name, description, stars, forks, language, topics) |

The script `scripts/fetch-github-data.mjs` runs automatically before every build (`npm run prebuild`). It reads the GitHub GraphQL API for contributions and the REST API for repos. The site then reads these JSON files at build time (server-side for repos, client-side for contributions).

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) 18+ (recommended: 20 LTS)
- [npm](https://www.npmjs.com/) 9+ or [pnpm](https://pnpm.io/)

### Installation

```bash
# Clone the repository
git clone https://github.com/MITCHEL-Development/mitaa.dev.git
cd mitaa.dev

# Install dependencies
npm install
```

### Development

```bash
# Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build

```bash
# Build for production (static export)
npm run build
```

This generates a static `out/` folder ready for deployment to any static host.

---

## Configuration

### Environment Variables

Create a `.env.local` file in the project root:

```env
# Required for pre-build GitHub data fetching
GITHUB_TOKEN=ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

To create a token:
1. Go to [GitHub Settings → Developer Settings → Personal Access Tokens](https://github.com/settings/tokens)
2. Generate a new token (classic) with **no scopes** required for public data, or `read:user` for private contributions
3. Copy the token into `.env.local`

> The token is only used at build time by `scripts/fetch-github-data.mjs`. It is never exposed to the client bundle. Without it, contributions data will be skipped (repos are public and will still be fetched).

---

## Content Guide

### Adding a Blog Post

1. Create a new Markdown file in `content/blog/`:
   ```bash
   touch content/blog/my-new-post.md
   ```

2. Add the post metadata to `content/blog/posts.json`:
   ```json
   {
     "slug": "my-new-post",
     "title": "My New Post",
     "date": "2026-04-23",
     "excerpt": "A short description of this post.",
     "tags": ["Web", "Tutorial"],
     "readTime": "5 min read"
   }
   ```

3. Write your content in `content/blog/my-new-post.md`:
   ```markdown
   ## Introduction

   Your content here...

   ```typescript
   const example = "code blocks are highlighted";
   ```

   ![Figure caption|400px](https://example.com/image.png)
   ```

4. Rebuild the site:
   ```bash
   npm run build
   ```

### Adding a Project

1. Add project metadata to `content/projects/projects.json`
2. (Optional) Create `content/projects/{slug}.md` for a detailed overview
3. Rebuild

---

## Comments & Social

This website does not host its own comment system. Instead, blog post discussions happen externally on **X (formerly Twitter)**.

### How it works

- Each blog post published on `mitaa.dev` is also shared as a post on **X**
- Readers can reply, quote, or discuss the post directly on that platform
- This keeps the website lightweight and static while still enabling community interaction

### Where to follow

- **X / Twitter**: Follow [@MITCHEL_Dev](https://x.com/MITCHEL_Dev) for new posts and updates *(replace with your actual handle)*
- **GitHub**: Star and fork the repo at [github.com/MITCHEL-Development/mitaa.dev](https://github.com/MITCHEL-Development/mitaa.dev)

> Want to self-host comments instead? The site is built to be extended. You can integrate Disqus, Cusdis, or a custom Supabase backend by adding a client-side comment component to `src/app/blog/[slug]/page.tsx`.

---

## E-commerce & Licensing

For selling digital products (such as software applications) and issuing license keys directly on the website, this project is integrated with [Lemon Squeezy](https://www.lemonsqueezy.com/).

### Why Lemon Squeezy?
Using Lemon Squeezy as a **Merchant of Record (MoR)** is highly recommended for static Next.js sites because:
1. **Global Tax/VAT Handling:** They automatically calculate, collect, and remit global software taxes so you don't have to worry about complex tax administration.
2. **Built-in Licensing:** It provides out-of-the-box software licensing (generating, validating, and managing license keys).
3. **No Customer Data Handling:** They safely store customer data (emails, billing info) and are fully GDPR/PCI compliant. You don't need to build or secure your own database.
4. **No Backend Required:** You don't need a custom server or complex webhooks just to generate a license key.

### Implementation Approach
1. **Products:** Add a `BuyButton` component linking to a Lemon Squeezy checkout overlay or hosted checkout page.
2. **Delivery:** After a successful payment, Lemon Squeezy automatically emails the customer their download link and generated license key.
3. **Validation:** Inside your sold application (e.g., a desktop app in Rust, C#, or Electron), implement a check against the [Lemon Squeezy License API](https://docs.lemonsqueezy.com/api/licenses) to verify the entered key.

---

## Deployment

### GitHub Pages

This site is configured for static export with `trailingSlash: true`, which is compatible with GitHub Pages:

```bash
npm run build
# Deploy the `out/` folder to the `gh-pages` branch
```

### Vercel

Vercel is the recommended host for Next.js projects. Simply connect your GitHub repo and Vercel will handle builds automatically.

> Make sure to add `GITHUB_TOKEN` as an environment variable in your Vercel project settings so the pre-build script can fetch contribution data.

### Other Static Hosts

Any host that can serve static HTML works: Netlify, Cloudflare Pages, AWS S3, etc. Just upload the contents of the `out/` folder.

---

## Roadmap

- [ ] Dark mode toggle
- [ ] RSS feed for blog posts
- [ ] Sitemap.xml generation
- [ ] Open Graph image generation
- [ ] Project image gallery
- [ ] Tag-based blog filtering
- [ ] Estimated reading time calculation (auto)
- [ ] Update `xPostUrl` fields in `content/blog/posts.json` with real tweet URLs

---

## License

This project is open source and available under the [MIT License](LICENSE).

Feel free to fork, clone, or use this as a template for your own portfolio. If you do, a shoutout or star on GitHub is always appreciated ⭐

---

<p align="center">
  Built with ❤️ by <a href="https://mitaa.dev">mitaa.dev</a>
</p>
