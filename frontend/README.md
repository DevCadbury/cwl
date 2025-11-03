# CWL Tracker Frontend

Modern, responsive React frontend for the CWL Tracker application.

## Features

- 🎨 Modern UI with TailwindCSS
- 📱 Fully responsive design (mobile, tablet, desktop)
- ⚡ Fast and smooth animations with Framer Motion
- 🎯 Real-time CWL data visualization
- 📊 Detailed attack logs and statistics
- 🌙 Dark theme optimized for readability

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file:
```bash
copy .env.example .env
```

3. Start the development server:
```bash
npm run dev
```

The app will open at http://localhost:3000

## Building for Production

```bash
npm run build
```

The built files will be in the `dist` folder.

## Preview Production Build

```bash
npm run preview
```

## Project Structure

```
src/
├── components/       # Reusable UI components
│   ├── Navbar.jsx
│   ├── Footer.jsx
│   ├── ClanHeader.jsx
│   ├── RoundCard.jsx
│   ├── AttackTable.jsx
│   ├── StatBadge.jsx
│   └── Loader.jsx
├── pages/           # Page components
│   ├── Home.jsx
│   └── CWLDashboard.jsx
├── services/        # API services
│   └── api.js
├── App.jsx          # Main app component
├── main.jsx         # Entry point
└── index.css        # Global styles
```

## Technologies Used

- React 18
- React Router 6
- TailwindCSS 3
- Framer Motion
- Axios
- Vite
