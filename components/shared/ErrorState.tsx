interface Props {
  title: string;
  message: string;
  onRetry?: () => void;
}

export default function ErrorState({ title, message, onRetry }: Props) {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-red-100 bg-red-50 py-16 text-center">
      <p className="text-base font-semibold text-red-700">{title}</p>
      <p className="mt-2 max-w-sm text-sm text-red-600">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="mt-6 rounded-xl bg-red-600 px-5 py-2 text-sm font-semibold text-white transition hover:bg-red-700"
        >
          Try again
        </button>
      )}
    </div>
  );
}
