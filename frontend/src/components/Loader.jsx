const Loader = ({ fullScreen = false }) => {
  if (fullScreen) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="relative w-20 h-20 mx-auto mb-4">
            <div className="absolute inset-0 border-4 border-primary-300 border-t-transparent rounded-full animate-spin"></div>
            <div className="absolute inset-2 border-4 border-red-500 border-t-transparent rounded-full animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1s' }}></div>
          </div>
          <p className="text-dark-400 font-medium">Loading CWL data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center py-12">
      <div className="relative w-16 h-16">
        <div className="absolute inset-0 border-4 border-primary-300 border-t-transparent rounded-full animate-spin"></div>
        <div className="absolute inset-2 border-4 border-red-500 border-t-transparent rounded-full animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1s' }}></div>
      </div>
    </div>
  );
};

export const SkeletonCard = () => {
  return (
    <div className="card p-6 animate-pulse">
      <div className="flex items-center gap-4 mb-4">
        <div className="w-16 h-16 skeleton rounded-xl"></div>
        <div className="flex-1 space-y-2">
          <div className="h-6 skeleton w-1/3 rounded"></div>
          <div className="h-4 skeleton w-1/2 rounded"></div>
        </div>
      </div>
      <div className="space-y-3">
        <div className="h-4 skeleton w-full rounded"></div>
        <div className="h-4 skeleton w-5/6 rounded"></div>
        <div className="h-4 skeleton w-4/6 rounded"></div>
      </div>
    </div>
  );
};

export const SkeletonTable = () => {
  return (
    <div className="card p-6 animate-pulse">
      <div className="h-6 skeleton w-1/4 rounded mb-4"></div>
      <div className="space-y-3">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="flex gap-4">
            <div className="h-10 skeleton w-full rounded"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Loader;
