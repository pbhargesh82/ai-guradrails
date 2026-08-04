import { Layout } from "@/components/Layout";
import { MdxRenderer } from "@/components/MdxRenderer";
import { getAllManualSections, getManualSection } from "@/lib/content";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{ section: string }>;
}

export async function generateStaticParams() {
  const sections = getAllManualSections();
  return sections.map((section) => ({ section: section.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { section } = await params;
  const item = getManualSection(section);
  if (!item) return { title: "Not Found" };
  return {
    title: item.title,
    description: item.description,
  };
}

export default async function ManualPage({ params }: PageProps) {
  const { section } = await params;
  const item = getManualSection(section);
  if (!item) notFound();

  return (
    <Layout>
      <MdxRenderer source={item.content} />
    </Layout>
  );
}
