import { Layout } from "@/components/Layout";
import { MdxRenderer } from "@/components/MdxRenderer";
import { getPlaybook } from "@/lib/content";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Playbook",
};

export default function PlaybookPage() {
  const playbook = getPlaybook();

  return (
    <Layout>
      <MdxRenderer source={playbook.content} />
    </Layout>
  );
}
