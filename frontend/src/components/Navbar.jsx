import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const Navbar = () => {
  const [searchTag, setSearchTag] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTag.trim()) {
      const formattedTag = searchTag.replace('#', '');
      navigate(`/cwl/${formattedTag}`);
      setSearchTag('');
      setIsMenuOpen(false);
    }
  };

  return (
    <nav className="sticky top-0 z-50 bg-dark-900/95 backdrop-blur-lg border-b border-dark-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center cursor-pointer"
            onClick={() => navigate('/')}
          >
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 bg-gradient-to-br from-primary-300 to-red-500 rounded-lg flex items-center justify-center shadow-glow-gold">
                  <svg
                    className="w-6 h-6 text-dark-900"
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
              </div>
              <div>
                <h1 className="text-xl font-display font-bold bg-gradient-to-r from-primary-300 to-primary-400 bg-clip-text text-transparent">
                  CWL Tracker
                </h1>
                <p className="text-xs text-dark-400 hidden sm:block">War League Analytics</p>
              </div>
            </div>
          </motion.div>

          {/* Search Bar - Desktop */}
          <motion.form
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            onSubmit={handleSearch}
            className="hidden md:flex items-center max-w-md w-full mx-8"
          >
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Enter clan tag (e.g., #2PP)"
                value={searchTag}
                onChange={(e) => setSearchTag(e.target.value)}
                className="input-field pl-10"
              />
              <svg
                className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-dark-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <button type="submit" className="btn-primary ml-3">
              Search
            </button>
          </motion.form>

          {/* Right Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="flex items-center gap-4"
          >
            <div className="hidden lg:flex items-center gap-2 text-sm text-dark-400">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span>Live Data</span>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-dark-800 transition-colors"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </motion.div>
        </div>

        {/* Mobile Search */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden pb-4"
          >
            <form onSubmit={handleSearch} className="flex gap-2">
              <input
                type="text"
                placeholder="Enter clan tag"
                value={searchTag}
                onChange={(e) => setSearchTag(e.target.value)}
                className="input-field"
              />
              <button type="submit" className="btn-primary">
                Search
              </button>
            </form>
          </motion.div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
