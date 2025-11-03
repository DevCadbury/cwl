# CWL Tracker Backend

Backend API for the CWL Tracker application.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file based on `.env.example`:
```bash
copy .env.example .env
```

3. Add your Supercell ID credentials to `.env`:
   - Use your Clash of Clans Supercell ID email and password
   - The same credentials you use to login to the game
   - Example:
     ```
     COC_EMAIL=your_email@example.com
     COC_PASSWORD=your_password
     ```

4. Start the server:
```bash
npm start
# or for development with auto-reload:
npm run dev
```

## API Endpoints

- `GET /api/health` - Health check
- `GET /api/clan/:clanTag` - Get clan information
- `GET /api/cwl/:clanTag/current` - Get current CWL group
- `GET /api/cwl/:clanTag/all` - Get all CWL rounds with details
- `GET /api/cwl/war/:warTag` - Get specific war details

## Example

```bash
curl http://localhost:5000/api/clan/%232PP
```
