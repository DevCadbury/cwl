import { useNavigate } from 'react-router-dom';
import { StarRating, ProgressBar, AttackStatus } from './StatBadge';
import THIcon from './THIcon';

const AttackTable = ({ warData, clanTag }) => {
  const navigate = useNavigate();
  if (!warData || !warData.clan || !warData.opponent) {
    return (
      <div className="card p-6 text-center text-dark-400">
        <p>No attack data available</p>
      </div>
    );
  }

  const { clan, opponent } = warData;
  const isOurClan = clan.tag === clanTag || clan.tag === `#${clanTag}`;
  const ourClan = isOurClan ? clan : opponent;
  const theirClan = isOurClan ? opponent : clan;

  // Combine all attacks
  const allAttacks = [];
  
  ourClan.members?.forEach(member => {
    if (member.attacks && member.attacks.length > 0) {
      member.attacks.forEach(attack => {
        const defender = theirClan.members?.find(m => m.tag === attack.defenderTag);
        allAttacks.push({
          attacker: member.name,
          attackerTag: member.tag,
          attackerTH: member.townhallLevel,
          defender: defender?.name || 'Unknown',
          defenderTag: attack.defenderTag,
          defenderTH: defender?.townhallLevel || '?',
          stars: attack.stars,
          destruction: attack.destructionPercentage,
          order: attack.order,
          isOurAttack: true
        });
      });
    }
  });

  // Sort by attack order
  allAttacks.sort((a, b) => a.order - b.order);

  return (
    <div className="card overflow-hidden">
      {/* Header */}
      <div className="bg-dark-900/50 px-6 py-4 border-b border-dark-700">
        <h3 className="text-lg font-bold text-dark-50">Attack Log</h3>
        <p className="text-sm text-dark-400 mt-1">Detailed breakdown of all attacks</p>
      </div>

      {/* Desktop Table */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="w-full">
          <thead className="bg-dark-800 border-b border-dark-700">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold text-dark-400 uppercase tracking-wider">#</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-dark-400 uppercase tracking-wider">Attacker</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-dark-400 uppercase tracking-wider">Defender</th>
              <th className="px-6 py-3 text-center text-xs font-semibold text-dark-400 uppercase tracking-wider">Stars</th>
              <th className="px-6 py-3 text-center text-xs font-semibold text-dark-400 uppercase tracking-wider">Destruction</th>
              <th className="px-6 py-3 text-center text-xs font-semibold text-dark-400 uppercase tracking-wider">TH Levels</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-dark-700">
            {allAttacks.length === 0 ? (
              <tr>
                <td colSpan="6" className="px-6 py-8 text-center text-dark-400">
                  No attacks recorded yet
                </td>
              </tr>
            ) : (
              allAttacks.map((attack, index) => (
                <tr
                  key={`${attack.attackerTag}-${attack.order}`}
                  className="hover:bg-dark-800/50 transition-colors"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-dark-400">
                      {attack.order}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <THIcon level={attack.attackerTH} size="sm" />
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium text-dark-50">{attack.attacker}</div>
                        <div className="text-xs text-dark-500 font-mono">{attack.attackerTag}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <THIcon level={attack.defenderTH} size="sm" />
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium text-dark-50">{attack.defender}</div>
                        <div className="text-xs text-dark-500 font-mono">{attack.defenderTag}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex justify-center">
                      <StarRating stars={attack.stars} size="sm" />
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="max-w-[120px] mx-auto">
                      <ProgressBar 
                        value={attack.destruction} 
                        color={attack.stars === 3 ? 'green' : attack.stars === 2 ? 'primary' : 'red'}
                        showLabel={true}
                      />
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className={`text-sm font-semibold ${
                      attack.attackerTH > attack.defenderTH 
                        ? 'text-green-400' 
                        : attack.attackerTH < attack.defenderTH 
                        ? 'text-red-400' 
                        : 'text-dark-400'
                    }`}>
                      {attack.attackerTH} vs {attack.defenderTH}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="lg:hidden divide-y divide-dark-700">
        {allAttacks.length === 0 ? (
          <div className="px-6 py-8 text-center text-dark-400">
            No attacks recorded yet
          </div>
        ) : (
          allAttacks.map((attack, index) => (
            <div key={`${attack.attackerTag}-${attack.order}`} className="p-4 hover:bg-dark-800/50 transition-colors">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-semibold text-dark-400">Attack #{attack.order}</span>
                <StarRating stars={attack.stars} size="sm" />
              </div>
              
              <div className="space-y-3">
                {/* Attacker */}
                <div className="flex items-center gap-3">
                  <THIcon level={attack.attackerTH} size="md" />
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-dark-50 truncate">{attack.attacker}</div>
                    <div className="text-xs text-dark-500">Attacker</div>
                  </div>
                </div>

                {/* VS Arrow */}
                <div className="flex items-center justify-center">
                  <svg className="w-5 h-5 text-primary-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  </svg>
                </div>

                {/* Defender */}
                <div className="flex items-center gap-3">
                  <THIcon level={attack.defenderTH} size="md" />
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-dark-50 truncate">{attack.defender}</div>
                    <div className="text-xs text-dark-500">Defender</div>
                  </div>
                </div>

                {/* Stats */}
                <div className="pt-3 border-t border-dark-700">
                  <ProgressBar 
                    value={attack.destruction} 
                    color={attack.stars === 3 ? 'green' : attack.stars === 2 ? 'primary' : 'red'}
                    showLabel={true}
                  />
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AttackTable;
