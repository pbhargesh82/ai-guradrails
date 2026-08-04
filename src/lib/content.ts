import fs from "fs";
import path from "path";
import matter from "gray-matter";

const contentDir = path.join(process.cwd(), "content");
const playbookPath = path.join(process.cwd(), "anti-ai-bloat-guardrails-playbook.md");

export interface ContentItem {
  slug: string;
  title: string;
  description: string;
  order: number;
  content: string;
}

function readMarkdownFile(filePath: string): Omit<ContentItem, "slug"> {
  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);
  return {
    title: (data.title as string) || "Untitled",
    description: (data.description as string) || "",
    order: (data.order as number) || 0,
    content,
  };
}

function listMarkdownFiles(dir: string): string[] {
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".md"))
    .sort();
}

export function getPlaybook(): ContentItem {
  const raw = fs.readFileSync(playbookPath, "utf8");
  const { content } = matter(raw);
  return {
    slug: "playbook",
    title: "Anti-AI-Bloat Guardrails Playbook",
    description: "Full reference for the three-layer guardrail system.",
    order: 0,
    content,
  };
}

export function getAllGuides(): ContentItem[] {
  const dir = path.join(contentDir, "guides");
  return listMarkdownFiles(dir).map((filename) => {
    const slug = filename.replace(/\.md$/, "");
    const item = readMarkdownFile(path.join(dir, filename));
    return { slug, ...item };
  }).sort((a, b) => a.order - b.order);
}

export function getGuide(slug: string): ContentItem | null {
  const filePath = path.join(contentDir, "guides", `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;
  const item = readMarkdownFile(filePath);
  return { slug, ...item };
}

export function getAllManualSections(): ContentItem[] {
  const dir = path.join(contentDir, "manual");
  return listMarkdownFiles(dir).map((filename) => {
    const slug = filename.replace(/\.md$/, "");
    const item = readMarkdownFile(path.join(dir, filename));
    return { slug, ...item };
  }).sort((a, b) => a.order - b.order);
}

export function getManualSection(slug: string): ContentItem | null {
  const filePath = path.join(contentDir, "manual", `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;
  const item = readMarkdownFile(filePath);
  return { slug, ...item };
}