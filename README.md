# 🛡️ CWL Tracker

A modern, full-stack web application for tracking and analyzing Clash of Clans Clan War League (CWL) data. Features a beautiful, responsive dashboard with real-time data visualization.

![CWL Tracker](https://img.shields.io/badge/CWL-Tracker-orange?style=for-the-badge)
![React](https://img.shields.io/badge/React-18-blue?style=for-the-badge&logo=react)
![Node.js](https://img.shields.io/badge/Node.js-Express-green?style=for-the-badge&logo=node.js)

## ✨ Features

### 🎯 Core Features
- **Real-time CWL Analytics** - Live data from Clash of Clans API
- **Responsive Design** - Works perfectly on desktop, tablet, and mobile
- **Clan Overview** - Badge, stats, league tier, and member count
- **Round-by-Round Breakdown** - Visual cards for each CWL round
- **Detailed Attack Logs** - See every attack with stars, destruction %, and TH levels
- **Performance Metrics** - Track clan and player performance
- **Shareable Links** - Share your clan dashboard with anyone

### 🎨 Design Features
- Dark theme with Clash of Clans-inspired colors
- Smooth animations and transitions
- Interactive components with hover effects
- Skeleton loaders for better UX
- Iconography and visual accents
- Mobile-optimized layouts

### 🔧 Technical Features
- Backend API abstraction layer
- Data caching for performance
- Error handling and validation
- RESTful API architecture
- Modular component structure

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Supercell ID (Clash of Clans account email and password)

### Installation

1. **Clone the repository**
```bash
cd C:\Users\Chaman\Downloads\CWL
```

2. **Setup Backend**
```bash
cd backend
npm install
copy .env.example .env
# Edit .env and add your Supercell ID email and password
```

3. **Setup Frontend**
```bash
cd ../frontend
npm install
copy .env.example .env
```

### Running the Application

1. **Start the Backend** (Terminal 1)
```bash
cd backend
npm start
```
Backend runs on http://localhost:5000

2. **Start the Frontend** (Terminal 2)
```bash
cd frontend
npm run dev
```
Frontend runs on http://localhost:3000

3. **Open your browser**
Navigate to http://localhost:3000

## 📁 Project Structure

```
CWL/
├── backend/
│   ├── server.js           # Express server with API routes
│   ├── package.json        # Backend dependencies
│   ├── .env.example        # Environment variables template
│   └── README.md           # Backend documentation
│
└── frontend/
    ├── src/
    │   ├── components/     # Reusable UI components
    │   │   ├── Navbar.jsx
    │   │   ├── Footer.jsx
    │   │   ├── ClanHeader.jsx
    │   │   ├── RoundCard.jsx
    │   │   ├── AttackTable.jsx
    │   │   ├── StatBadge.jsx
    │   │   └── Loader.jsx
    │   ├── pages/         # Page components
    │   │   ├── Home.jsx
    │   │   └── CWLDashboard.jsx
    │   ├── services/      # API services
    │   │   └── api.js
    │   ├── App.jsx        # Main app
    │   ├── main.jsx       # Entry point
    │   └── index.css      # Global styles
    ├── package.json       # Frontend dependencies
    ├── vite.config.js     # Vite configuration
    ├── tailwind.config.js # Tailwind configuration
    └── README.md          # Frontend documentation
```

## 🎮 How to Use

1. **Find Your Clan Tag**
   - Open Clash of Clans
   - Go to your clan page
   - Copy the clan tag (e.g., #2PP)

2. **Search for Your Clan**
   - Enter the clan tag in the search bar
   - Press "Search" or Enter

3. **View CWL Data**
   - See clan overview with badge and stats
   - Browse through CWL rounds
   - Click on rounds to see detailed attack logs
   - Share your dashboard link with clan members

## 🔌 API Endpoints

### Backend API

- `GET /api/health` - Health check
- `GET /api/clan/:clanTag` - Get clan information
- `GET /api/cwl/:clanTag/current` - Get current CWL group
- `GET /api/cwl/:clanTag/all` - Get all CWL rounds with details
- `GET /api/cwl/war/:warTag` - Get specific war details

### Example Request
```bash
curl http://localhost:5000/api/clan/%232PP
```

## 🎨 Design System

### Color Palette
- **Background**: Dark Navy (#0f172a, #1e293b)
- **Accent**: Gold (#facc15)
- **Success**: Emerald Green (#10b981)
- **Danger**: Red (#ef4444)
- **Text**: Off-white (#f8fafc)

### Typography
- **Headings**: Poppins (Bold, 600-800)
- **Body**: Inter (Regular, 400-600)

### Components
- Gradient mesh backgrounds
- Glassmorphism cards
- Glow effects on interactive elements
- Smooth transitions and animations

## 🛠️ Technologies Used

### Frontend
- **React 18** - UI framework
- **React Router 6** - Routing
- **TailwindCSS 3** - Styling
- **Framer Motion** - Animations
- **Axios** - HTTP client
- **Vite** - Build tool

### Backend
- **Node.js** - Runtime
- **Express** - Web framework
- **clashofclans.js** - CoC API wrapper
- **node-cache** - Caching
- **dotenv** - Environment variables
- **cors** - CORS handling

## 📱 Responsive Breakpoints

- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: > 1024px

## 🔒 Security Notes

- Never commit your `.env` file
- Keep your Clash of Clans API token private
- API tokens are rate-limited by Supercell

## 🤝 Contributing

This is a personal project, but feel free to fork and customize for your own use!

## 📄 License

MIT License - feel free to use this project for your clan!

## 🙏 Credits

- **Clash of Clans API** - [developer.clashofclans.com](https://developer.clashofclans.com)
- **clashofclans.js** - [clashofclans.js.org](https://clashofclans.js.org/)
- Game assets and content © Supercell

## 📞 Support

If you encounter any issues:
1. Check that your API token is valid
2. Verify the clan tag is correct
3. Ensure both backend and frontend are running
4. Check the browser console for errors

## 🎯 Future Enhancements

- [ ] Player-specific statistics
- [ ] Historical season data
- [ ] Clan comparison feature
- [ ] Export data to CSV/PDF
- [ ] Dark/Light theme toggle
- [ ] Advanced filtering and sorting
- [ ] Performance analytics charts

---

Built with ⚔️ for Clash of Clans players

**Disclaimer**: This content is not affiliated with, endorsed, sponsored, or specifically approved by Supercell and Supercell is not responsible for it.
