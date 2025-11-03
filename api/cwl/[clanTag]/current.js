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
    const { clanTag } = req.query;
    const tag = formatTag(clanTag);

    const cwlGroup = await client.getClanWarLeagueGroup(tag);

    // Fetch full clan details to get badge URLs
    const clansWithBadges = await Promise.all(
      cwlGroup.clans.map(async (c) => {
        try {
          const fullClan = await client.getClan(c.tag);
          return {
            name: c.name,
            tag: c.tag,
            badgeUrls: fullClan.badgeUrls || fullClan.badge || fullClan.badges,
            clanLevel: c.clanLevel,
            members: c.members?.length || 0,
            memberList: c.members.map(m => ({
              name: m.name,
              tag: m.tag,
              townHallLevel: m.townHallLevel
            }))
          };
        } catch (err) {
          console.error(`Error fetching clan ${c.name}:`, err.message);
          return {
            name: c.name,
            tag: c.tag,
            badgeUrls: null,
            clanLevel: c.clanLevel,
            members: c.members?.length || 0,
            memberList: c.members.map(m => ({
              name: m.name,
              tag: m.tag,
              townHallLevel: m.townHallLevel
            }))
          };
        }
      })
    );

    const cwlData = {
      state: cwlGroup.state,
      season: cwlGroup.season,
      clans: clansWithBadges,
      rounds: cwlGroup.rounds
    };

    res.status(200).json(cwlData);
  } catch (error) {
    console.error('Error fetching CWL group:', error);
    res.status(error.status || 500).json({
      error: error.message || 'Failed to fetch CWL data',
      status: error.status || 500
    });
  }
}