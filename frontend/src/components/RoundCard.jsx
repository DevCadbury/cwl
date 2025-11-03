import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ResultBadge, StarRating } from './StatBadge';
import AttackTable from './AttackTable';

const RoundCard = ({ round, roundNumber, clanTag, onWarClick }) => {
  const navigate = useNavigate();
  const [isExpanded, setIsExpanded] = useState(false);

  if (!round || !round.ourClan || !round.opponent) return null;

  const { ourClan, opponent, result, state } = round;
  const isFinished = state === 'warEnded';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="card card-hover"
    >
      {/* Header */}
      <div
        className="p-6 cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-dark-700 flex items-center justify-center border border-dark-600">
              <span className="text-lg font-bold text-primary-300">R{roundNumber}</span>
            </div>
            <div>
              <h3 className="text-lg font-bold text-dark-50">Round {roundNumber}</h3>
              <p className="text-sm text-dark-400">
                {isFinished ? 'Completed' : 'In Progress'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {isFinished && <ResultBadge result={result} />}
            <motion.svg
              animate={{ rotate: isExpanded ? 180 : 0 }}
              transition={{ duration: 0.3 }}
              className="w-6 h-6 text-dark-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </motion.svg>
          </div>
        </div>

        {/* Clans Comparison */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
          {/* Our Clan */}
          <div className="flex items-center gap-3 md:justify-start">
            <div className="w-14 h-14 rounded-xl overflow-hidden flex-shrink-0 ring-2 ring-green-500/50 shadow-lg hover:ring-green-400 transition-all">
              {ourClan.badgeUrls?.url ? (
                <img 
                  src={ourClan.badgeUrls.url} 
                  alt={ourClan.name} 
                  className="w-full h-full object-cover bg-gradient-to-br from-dark-700 to-dark-800" 
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-green-900/20 to-dark-800 flex items-center justify-center">
                  <svg className="w-7 h-7 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
              )}
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold text-dark-50 truncate">{ourClan.name}</p>
              <div className="flex items-center gap-2 mt-1">
                <StarRating stars={ourClan.stars || 0} size="sm" />
                <span className="text-xs text-dark-400">{ourClan.stars || 0}</span>
              </div>
            </div>
          </div>

          {/* VS */}
          <div className="flex flex-col items-center justify-center md:hidden">
            <div className="text-2xl font-bold text-primary-300 mb-1">
              {ourClan.stars || 0} - {opponent.stars || 0}
            </div>
            <div className="text-xs text-dark-500 uppercase tracking-wider">VS</div>
            {isFinished && (
              <div className="text-xs text-dark-400 mt-1">
                {ourClan.destructionPercentage?.toFixed(1)}% - {opponent.destructionPercentage?.toFixed(1)}%
              </div>
            )}
          </div>

          {/* VS Desktop */}
          <div className="hidden md:flex flex-col items-center justify-center">
            <div className="text-2xl font-bold text-primary-300 mb-1">
              {ourClan.stars || 0} - {opponent.stars || 0}
            </div>
            <div className="text-xs text-dark-500 uppercase tracking-wider">VS</div>
            {isFinished && (
              <div className="text-xs text-dark-400 mt-1">
                {ourClan.destructionPercentage?.toFixed(1)}% - {opponent.destructionPercentage?.toFixed(1)}%
              </div>
            )}
          </div>

          {/* Opponent */}
          <div className="flex items-center gap-3 md:justify-end">
            <div className="min-w-0 flex-1 md:text-right">
              <div className="flex items-center md:justify-end gap-2">
                <p className="text-sm font-semibold text-dark-50 truncate">{opponent.name}</p>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/cwl/${opponent.tag.replace('#', '')}`);
                  }}
                  className="flex-shrink-0 w-5 h-5 rounded flex items-center justify-center bg-primary-300/10 hover:bg-primary-300/20 transition-colors group"
                  title="View clan profile"
                >
                  <svg className="w-3 h-3 text-primary-300 group-hover:text-primary-200 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </button>
              </div>
              <div className="flex items-center gap-2 mt-1 md:justify-end">
                <span className="text-xs text-dark-400">{opponent.stars || 0}</span>
                <StarRating stars={opponent.stars || 0} size="sm" />
              </div>
            </div>
            <div className="w-14 h-14 rounded-xl overflow-hidden flex-shrink-0 ring-2 ring-red-500/50 shadow-lg hover:ring-red-400 transition-all">
              {opponent.badgeUrls?.url ? (
                <img 
                  src={opponent.badgeUrls.url} 
                  alt={opponent.name} 
                  className="w-full h-full object-cover bg-gradient-to-br from-dark-700 to-dark-800" 
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-red-900/20 to-dark-800 flex items-center justify-center">
                  <svg className="w-7 h-7 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Expanded Content */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden border-t border-dark-700"
          >
            <div className="p-6 bg-dark-900/30">
              {round.warTag && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onWarClick?.(round.warTag);
                  }}
                  className="btn-secondary w-full sm:w-auto mb-6"
                >
                  <span className="flex items-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                    View Detailed Attacks
                  </span>
                </button>
              )}

              {/* Quick Stats */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-dark-800 rounded-lg p-4 border border-dark-700">
                  <h4 className="text-sm font-semibold text-dark-400 mb-3">Our Performance</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-dark-400">Total Stars</span>
                      <span className="text-lg font-bold text-primary-300">{ourClan.stars || 0}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-dark-400">Destruction</span>
                      <span className="text-lg font-bold text-green-400">{ourClan.destructionPercentage?.toFixed(1) || 0}%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-dark-400">Attacks Used</span>
                      <span className="text-lg font-bold text-blue-400">
                        {Array.isArray(ourClan.attacks) ? ourClan.attacks.length : (ourClan.attacks || 0)}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="bg-dark-800 rounded-lg p-4 border border-dark-700">
                  <h4 className="text-sm font-semibold text-dark-400 mb-3">Opponent Stats</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-dark-400">Total Stars</span>
                      <span className="text-lg font-bold text-primary-300">{opponent.stars || 0}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-dark-400">Destruction</span>
                      <span className="text-lg font-bold text-red-400">{opponent.destructionPercentage?.toFixed(1) || 0}%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-dark-400">Attacks Used</span>
                      <span className="text-lg font-bold text-blue-400">
                        {Array.isArray(opponent.attacks) ? opponent.attacks.length : (opponent.attacks || 0)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default RoundCard;
