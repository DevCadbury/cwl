export const StatBadge = ({ icon, value, label, color = 'gray' }) => {
  const colorClasses = {
    gold: 'bg-primary-300/10 text-primary-300 border-primary-300/30',
    green: 'bg-green-500/10 text-green-400 border-green-500/30',
    red: 'bg-red-500/10 text-red-400 border-red-500/30',
    blue: 'bg-blue-500/10 text-blue-400 border-blue-500/30',
    gray: 'bg-dark-700/50 text-dark-300 border-dark-600',
  };

  return (
    <div className={`stat-badge border ${colorClasses[color]}`}>
      {icon && <span className="text-lg">{icon}</span>}
      <span className="font-semibold">{value}</span>
      {label && <span className="text-xs opacity-75">{label}</span>}
    </div>
  );
};

export const ResultBadge = ({ result }) => {
  const configs = {
    win: {
      color: 'green',
      icon: '✓',
      text: 'Victory',
      classes: 'bg-green-500/10 text-green-400 border-green-500/30',
    },
    loss: {
      color: 'red',
      icon: '✗',
      text: 'Defeat',
      classes: 'bg-red-500/10 text-red-400 border-red-500/30',
    },
    draw: {
      color: 'gray',
      icon: '=',
      text: 'Draw',
      classes: 'bg-dark-600/50 text-dark-300 border-dark-500',
    },
  };

  const config = configs[result] || configs.draw;

  return (
    <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border font-semibold text-sm ${config.classes}`}>
      <span className="text-lg">{config.icon}</span>
      <span>{config.text}</span>
    </div>
  );
};

export const AttackStatus = ({ attacks, maxAttacks = 2 }) => {
  const used = attacks || 0;
  const missed = maxAttacks - used;

  return (
    <div className="flex items-center gap-1">
      {[...Array(used)].map((_, i) => (
        <div key={`used-${i}`} className="w-6 h-6 rounded bg-green-500/20 border border-green-500/50 flex items-center justify-center">
          <span className="text-xs text-green-400">⚔️</span>
        </div>
      ))}
      {[...Array(missed)].map((_, i) => (
        <div key={`missed-${i}`} className="w-6 h-6 rounded bg-red-500/20 border border-red-500/50 flex items-center justify-center">
          <span className="text-xs text-red-400">✗</span>
        </div>
      ))}
    </div>
  );
};

export const StarRating = ({ stars, maxStars = 3, size = 'md' }) => {
  const sizes = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
  };

  return (
    <div className="flex items-center gap-0.5">
      {[...Array(maxStars)].map((_, i) => (
        <svg
          key={i}
          className={`${sizes[size]} ${i < stars ? 'text-primary-300 drop-shadow-[0_0_4px_rgba(250,204,21,0.5)]' : 'text-dark-600'}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
};

export const ProgressBar = ({ value, max = 100, color = 'primary', showLabel = true }) => {
  const percentage = (value / max) * 100;
  
  const colorClasses = {
    primary: 'bg-primary-300',
    green: 'bg-green-500',
    red: 'bg-red-500',
    blue: 'bg-blue-500',
  };

  return (
    <div className="space-y-1">
      <div className="h-2 bg-dark-700 rounded-full overflow-hidden">
        <div
          className={`h-full ${colorClasses[color]} transition-all duration-500 rounded-full`}
          style={{ width: `${Math.min(percentage, 100)}%` }}
        ></div>
      </div>
      {showLabel && (
        <div className="text-xs text-dark-400 font-medium">
          {value.toFixed(1)}%
        </div>
      )}
    </div>
  );
};

export default StatBadge;
