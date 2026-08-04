import { Layout } from "@/components/Layout";
import { MdxRenderer } from "@/components/MdxRenderer";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Roadmap",
  description: "Future milestones for the AI Guardrails project.",
};

export default function RoadmapPage() {
  const raw = fs.readFileSync(
    path.join(process.cwd(), "content", "roadmap.md"),
    "utf8"
  );
  const { content } = matter(raw);

  return (
    <Layout>
      <MdxRenderer source={content} />
    </Layout>
  );
}
