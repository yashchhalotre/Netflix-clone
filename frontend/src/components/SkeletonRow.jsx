const SkeletonRow = () => {
  return (
    <div className="px-4 py-5 md:px-12">
      <div className="mb-3 h-7 w-44 animate-pulse rounded bg-zinc-800 light-theme:bg-zinc-300" />
      <div className="flex gap-4 overflow-hidden">
        {[1, 2, 3, 4, 5, 6].map((item) => (
          <div key={item} className="h-72 min-w-[150px] animate-pulse rounded bg-zinc-800 light-theme:bg-zinc-300 md:min-w-[190px]" />
        ))}
      </div>
    </div>
  );
};

export default SkeletonRow;
