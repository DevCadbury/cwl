import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { Client } from 'clashofclans.js';
import NodeCache from 'node-cache';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Initialize Clash of Clans API client with email/password
const client = new Client({
  cache: true,
  retryLimit: 3,
  restRequestTimeout: 5000
});

// Login with email and password
(async () => {
  try {
    if (!process.env.COC_EMAIL || !process.env.COC_PASSWORD) {
      throw new Error('COC_EMAIL and COC_PASSWORD must be set in .env file');
    }
    
    console.log('🔐 Logging in to Clash of Clans API...');
    await client.login({
      email: process.env.COC_EMAIL,
      password: process.env.COC_PASSWORD
    });
    console.log('✅ Successfully logged in to Clash of Clans API');
  } catch (error) {
    console.error('❌ Failed to login to Clash of Clans API:', error.message);
    console.error('Please check your COC_EMAIL and COC_PASSWORD in .env file');
    console.error('Make sure you are using valid Supercell ID credentials');
    process.exit(1);
  }
})();

// Helper function to ensure client is logged in
const ensureLoggedIn = async () => {
  try {
    // Try a simple request to check if logged in
    await client.getClan('#2PP');
    console.log('✅ Client is logged in');
  } catch (error) {
    if (error.status === 403 || error.message.includes('Forbidden')) {
      console.log('🔄 Re-logging in to Clash of Clans API...');
      await client.login({
        email: process.env.COC_EMAIL,
        password: process.env.COC_PASSWORD
      });
      console.log('✅ Re-logged in successfully');
    } else {
      throw error;
    }
  }
};

// Cache for 5 minutes
const cache = new NodeCache({ stdTTL: 300 });

// Middleware
app.use(cors());
app.use(express.json());

// Ensure login middleware for API routes
app.use('/api', async (req, res, next) => {
  try {
    await ensureLoggedIn();
    next();
  } catch (error) {
    console.error('Login check failed:', error);
    res.status(500).json({ error: 'Authentication failed' });
  }
});

// Helper function to format clan tag
const formatTag = (tag) => {
  return tag.startsWith('#') ? tag : `#${tag}`;
};

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Get clan info
app.get('/api/clan/:clanTag', async (req, res) => {
  try {
    const clanTag = formatTag(req.params.clanTag);
    const cacheKey = `clan_${clanTag}`;
    
    // Check cache
    const cached = cache.get(cacheKey);
    if (cached) {
      return res.json({ ...cached, cached: true });
    }

    const clan = await client.getClan(clanTag);
    
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

    cache.set(cacheKey, clanData);
    res.json({ ...clanData, cached: false });
  } catch (error) {
    console.error('Error fetching clan:', error);
    res.status(error.status || 500).json({ 
      error: error.message || 'Failed to fetch clan data',
      status: error.status || 500
    });
  }
});

// Get current CWL group
app.get('/api/cwl/:clanTag/current', async (req, res) => {
  try {
    const clanTag = formatTag(req.params.clanTag);
    const cacheKey = `cwl_current_${clanTag}`;
    
    // Check cache
    const cached = cache.get(cacheKey);
    if (cached) {
      return res.json({ ...cached, cached: true });
    }

    const cwlGroup = await client.getClanWarLeagueGroup(clanTag);
    
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

    cache.set(cacheKey, cwlData);
    res.json({ ...cwlData, cached: false });
  } catch (error) {
    console.error('Error fetching CWL group:', error);
    res.status(error.status || 500).json({ 
      error: error.message || 'Failed to fetch CWL data',
      status: error.status || 500
    });
  }
});

// Get specific CWL war
app.get('/api/cwl/war/:warTag', async (req, res) => {
  try {
    const warTag = formatTag(req.params.warTag);
    const cacheKey = `cwl_war_${warTag}`;
    
    // Check cache
    const cached = cache.get(cacheKey);
    if (cached) {
      return res.json({ ...cached, cached: true });
    }

    const war = await client.getClanWarLeagueRound(warTag);
    
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

    cache.set(cacheKey, warData);
    res.json({ ...warData, cached: false });
  } catch (error) {
    console.error('Error fetching CWL war:', error);
    res.status(error.status || 500).json({ 
      error: error.message || 'Failed to fetch war data',
      status: error.status || 500
    });
  }
});

// Get all CWL rounds with details
app.get('/api/cwl/:clanTag/all', async (req, res) => {
  try {
    const clanTag = formatTag(req.params.clanTag);
    console.log('📊 Fetching all CWL data for clan:', clanTag);
    const cacheKey = `cwl_all_${clanTag}`;
    
    // Check cache (shorter TTL for all data)
    const cached = cache.get(cacheKey);
    if (cached) {
      console.log('✅ Returning cached data');
      return res.json({ ...cached, cached: true });
    }

    // Get CWL group first
    console.log('🔍 Fetching CWL group...');
    const cwlGroup = await client.getClanWarLeagueGroup(clanTag);
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
              const isOurClan = war.clan.tag === clanTag;
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
          console.log('🔍 Full clan object keys:', Object.keys(fullClan));
          console.log('✅ Clan data for', c.name, ':', {
            badge: fullClan.badge,
            badgeUrls: fullClan.badgeUrls,
            badges: fullClan.badges
          });
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

    cache.set(cacheKey, allData);
    res.json({ ...allData, cached: false });
  } catch (error) {
    console.error('Error fetching all CWL data:', error);
    res.status(error.status || 500).json({ 
      error: error.message || 'Failed to fetch all CWL data',
      status: error.status || 500
    });
  }
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// Start server only after successful login
const startServer = async () => {
  // Wait a moment for login to complete
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  app.listen(PORT, () => {
    console.log(`🚀 CWL Tracker Backend running on port ${PORT}`);
    console.log(`📡 API endpoints available at http://localhost:${PORT}/api`);
    console.log(`🔐 Authentication: Email/Password`);
  });
};

startServer();
