import { Layout } from "@/components/Layout";
import { MdxRenderer } from "@/components/MdxRenderer";
import { getPlaybook, extractToc } from "@/lib/content";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Playbook",
};

export default function PlaybookPage() {
  const playbook = getPlaybook();
  const toc = extractToc(playbook.content);

  return (
    <Layout toc={toc}>
      <MdxRenderer source={playbook.content} />
    </Layout>
  );
}
