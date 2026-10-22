function UsersLoadingSkeleton() {
  return (
    <div className="space-y-0.5 py-1">
      {[1, 2, 3, 4, 5].map((item) => (
        <div key={item} className="flex items-center gap-3 px-3 py-2.5 mx-2 rounded-xl">
          <div className="skeleton rounded-full flex-shrink-0" style={{ width: 40, height: 40 }} />
          <div className="flex-1 space-y-2">
            <div className="skeleton rounded h-3 w-3/4" />
            <div className="skeleton rounded h-2.5 w-1/2" />
          </div>
        </div>
      ))}
    </div>
  );
}
export default UsersLoadingSkeleton;
