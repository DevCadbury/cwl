# CWL Tracker Setup Script for Windows PowerShell

Write-Host "🛡️  CWL Tracker Setup" -ForegroundColor Cyan
Write-Host "==========================================`n" -ForegroundColor Cyan

# Check if Node.js is installed
Write-Host "Checking for Node.js..." -ForegroundColor Yellow
try {
    $nodeVersion = node --version
    Write-Host "✓ Node.js is installed: $nodeVersion" -ForegroundColor Green
} catch {
    Write-Host "✗ Node.js is not installed!" -ForegroundColor Red
    Write-Host "Please install Node.js from https://nodejs.org" -ForegroundColor Red
    exit 1
}

# Setup Backend
Write-Host "`nSetting up Backend..." -ForegroundColor Yellow
Set-Location backend

if (-not (Test-Path ".env")) {
    Write-Host "Creating .env file..." -ForegroundColor Yellow
    Copy-Item .env.example .env
    Write-Host "⚠️  Please edit backend/.env and add your Supercell ID credentials" -ForegroundColor Yellow
    Write-Host "   Use your Clash of Clans email and password" -ForegroundColor Yellow
}

Write-Host "Installing backend dependencies..." -ForegroundColor Yellow
npm install

if ($LASTEXITCODE -eq 0) {
    Write-Host "✓ Backend setup complete!" -ForegroundColor Green
} else {
    Write-Host "✗ Backend setup failed!" -ForegroundColor Red
    exit 1
}

# Setup Frontend
Write-Host "`nSetting up Frontend..." -ForegroundColor Yellow
Set-Location ../frontend

if (-not (Test-Path ".env")) {
    Write-Host "Creating .env file..." -ForegroundColor Yellow
    Copy-Item .env.example .env
}

Write-Host "Installing frontend dependencies..." -ForegroundColor Yellow
npm install

if ($LASTEXITCODE -eq 0) {
    Write-Host "✓ Frontend setup complete!" -ForegroundColor Green
} else {
    Write-Host "✗ Frontend setup failed!" -ForegroundColor Red
    exit 1
}

Set-Location ..

Write-Host "`n=========================================" -ForegroundColor Cyan
Write-Host "✓ Setup Complete!" -ForegroundColor Green
Write-Host "=========================================" -ForegroundColor Cyan

Write-Host "`n📋 Next Steps:" -ForegroundColor Yellow
Write-Host "1. Edit backend/.env and add your Supercell ID credentials" -ForegroundColor White
Write-Host "   Use your Clash of Clans email and password" -ForegroundColor Gray
Write-Host "`n2. Start the backend server:" -ForegroundColor White
Write-Host "   cd backend" -ForegroundColor Gray
Write-Host "   npm start" -ForegroundColor Gray
Write-Host "`n3. In a new terminal, start the frontend:" -ForegroundColor White
Write-Host "   cd frontend" -ForegroundColor Gray
Write-Host "   npm run dev" -ForegroundColor Gray
Write-Host "`n4. Open http://localhost:3000 in your browser" -ForegroundColor White
Write-Host "`n🎮 Happy tracking!" -ForegroundColor Cyan
