import { Layout } from "@/components/Layout";
import { MdxRenderer } from "@/components/MdxRenderer";
import { getAllGuides, getGuide } from "@/lib/content";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{ agent: string }>;
}

export async function generateStaticParams() {
  const guides = getAllGuides();
  return guides.map((guide) => ({ agent: guide.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { agent } = await params;
  const guide = getGuide(agent);
  if (!guide) return { title: "Not Found" };
  return {
    title: `${guide.title} Guide`,
    description: guide.description,
  };
}

export default async function GuidePage({ params }: PageProps) {
  const { agent } = await params;
  const guide = getGuide(agent);
  if (!guide) notFound();

  return (
    <Layout>
      <MdxRenderer source={guide.content} />
    </Layout>
  );
}
