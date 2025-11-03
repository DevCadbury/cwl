import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getClan, getAllCWL, getCurrentCWL, getCWLWar } from '../services/api';
import ClanHeader from '../components/ClanHeader';
import RoundCard from '../components/RoundCard';
import AttackTable from '../components/AttackTable';
import ClanLeaderboard from '../components/ClanLeaderboard';
import Loader, { SkeletonCard } from '../components/Loader';

const CWLDashboard = () => {
  const { clanTag } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [clanData, setClanData] = useState(null);
  const [cwlData, setCwlData] = useState(null);
  const [cwlGroupData, setCwlGroupData] = useState(null);
  const [selectedWar, setSelectedWar] = useState(null);
  const [loadingWar, setLoadingWar] = useState(false);
  const [lastUpdate, setLastUpdate] = useState(new Date());

  useEffect(() => {
    fetchCWLData();
  }, [clanTag]);

  const fetchCWLData = async () => {
    setLoading(true);
    setError(null);
    setSelectedWar(null);

    try {
      // Fetch clan info, CWL data, and CWL group in parallel
      const [clan, cwl, cwlGroup] = await Promise.all([
        getClan(clanTag),
        getAllCWL(clanTag),
        getCurrentCWL(clanTag)
      ]);

      setClanData(clan);
      setCwlData(cwl);
      setCwlGroupData(cwlGroup);
      setLastUpdate(new Date());
    } catch (err) {
      console.error('Error fetching CWL data:', err);
      setError(err.response?.data?.error || 'Failed to fetch CWL data. Please check the clan tag and try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleWarClick = async (warTag) => {
    if (!warTag || warTag === '#0') {
      console.warn('Invalid war tag:', warTag);
      return;
    }
    
    setLoadingWar(true);
    try {
      const war = await getCWLWar(warTag);
      setSelectedWar(war);
    } catch (err) {
      console.error('Error fetching war details:', err);
      alert('Failed to load war details. Please try again.');
    } finally {
      setLoadingWar(false);
    }
  };

  const handleRefresh = () => {
    fetchCWLData();
  };

  const handleCopyLink = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url);
    alert('Link copied to clipboard!');
  };

  if (loading) {
    return <Loader fullScreen />;
  }

  if (error) {
    return (
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="card p-8 max-w-lg text-center"
        >
          <div className="w-16 h-16 mx-auto mb-4 bg-red-500/10 rounded-full flex items-center justify-center">
            <svg className="w-8 h-8 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-dark-50 mb-3">Error Loading Data</h2>
          <p className="text-dark-400 mb-6">{error}</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button onClick={handleRefresh} className="btn-primary">
              Try Again
            </button>
            <button onClick={() => navigate('/')} className="btn-secondary">
              Go Home
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  if (!cwlData || !cwlData.rounds || cwlData.rounds.length === 0) {
    return (
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="card p-8 max-w-lg text-center"
        >
          <div className="w-16 h-16 mx-auto mb-4 bg-primary-300/10 rounded-full flex items-center justify-center">
            <svg className="w-8 h-8 text-primary-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-dark-50 mb-3">No CWL Data Available</h2>
          <p className="text-dark-400 mb-6">
            This clan is not currently participating in CWL or the season hasn't started yet.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button onClick={handleRefresh} className="btn-primary">
              Refresh
            </button>
            <button onClick={() => navigate('/')} className="btn-secondary">
              Try Another Clan
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-dark-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Clan Header */}
        <div className="mb-8">
          <ClanHeader clan={clanData} season={cwlData.season} />
        </div>

        {/* CWL Leaderboard */}
        {cwlGroupData && (
          <ClanLeaderboard cwlData={{ ...cwlData, clans: cwlGroupData.clans }} />
        )}

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-wrap items-center justify-between gap-4 mb-8"
        >
          <div>
            <h2 className="text-2xl font-display font-bold text-dark-50 mb-1">
              CWL Rounds
            </h2>
            <p className="text-sm text-dark-400">
              Season: {cwlData.season} • {cwlData.state === 'inWar' ? 'In Progress' : 'Completed'}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleCopyLink}
              className="btn-secondary flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
              </svg>
              <span className="hidden sm:inline">Share</span>
            </button>
            <button
              onClick={handleRefresh}
              className="btn-primary flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              <span className="hidden sm:inline">Refresh</span>
            </button>
          </div>
        </motion.div>

        {/* Selected War Details */}
        {selectedWar && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-dark-50">Detailed Attack Log</h3>
              <button
                onClick={() => setSelectedWar(null)}
                className="text-dark-400 hover:text-dark-50 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            {loadingWar ? (
              <SkeletonCard />
            ) : (
              <AttackTable warData={selectedWar} clanTag={clanTag} />
            )}
          </motion.div>
        )}

        {/* Rounds Grid */}
        <div className="space-y-6">
          {cwlData.rounds.map((roundData, index) => {
            // Find our clan's war in this round
            const ourWar = roundData.wars?.find(war => 
              war && (war.ourClan?.tag === `#${clanTag}` || war.ourClan?.tag === clanTag)
            );

            if (!ourWar) return null;

            return (
              <RoundCard
                key={`round-${index}`}
                round={ourWar}
                roundNumber={roundData.round}
                clanTag={clanTag}
                onWarClick={handleWarClick}
              />
            );
          })}
        </div>

        {/* Last Updated */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-8 text-center text-sm text-dark-500"
        >
          Last updated: {lastUpdate.toLocaleTimeString()} • 
          {cwlData.cached ? ' Cached data' : ' Live data'}
        </motion.div>
      </div>
    </div>
  );
};

export default CWLDashboard;
