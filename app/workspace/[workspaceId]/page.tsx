import WorkspaceShell from "@/components/workspace/WorkspaceShell";

interface WorkspacePageProps {
  params: { workspaceId: string };
}

export default async function WorkspacePage({ params }: WorkspacePageProps) {
  const { workspaceId } = params;

  return <WorkspaceShell workspaceId={workspaceId} />;
}
