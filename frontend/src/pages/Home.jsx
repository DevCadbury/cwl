import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const Home = () => {
  const [clanTag, setClanTag] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (clanTag.trim()) {
      const formattedTag = clanTag.replace('#', '');
      navigate(`/cwl/${formattedTag}`);
    }
  };

  const exampleClans = [
    { name: 'Example Clan 1', tag: '2PP' },
    { name: 'Example Clan 2', tag: '8QU8J9LP' },
    { name: 'Example Clan 3', tag: 'YLQQ82G' },
  ];

  return (
    <div className="min-h-[calc(100vh-4rem)] gradient-mesh">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          {/* Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            className="inline-block mb-8"
          >
            <div className="w-24 h-24 mx-auto bg-gradient-to-br from-primary-300 to-red-500 rounded-2xl flex items-center justify-center shadow-glow-gold">
              <svg
                className="w-14 h-14 text-dark-900"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                />
              </svg>
            </div>
          </motion.div>

          {/* Title */}
          <h1 className="text-5xl md:text-7xl font-display font-bold mb-6">
            <span className="bg-gradient-to-r from-primary-300 via-red-400 to-primary-300 bg-clip-text text-transparent">
              CWL Tracker
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-dark-300 mb-4 max-w-3xl mx-auto">
            Advanced analytics and visualization for Clash of Clans Clan War League
          </p>
          <p className="text-dark-400 max-w-2xl mx-auto">
            Track your clan's CWL performance, analyze attack strategies, and monitor war results in real-time
          </p>
        </motion.div>

        {/* Search Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="max-w-2xl mx-auto mb-12"
        >
          <form onSubmit={handleSubmit} className="card p-8">
            <label className="block text-sm font-semibold text-dark-300 mb-3">
              Enter Clan Tag
            </label>
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="text"
                placeholder="#2PP or 2PP"
                value={clanTag}
                onChange={(e) => setClanTag(e.target.value)}
                className="input-field flex-1"
              />
              <button type="submit" className="btn-primary whitespace-nowrap">
                <span className="flex items-center gap-2 justify-center">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  Search CWL Data
                </span>
              </button>
            </div>
            <p className="text-xs text-dark-500 mt-3">
              Find your clan tag in-game or on the Clash of Clans website
            </p>
          </form>

          {/* Example Clans */}
          <div className="mt-6">
            <p className="text-sm text-dark-400 mb-3 text-center">Try these example clans:</p>
            <div className="flex flex-wrap justify-center gap-2">
              {exampleClans.map((clan) => (
                <button
                  key={clan.tag}
                  onClick={() => navigate(`/cwl/${clan.tag}`)}
                  className="px-4 py-2 bg-dark-800 hover:bg-dark-700 border border-dark-700 hover:border-primary-300 rounded-lg text-sm text-dark-300 hover:text-primary-300 transition-all"
                >
                  #{clan.tag}
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto"
        >
          <div className="card p-6 text-center">
            <div className="w-12 h-12 mx-auto mb-4 bg-primary-300/10 rounded-xl flex items-center justify-center">
              <svg className="w-6 h-6 text-primary-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h3 className="font-bold text-dark-50 mb-2">Real-time Analytics</h3>
            <p className="text-sm text-dark-400">
              Live CWL data with instant updates on war status and results
            </p>
          </div>

          <div className="card p-6 text-center">
            <div className="w-12 h-12 mx-auto mb-4 bg-green-500/10 rounded-xl flex items-center justify-center">
              <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </div>
            <h3 className="font-bold text-dark-50 mb-2">Detailed Insights</h3>
            <p className="text-sm text-dark-400">
              Deep dive into attack logs, player performance, and strategies
            </p>
          </div>

          <div className="card p-6 text-center">
            <div className="w-12 h-12 mx-auto mb-4 bg-red-500/10 rounded-xl flex items-center justify-center">
              <svg className="w-6 h-6 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="font-bold text-dark-50 mb-2">Mobile Responsive</h3>
            <p className="text-sm text-dark-400">
              Optimized for all devices - desktop, tablet, and mobile
            </p>
          </div>
        </motion.div>

        {/* How to Use */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="max-w-3xl mx-auto mt-16"
        >
          <div className="card p-8">
            <h2 className="text-2xl font-display font-bold text-dark-50 mb-6 text-center">
              How to Use
            </h2>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-primary-300 flex items-center justify-center flex-shrink-0 font-bold text-dark-900">
                  1
                </div>
                <div>
                  <h3 className="font-semibold text-dark-50 mb-1">Find Your Clan Tag</h3>
                  <p className="text-sm text-dark-400">
                    Open Clash of Clans, go to your clan page, and copy the clan tag (starts with #)
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-primary-300 flex items-center justify-center flex-shrink-0 font-bold text-dark-900">
                  2
                </div>
                <div>
                  <h3 className="font-semibold text-dark-50 mb-1">Enter Clan Tag</h3>
                  <p className="text-sm text-dark-400">
                    Paste the clan tag in the search box above (with or without the # symbol)
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-primary-300 flex items-center justify-center flex-shrink-0 font-bold text-dark-900">
                  3
                </div>
                <div>
                  <h3 className="font-semibold text-dark-50 mb-1">View CWL Analytics</h3>
                  <p className="text-sm text-dark-400">
                    Explore your clan's CWL rounds, attack logs, and performance metrics
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Home;
