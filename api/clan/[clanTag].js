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

    const clan = await client.getClan(tag);

    const clanData = {
      name: clan.name,
      tag: clan.tag,
      badgeUrls: clan.badgeUrls || clan.badge || clan.badges,
      clanLevel: clan.clanLevel,
      clanPoints: clan.clanPoints,
      warWins: clan.warWins,
      warLeague: clan.warLeague,
      members: clan.memberCount || clan.members?.length || 0,
      location: clan.location
    };

    res.status(200).json(clanData);
  } catch (error) {
    console.error('Error fetching clan:', error);
    res.status(error.status || 500).json({
      error: error.message || 'Failed to fetch clan data',
      status: error.status || 500
    });
  }
}