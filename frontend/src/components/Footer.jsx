const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-dark-900 border-t border-dark-700 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About */}
          <div>
            <h3 className="text-lg font-display font-bold text-primary-300 mb-3">
              CWL Tracker
            </h3>
            <p className="text-dark-400 text-sm leading-relaxed">
              Advanced analytics and visualization for Clash of Clans Clan War League.
              Track your clan's performance and analyze war strategies.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-dark-50 mb-3">Quick Links</h3>
            <ul className="space-y-2 text-sm text-dark-400">
              <li>
                <a
    
                >
                  .
                </a>
              </li>
              <li>
                <a
                >
                  .
                </a>
              </li>
            </ul>
          </div>

          {/* Info */}
          <div>
            <h3 className="text-lg font-semibold text-dark-50 mb-3">Information</h3>
            <p className="text-dark-400 text-sm leading-relaxed">
              This content is not affiliated with, endorsed, sponsored, or specifically
              approved by Supercell and Supercell is not responsible for it.
            </p>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-dark-800">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-dark-400 text-sm">
              © {currentYear} CWL Tracker. Built with ⚔️ for Clash of Clans.
            </p>
            <div className="flex items-center gap-2 text-sm text-dark-400">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              <span>Real-time data sync</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
