import { Suspense } from "react";
import { redirect } from "next/navigation";
import WorkspaceShell from "@/components/workspace/WorkspaceShell";
import WorkspaceLoading from "./loading";
import { requireOwnership } from "@/lib/auth/requireSession";

export const dynamic = "force-dynamic";

interface WorkspacePageProps {
  params: Promise<{ workspaceId: string }>;
}

export default async function WorkspacePage({ params }: WorkspacePageProps) {
  const { workspaceId } = await params;

  const session = await requireOwnership(workspaceId);
  if (!session) {
    redirect("/login");
  }

  return (
    <Suspense fallback={<WorkspaceLoading />}>
      <WorkspaceShell workspaceId={workspaceId} />
    </Suspense>
  );
}

export async function generateMetadata({ params }: WorkspacePageProps) {
  const { workspaceId } = await params;
  return {
    title: `Workspace ${workspaceId} | ZestLearn`,
    description: "Your AI assessment workspace dashboard",
  };
}
