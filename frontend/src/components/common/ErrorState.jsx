function ErrorState({ message, onRetry }) {
  return (
    <div className="rounded-xl border border-red-200 bg-red-50 px-6 py-10 text-center">
      <h2 className="font-semibold text-red-900">Unable to load vehicles</h2>
      <p className="mt-2 text-sm text-red-700">{message}</p>
      <button className="mt-4 rounded-lg bg-red-700 px-4 py-2 text-sm font-semibold text-white hover:bg-red-800" onClick={onRetry} type="button">
        Try again
      </button>
    </div>
  );
}

export default ErrorState;
