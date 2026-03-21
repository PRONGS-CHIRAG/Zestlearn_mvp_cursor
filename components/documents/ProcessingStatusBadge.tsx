export type ProcessingStatus = "uploaded" | "uploading" | "processing" | "done" | "ready" | "error";

const styles: Record<ProcessingStatus, { bg: string; text: string; border: string; dot: string; animate: boolean }> = {
  uploaded: {
    bg: "bg-slate-500/10",
    text: "text-slate-400",
    border: "border-slate-500/20",
    dot: "bg-slate-400",
    animate: false,
  },
  uploading: {
    bg: "bg-blue-500/10",
    text: "text-blue-400",
    border: "border-blue-500/20",
    dot: "bg-blue-400",
    animate: true,
  },
  processing: {
    bg: "bg-amber-500/10",
    text: "text-amber-400",
    border: "border-amber-500/20",
    dot: "bg-amber-400",
    animate: true,
  },
  done: {
    bg: "bg-emerald-500/10",
    text: "text-emerald-400",
    border: "border-emerald-500/20",
    dot: "bg-emerald-400",
    animate: false,
  },
  ready: {
    bg: "bg-emerald-500/10",
    text: "text-emerald-400",
    border: "border-emerald-500/20",
    dot: "bg-emerald-400",
    animate: false,
  },
  error: {
    bg: "bg-red-500/10",
    text: "text-red-400",
    border: "border-red-500/20",
    dot: "bg-red-400",
    animate: false,
  },
};

const labels: Record<ProcessingStatus, string> = {
  uploaded: "Uploaded",
  uploading: "Uploading",
  processing: "Processing",
  done: "Ready",
  ready: "Ready",
  error: "Error",
};

interface Props {
  status: ProcessingStatus;
  className?: string;
}

export default function ProcessingStatusBadge({ status, className = "" }: Props) {
  const { bg, text, border, dot, animate } = styles[status];

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium ${bg} ${text} ${border} ${className}`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${dot} ${animate ? "animate-pulse" : ""}`} />
      {labels[status]}
    </span>
  );
}
