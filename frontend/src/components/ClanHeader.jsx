import { motion } from 'framer-motion';

const ClanHeader = ({ clan, season }) => {
  if (!clan) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="card p-6 md:p-8 gradient-mesh relative overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,0.03) 10px, rgba(255,255,255,0.03) 20px)`
        }}></div>
      </div>

      <div className="relative z-10">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
          {/* Clan Badge */}
          <motion.div
            whileHover={{ scale: 1.05, rotate: 5 }}
            whileTap={{ scale: 0.95 }}
            className="flex-shrink-0"
          >
            <div className="w-20 h-20 md:w-28 md:h-28 rounded-2xl overflow-hidden shadow-glow-gold ring-4 ring-primary-300/50 hover:ring-primary-300 transition-all">
              {clan.badgeUrls?.url ? (
                <img
                  src={clan.badgeUrls.url}
                  alt={clan.name}
                  className="w-full h-full object-cover bg-gradient-to-br from-dark-800 to-dark-900"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-primary-300 to-red-500 flex items-center justify-center">
                  <svg className="w-14 h-14 text-dark-900" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
              )}
            </div>
          </motion.div>

          {/* Clan Info */}
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-start justify-between gap-4 mb-3">
              <div>
                <h1 className="text-3xl md:text-4xl font-display font-bold text-dark-50 mb-2">
                  {clan.name}
                </h1>
                <div className="flex flex-wrap items-center gap-3 text-dark-400">
                  <span className="font-mono text-primary-300 font-semibold">{clan.tag}</span>
                  {clan.location && (
                    <>
                      <span className="w-1 h-1 bg-dark-600 rounded-full"></span>
                      <span className="flex items-center gap-1">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                        </svg>
                        {clan.location.name}
                      </span>
                    </>
                  )}
                </div>
              </div>

              {season && (
                <div className="flex items-center gap-2 px-4 py-2 bg-dark-900/50 rounded-lg border border-dark-700">
                  <svg className="w-5 h-5 text-primary-300" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm font-semibold text-dark-50">{season}</span>
                </div>
              )}
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="bg-dark-900/30 rounded-lg p-3 border border-dark-700/50">
                <div className="text-2xl font-bold text-primary-300">{clan.clanLevel}</div>
                <div className="text-xs text-dark-400 uppercase tracking-wide">Level</div>
              </div>
              <div className="bg-dark-900/30 rounded-lg p-3 border border-dark-700/50">
                <div className="text-2xl font-bold text-green-400">{clan.members}</div>
                <div className="text-xs text-dark-400 uppercase tracking-wide">Members</div>
              </div>
              {clan.warWins !== undefined && (
                <div className="bg-dark-900/30 rounded-lg p-3 border border-dark-700/50">
                  <div className="text-2xl font-bold text-blue-400">{clan.warWins}</div>
                  <div className="text-xs text-dark-400 uppercase tracking-wide">War Wins</div>
                </div>
              )}
              {clan.warLeague?.name && (
                <div className="bg-dark-900/30 rounded-lg p-3 border border-dark-700/50">
                  <div className="text-xs font-bold text-red-400 truncate">{clan.warLeague.name}</div>
                  <div className="text-xs text-dark-400 uppercase tracking-wide">League</div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ClanHeader;
