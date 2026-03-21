type ProcessingStatus = "uploaded" | "processing" | "done" | "error";

const styles: Record<ProcessingStatus, string> = {
  uploaded: "bg-slate-100 text-slate-600",
  processing: "bg-yellow-100 text-yellow-700",
  done: "bg-green-100 text-green-700",
  error: "bg-red-100 text-red-600",
};

const labels: Record<ProcessingStatus, string> = {
  uploaded: "Uploaded",
  processing: "Processing…",
  done: "Ready",
  error: "Error",
};

interface Props {
  status: ProcessingStatus;
}

export default function ProcessingStatusBadge({ status }: Props) {
  return (
    <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${styles[status]}`}>
      {labels[status]}
    </span>
  );
}
