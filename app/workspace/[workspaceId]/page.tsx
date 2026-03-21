import { Suspense } from "react";
import WorkspaceShell from "@/components/workspace/WorkspaceShell";
import WorkspaceLoading from "./loading";

interface WorkspacePageProps {
  params: Promise<{ workspaceId: string }>;
}

// Mock function to fetch workspace data - replace with actual API call
async function getWorkspaceData(workspaceId: string) {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 100));

  // In production, this would fetch from your API/database
  return {
    id: workspaceId,
    companyName: "Acme Biotech",
    createdAt: new Date().toISOString(),
    status: "active" as const,
    assessment: {
      companyType: "biotech",
      department: "R&D",
      bottleneck: "Manual data analysis processes",
    },
  };
}

export default async function WorkspacePage({ params }: WorkspacePageProps) {
  const { workspaceId } = await params;

  // Fetch workspace data at the route level
  const workspaceData = await getWorkspaceData(workspaceId);

  return (
    <Suspense fallback={<WorkspaceLoading />}>
      <WorkspaceShell workspaceId={workspaceId} initialData={workspaceData} />
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
