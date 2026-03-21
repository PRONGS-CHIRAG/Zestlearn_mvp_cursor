import UploadDropzone from "@/components/documents/UploadDropzone";
import EmptyState from "@/components/shared/EmptyState";

interface Props {
  workspaceId: string;
}

export default function DocumentsPanel({ workspaceId }: Props) {
  // TODO: fetch document list via Convex query
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-slate-900">Documents</h2>
      <UploadDropzone workspaceId={workspaceId} onUpload={() => {}} />
      <EmptyState
        title="No documents yet"
        description="Upload a document above to ground recommendations in your company context."
      />
    </div>
  );
}
