export function SkeletonLoader() {
  return (
    <div className="flex flex-col gap-6" aria-busy="true" aria-label="Loading contacts">
      {Array.from({ length: 3 }).map((_, index) => (
        <div
          key={index}
          className="rounded-[2.5rem] bg-white p-8 shadow-[0_4px_28px_rgba(15,23,42,0.07)]"
        >
          <div className="flex gap-4">
            <div className="h-14 w-14 shrink-0 animate-pulse rounded-full bg-neutral-200" />
            <div className="flex-1 space-y-2">
              <div className="h-6 w-44 animate-pulse rounded bg-neutral-200" />
              <div className="h-4 w-64 max-w-full animate-pulse rounded bg-neutral-100" />
            </div>
          </div>
          <div className="mt-6 grid grid-cols-1 gap-4 border-t border-neutral-100 pt-6 sm:grid-cols-2">
            {Array.from({ length: 4 }).map((_, statIndex) => (
              <div key={statIndex} className="space-y-2">
                <div className="h-3 w-12 animate-pulse rounded bg-neutral-100" />
                <div className="h-4 w-full animate-pulse rounded bg-neutral-100" />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
