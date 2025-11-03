const THIcon = ({ level, size = 'md' }) => {
  const sizes = {
    xs: 'w-6 h-6 text-[10px]',
    sm: 'w-8 h-8 text-xs',
    md: 'w-10 h-10 text-sm',
    lg: 'w-12 h-12 text-base'
  };

  const getGradient = (th) => {
    if (th >= 16) return 'from-cyan-400 via-blue-500 to-purple-600'; // TH16-17
    if (th >= 15) return 'from-blue-400 via-indigo-500 to-purple-600'; // TH15
    if (th >= 14) return 'from-orange-400 via-red-500 to-pink-600'; // TH14
    if (th >= 13) return 'from-yellow-400 via-orange-500 to-red-600'; // TH13
    if (th >= 12) return 'from-blue-400 via-cyan-500 to-teal-600'; // TH12
    if (th >= 11) return 'from-gray-300 via-gray-400 to-gray-600'; // TH11
    if (th >= 10) return 'from-red-400 via-orange-500 to-yellow-600'; // TH10
    if (th >= 9) return 'from-gray-400 via-gray-500 to-gray-700'; // TH9
    if (th >= 8) return 'from-purple-400 via-purple-500 to-purple-700'; // TH8
    return 'from-gray-500 via-gray-600 to-gray-800'; // TH1-7
  };

  return (
    <div className={`${sizes[size]} relative flex-shrink-0`}>
      {/* Town Hall Icon with gradient */}
      <div className={`w-full h-full rounded-lg bg-gradient-to-br ${getGradient(level)} shadow-lg flex items-center justify-center border-2 border-dark-700/50 relative overflow-hidden`}>
        {/* Castle/TH Icon */}
        <svg className="w-1/2 h-1/2 text-white/90 relative z-10" fill="currentColor" viewBox="0 0 20 20">
          <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
        </svg>
        
        {/* Level Badge */}
        <div className="absolute bottom-0 left-0 right-0 bg-dark-900/90 text-white font-bold flex items-center justify-center py-0.5 text-[10px] leading-none">
          {level}
        </div>
      </div>
    </div>
  );
};

export default THIcon;
