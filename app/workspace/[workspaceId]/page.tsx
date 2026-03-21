import { Suspense } from "react";
import WorkspaceShell from "@/components/workspace/WorkspaceShell";
import WorkspaceLoading from "./loading";

interface WorkspacePageProps {
  params: Promise<{ workspaceId: string }>;
}

export default async function WorkspacePage({ params }: WorkspacePageProps) {
  const { workspaceId } = await params;

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
