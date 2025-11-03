import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import THIcon from './THIcon';

const ClanLeaderboard = ({ cwlData }) => {
  const navigate = useNavigate();
  const [leaderboard, setLeaderboard] = useState([]);
  const [expandedClan, setExpandedClan] = useState(null);

  useEffect(() => {
    if (!cwlData || !cwlData.rounds) return;

    console.log('CWL Data received:', cwlData);
    console.log('Clans data:', cwlData.clans);
    if (cwlData.clans?.[0]) {
      console.log('First clan badge URLs:', cwlData.clans[0].badgeUrls);
    }

    // Calculate stats for each clan
    const clanStats = {};

    // Initialize all clans
    cwlData.clans?.forEach(clan => {
      clanStats[clan.tag] = {
        name: clan.name,
        tag: clan.tag,
        badgeUrls: clan.badgeUrls,
        clanLevel: clan.clanLevel,
        members: clan.members,
        memberList: clan.memberList || [],
        totalStars: 0,
        totalDestruction: 0,
        wins: 0,
        losses: 0,
        draws: 0,
        wars: 0
      };
    });

    // Process all rounds
    cwlData.rounds?.forEach(roundData => {
      roundData.wars?.forEach(war => {
        if (!war) return;

        const ourClanTag = war.ourClan?.tag;
        const opponentTag = war.opponent?.tag;

        if (ourClanTag && clanStats[ourClanTag]) {
          clanStats[ourClanTag].totalStars += war.ourClan.stars || 0;
          clanStats[ourClanTag].totalDestruction += war.ourClan.destructionPercentage || 0;
          clanStats[ourClanTag].wars++;

          if (war.result === 'win') clanStats[ourClanTag].wins++;
          else if (war.result === 'loss') clanStats[ourClanTag].losses++;
          else if (war.result === 'draw') clanStats[ourClanTag].draws++;
        }

        if (opponentTag && clanStats[opponentTag]) {
          clanStats[opponentTag].totalStars += war.opponent.stars || 0;
          clanStats[opponentTag].totalDestruction += war.opponent.destructionPercentage || 0;
          clanStats[opponentTag].wars++;

          const opponentResult = war.result === 'win' ? 'loss' : war.result === 'loss' ? 'win' : 'draw';
          if (opponentResult === 'win') clanStats[opponentTag].wins++;
          else if (opponentResult === 'loss') clanStats[opponentTag].losses++;
          else if (opponentResult === 'draw') clanStats[opponentTag].draws++;
        }
      });
    });

    // Convert to array and sort by stars (primary) and destruction (secondary)
    const sortedClans = Object.values(clanStats).sort((a, b) => {
      if (b.totalStars !== a.totalStars) return b.totalStars - a.totalStars;
      return b.totalDestruction - a.totalDestruction;
    });

    setLeaderboard(sortedClans);
  }, [cwlData]);

  if (!leaderboard || leaderboard.length === 0) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="card p-6 mb-8"
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-display font-bold text-dark-50">
          CWL Leaderboard
        </h2>
        <div className="text-sm text-dark-400">
          {leaderboard.length} Clans
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-dark-700">
              <th className="text-left py-3 px-4 text-xs font-semibold text-dark-400 uppercase tracking-wider">Rank</th>
              <th className="text-left py-3 px-4 text-xs font-semibold text-dark-400 uppercase tracking-wider">Clan</th>
              <th className="text-center py-3 px-4 text-xs font-semibold text-dark-400 uppercase tracking-wider">Stars</th>
              <th className="text-center py-3 px-4 text-xs font-semibold text-dark-400 uppercase tracking-wider">Destruction</th>
              <th className="text-center py-3 px-4 text-xs font-semibold text-dark-400 uppercase tracking-wider">Record</th>
              <th className="text-center py-3 px-4 text-xs font-semibold text-dark-400 uppercase tracking-wider">Members</th>
            </tr>
          </thead>
          <tbody>
            {leaderboard.map((clan, index) => (
              <motion.tr
                key={clan.tag}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className={`border-b border-dark-800 hover:bg-dark-800/50 cursor-pointer transition-colors ${
                  expandedClan === clan.tag ? 'bg-dark-800/50' : ''
                }`}
                onClick={() => setExpandedClan(expandedClan === clan.tag ? null : clan.tag)}
              >
                <td className="py-4 px-4">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold ${
                    index === 0 ? 'bg-primary-300/20 text-primary-300' :
                    index === 1 ? 'bg-dark-500 text-dark-300' :
                    index === 2 ? 'bg-orange-900/20 text-orange-400' :
                    'bg-dark-700 text-dark-400'
                  }`}>
                    {index + 1}
                  </div>
                </td>
                <td className="py-4 px-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl overflow-hidden flex-shrink-0 ring-2 ring-primary-300/30 shadow-lg">
                      {clan.badgeUrls?.url ? (
                        <img 
                          src={clan.badgeUrls.url} 
                          alt={clan.name} 
                          className="w-full h-full object-cover bg-gradient-to-br from-dark-700 to-dark-800"
                          onError={(e) => {
                            console.log('Badge URL failed to load:', clan.badgeUrls);
                            e.target.style.display = 'none';
                          }}
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-dark-700 to-dark-900 flex items-center justify-center">
                          <svg className="w-6 h-6 text-dark-500" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                          </svg>
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <div className="font-bold text-dark-50 truncate">{clan.name}</div>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate(`/cwl/${clan.tag.replace('#', '')}`);
                          }}
                          className="flex-shrink-0 w-5 h-5 rounded flex items-center justify-center bg-primary-300/10 hover:bg-primary-300/20 transition-colors group"
                          title="View clan profile"
                        >
                          <svg className="w-3 h-3 text-primary-300 group-hover:text-primary-200 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                        </button>
                      </div>
                      <div className="text-xs text-dark-500 font-mono">{clan.tag}</div>
                    </div>
                  </div>
                </td>
                <td className="py-4 px-4 text-center">
                  <div className="text-xl font-bold text-primary-300">{clan.totalStars}</div>
                </td>
                <td className="py-4 px-4 text-center">
                  <div className="text-lg font-bold text-green-400">
                    {clan.wars > 0 ? (clan.totalDestruction / clan.wars).toFixed(1) : 0}%
                  </div>
                </td>
                <td className="py-4 px-4 text-center">
                  <div className="flex items-center justify-center gap-1 text-sm">
                    <span className="text-green-400 font-semibold">{clan.wins}</span>
                    <span className="text-dark-500">-</span>
                    <span className="text-red-400 font-semibold">{clan.losses}</span>
                    {clan.draws > 0 && (
                      <>
                        <span className="text-dark-500">-</span>
                        <span className="text-dark-400 font-semibold">{clan.draws}</span>
                      </>
                    )}
                  </div>
                </td>
                <td className="py-4 px-4 text-center">
                  <div className="text-sm text-dark-300">{clan.members}</div>
                </td>
              </motion.tr>
            ))}
            
            {expandedClan && (() => {
              const clan = leaderboard.find(c => c.tag === expandedClan);
              if (!clan || !clan.memberList || clan.memberList.length === 0) return null;

              return (
                <tr key={`${expandedClan}-members`}>
                  <td colSpan="6" className="py-4 px-4 bg-dark-900/50">
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="space-y-2"
                    >
                      <h4 className="text-sm font-semibold text-dark-400 mb-3">Roster ({clan.memberList.length} members)</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                        {clan.memberList.map((member, idx) => (
                          <div key={member.tag} className="flex items-center gap-2 text-sm bg-dark-800 rounded p-2">
                            <span className="text-dark-500 font-mono text-xs w-6">{idx + 1}.</span>
                            <THIcon level={member.townHallLevel} size="xs" />
                            <div className="flex-1 min-w-0">
                              <div className="text-dark-200 truncate">{member.name}</div>
                              <div className="text-xs text-dark-500 font-mono">{member.tag}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  </td>
                </tr>
              );
            })()}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
};

export default ClanLeaderboard;
