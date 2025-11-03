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
    console.log('📊 Fetching all CWL data for clan:', tag);

    // Get CWL group first
    console.log('🔍 Fetching CWL group...');
    const cwlGroup = await client.getClanWarLeagueGroup(tag);
    console.log('✅ Found', cwlGroup.clans.length, 'clans in CWL');

    // Get all war details
    const roundsData = await Promise.all(
      cwlGroup.rounds.map(async (round, roundIndex) => {
        const warTags = round.warTags.filter(tag => tag !== '#0');

        const wars = await Promise.all(
          warTags.map(async (warTag) => {
            try {
              const war = await client.getClanWarLeagueRound(warTag);

              // Check if our clan is in this war
              const isOurClan = war.clan.tag === tag;
              const ourClan = isOurClan ? war.clan : war.opponent;
              const theirClan = isOurClan ? war.opponent : war.clan;

              return {
                warTag: warTag,
                state: war.state,
                ourClan: {
                  name: ourClan.name,
                  tag: ourClan.tag,
                  badgeUrls: ourClan.badgeUrls || ourClan.badge || ourClan.badges,
                  stars: ourClan.stars,
                  destructionPercentage: ourClan.destructionPercentage,
                  attacks: ourClan.attacks
                },
                opponent: {
                  name: theirClan.name,
                  tag: theirClan.tag,
                  badgeUrls: theirClan.badgeUrls || theirClan.badge || theirClan.badges,
                  stars: theirClan.stars,
                  destructionPercentage: theirClan.destructionPercentage,
                  attacks: theirClan.attacks
                },
                result: ourClan.stars > theirClan.stars ? 'win' :
                        ourClan.stars < theirClan.stars ? 'loss' : 'draw'
              };
            } catch (error) {
              console.error(`Error fetching war ${warTag}:`, error);
              return null;
            }
          })
        );

        return {
          round: roundIndex + 1,
          wars: wars.filter(w => w !== null)
        };
      })
    );

    // Fetch full clan details to get badge URLs
    console.log('🎨 Fetching badge URLs for all clans...');
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
          console.error(`❌ Error fetching clan ${c.name}:`, err.message);
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

    console.log('✅ All badge URLs fetched, sending response');
    const allData = {
      season: cwlGroup.season,
      state: cwlGroup.state,
      clans: clansWithBadges,
      rounds: roundsData
    };

    res.status(200).json(allData);
  } catch (error) {
    console.error('Error fetching all CWL data:', error);
    res.status(error.status || 500).json({
      error: error.message || 'Failed to fetch all CWL data',
      status: error.status || 500
    });
  }
}