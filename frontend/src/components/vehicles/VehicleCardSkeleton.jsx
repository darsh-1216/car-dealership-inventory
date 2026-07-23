function VehicleCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="h-48 animate-pulse rounded-xl bg-slate-200" />
      <div className="mt-5 h-5 w-3/4 animate-pulse rounded bg-slate-200" />
      <div className="mt-3 h-4 w-1/2 animate-pulse rounded bg-slate-100" />
      <div className="mt-5 grid grid-cols-2 gap-3">
        {[1, 2, 3, 4].map((item) => <div className="h-10 animate-pulse rounded bg-slate-100" key={item} />)}
      </div>
      <div className="mt-5 h-10 animate-pulse rounded bg-slate-100" />
    </div>
  );
}

function VehicleCardSkeletons() {
  return <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">{Array.from({ length: 8 }, (_, index) => <VehicleCardSkeleton key={index} />)}</div>;
}

export default VehicleCardSkeletons;
