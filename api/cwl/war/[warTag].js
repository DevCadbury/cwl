import { Client } from 'clashofclans.js';

const client = new Client({
  cache: true,
  retryLimit: 3,
  restRequestTimeout: 5000
});

let loggedIn = false;

const login = async () => {
  if (!loggedIn) {
    try {
      if (!process.env.COC_EMAIL || !process.env.COC_PASSWORD) {
        throw new Error('COC_EMAIL and COC_PASSWORD must be set');
      }
      await client.login({
        email: process.env.COC_EMAIL,
        password: process.env.COC_PASSWORD
      });
      loggedIn = true;
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  }
};

const formatTag = (tag) => {
  return tag.startsWith('#') ? tag : `#${tag}`;
};

export default async function handler(req, res) {
  try {
    await login();
    const { warTag } = req.query;
    const tag = formatTag(warTag);

    const war = await client.getClanWarLeagueRound(tag);

    const warData = {
      state: war.state,
      teamSize: war.teamSize,
      startTime: war.startTime,
      endTime: war.endTime,
      clan: {
        name: war.clan.name,
        tag: war.clan.tag,
        badgeUrls: war.clan.badgeUrls || war.clan.badge || war.clan.badges,
        clanLevel: war.clan.clanLevel,
        stars: war.clan.stars,
        destructionPercentage: war.clan.destructionPercentage,
        attacks: war.clan.attacks,
        members: war.clan.members.map(m => ({
          name: m.name,
          tag: m.tag,
          townhallLevel: m.townhallLevel,
          mapPosition: m.mapPosition,
          attacks: (m.attacks || []).map(atk => ({
            stars: atk.stars,
            destructionPercentage: atk.destructionPercentage || atk.destruction,
            order: atk.order,
            duration: atk.duration,
            attackerTag: atk.attackerTag,
            defenderTag: atk.defenderTag
          })),
          bestOpponentAttack: m.bestOpponentAttack ? {
            stars: m.bestOpponentAttack.stars,
            destructionPercentage: m.bestOpponentAttack.destructionPercentage || m.bestOpponentAttack.destruction,
            attackerTag: m.bestOpponentAttack.attackerTag
          } : null
        }))
      },
      opponent: {
        name: war.opponent.name,
        tag: war.opponent.tag,
        badgeUrls: war.opponent.badgeUrls || war.opponent.badge || war.opponent.badges,
        clanLevel: war.opponent.clanLevel,
        stars: war.opponent.stars,
        destructionPercentage: war.opponent.destructionPercentage,
        attacks: war.opponent.attacks,
        members: war.opponent.members.map(m => ({
          name: m.name,
          tag: m.tag,
          townhallLevel: m.townhallLevel,
          mapPosition: m.mapPosition,
          attacks: (m.attacks || []).map(atk => ({
            stars: atk.stars,
            destructionPercentage: atk.destructionPercentage || atk.destruction,
            order: atk.order,
            duration: atk.duration,
            attackerTag: atk.attackerTag,
            defenderTag: atk.defenderTag
          })),
          bestOpponentAttack: m.bestOpponentAttack ? {
            stars: m.bestOpponentAttack.stars,
            destructionPercentage: m.bestOpponentAttack.destructionPercentage || m.bestOpponentAttack.destruction,
            attackerTag: m.bestOpponentAttack.attackerTag
          } : null
        }))
      }
    };

    res.status(200).json(warData);
  } catch (error) {
    console.error('Error fetching CWL war:', error);
    res.status(error.status || 500).json({
      error: error.message || 'Failed to fetch war data',
      status: error.status || 500
    });
  }
}