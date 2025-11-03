# 🚀 Quick Start Guide

## Prerequisites
- Node.js (v16+) - [Download here](https://nodejs.org)
- Supercell ID (your Clash of Clans email and password)

## Installation (5 minutes)

### Option 1: Automated Setup (Recommended)
```powershell
# Run the setup script
.\setup.ps1
```

### Option 2: Manual Setup
1. **Setup Backend**
   ```powershell
   cd backend
   npm install
   copy .env.example .env
   # Edit .env and add your Supercell ID credentials
   ```

2. **Setup Frontend**
   ```powershell
   cd ..\frontend
   npm install
   ```

## Setting Up Authentication

1. Open `backend/.env` file
2. Add your Supercell ID credentials:
   ```
   COC_EMAIL=your_email@example.com
   COC_PASSWORD=your_password
   ```
3. These are the same credentials you use to login to Clash of Clans
4. The clashofclans.js library will automatically handle authentication

## Running the Application

### Terminal 1 - Backend
```powershell
cd backend
npm start
```
Backend will run on http://localhost:5000

### Terminal 2 - Frontend
```powershell
cd frontend
npm run dev
```
Frontend will run on http://localhost:3000

**Or use the helper scripts:**
- `.\start-backend.ps1` (Terminal 1)
- `.\start-frontend.ps1` (Terminal 2)

## First Use

1. Open http://localhost:3000
2. Enter a clan tag (e.g., `#2PP` or `2PP`)
3. Click "Search CWL Data"
4. Explore the dashboard!

## Example Clan Tags to Try
- `2PP` - Example clan 1
- `8QU8J9LP` - Example clan 2
- `YLQQ82G` - Example clan 3

## Troubleshooting

### "Failed to fetch CWL data"
- ✓ Check that backend is running
- ✓ Verify API token is correct in `.env`
- ✓ Ensure clan tag is valid
- ✓ Check clan is in CWL this season

### "No CWL data available"
- Clan is not participating in current CWL
- CWL season hasn't started
- Try another clan tag

### Port Already in Use
- Backend (5000): Change `PORT` in `backend/.env`
- Frontend (3000): Change port in `frontend/vite.config.js`

### API Token Issues
- Verify IP address is correct
- Check token hasn't expired
- Create a new key if needed

## File Structure
```
CWL/
├── backend/        # Express API server
├── frontend/       # React dashboard
├── setup.ps1       # Automated setup script
├── start-backend.ps1
├── start-frontend.ps1
└── README.md
```

## Need Help?

1. Check the console for error messages
2. Read the full README.md
3. Verify both servers are running
4. Check browser console (F12)

## Features

✅ Real-time CWL data
✅ Clan overview with badge
✅ Round-by-round breakdown
✅ Detailed attack logs
✅ Performance metrics
✅ Mobile responsive
✅ Shareable links

---

Happy tracking! ⚔️
