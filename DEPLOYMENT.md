# 🚀 Deployment Guide

## Overview

This guide covers deploying the CWL Tracker application to various hosting platforms.

---

## Backend Deployment

### Option 1: Railway (Recommended)

1. **Create account** at [railway.app](https://railway.app)

2. **Connect GitHub** (optional) or deploy from CLI

3. **Create new project** → Deploy from GitHub repo

4. **Configure environment variables**:
   ```
   COC_API_TOKEN=your_token_here
   PORT=5000
   NODE_ENV=production
   ```

5. **Set root directory**: `/backend`

6. **Deploy**! Railway auto-detects Node.js

7. **Note your backend URL**: `https://your-app.railway.app`

### Option 2: Render

1. Create account at [render.com](https://render.com)
2. New → Web Service
3. Connect repository
4. Settings:
   - **Root Directory**: `backend`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
5. Add environment variable: `COC_API_TOKEN`
6. Deploy

### Option 3: Heroku

```bash
cd backend
heroku create cwl-tracker-api
heroku config:set COC_API_TOKEN=your_token_here
git subtree push --prefix backend heroku main
```

---

## Frontend Deployment

### Option 1: Vercel (Recommended)

1. **Install Vercel CLI**:
   ```bash
   npm install -g vercel
   ```

2. **Deploy**:
   ```bash
   cd frontend
   vercel
   ```

3. **Configure**:
   - Framework: Vite
   - Build Command: `npm run build`
   - Output Directory: `dist`

4. **Set environment variable**:
   ```
   VITE_API_URL=https://your-backend-url.railway.app/api
   ```

5. **Deploy to production**: `vercel --prod`

### Option 2: Netlify

1. Create account at [netlify.com](https://netlify.com)
2. New site from Git
3. Configure:
   - **Base directory**: `frontend`
   - **Build command**: `npm run build`
   - **Publish directory**: `frontend/dist`
4. Environment variables:
   ```
   VITE_API_URL=https://your-backend-url/api
   ```
5. Deploy

### Option 3: GitHub Pages (Static)

```bash
cd frontend
npm run build
npm install -g gh-pages
gh-pages -d dist
```

---

## Complete Deployment Checklist

### Backend
- [ ] Create hosting account (Railway/Render/Heroku)
- [ ] Deploy backend application
- [ ] Set `COC_API_TOKEN` environment variable
- [ ] Set `NODE_ENV=production`
- [ ] Verify health endpoint: `GET /api/health`
- [ ] Note the backend URL

### Frontend
- [ ] Create hosting account (Vercel/Netlify)
- [ ] Update `VITE_API_URL` with backend URL
- [ ] Deploy frontend application
- [ ] Test the live site
- [ ] Configure custom domain (optional)

### Post-Deployment
- [ ] Test with real clan tags
- [ ] Check error handling
- [ ] Verify mobile responsiveness
- [ ] Monitor API rate limits
- [ ] Set up analytics (optional)

---

## Environment Variables

### Backend (.env)
```env
# Required
COC_API_TOKEN=your_clash_of_clans_api_token

# Optional
PORT=5000
NODE_ENV=production
```

### Frontend (.env)
```env
# Production backend URL
VITE_API_URL=https://your-backend-url.com/api
```

---

## Custom Domain Setup

### Backend (Railway)
1. Go to Settings → Domains
2. Add custom domain
3. Update DNS records as shown

### Frontend (Vercel)
1. Go to Settings → Domains
2. Add domain
3. Configure DNS:
   ```
   Type: CNAME
   Name: www
   Value: cname.vercel-dns.com
   ```

---

## Monitoring & Logs

### Backend Logs
**Railway**: Dashboard → Deployments → View Logs
**Render**: Dashboard → Logs
**Heroku**: `heroku logs --tail`

### Frontend Logs
**Vercel**: Dashboard → Functions → Logs
**Netlify**: Dashboard → Functions → Logs

---

## Performance Optimization

### Backend
- Enable compression middleware
- Increase cache TTL for production
- Use CDN for static assets
- Monitor API rate limits

### Frontend
- Enable Vercel/Netlify CDN
- Configure caching headers
- Optimize images (WebP)
- Enable gzip compression

---

## Security Checklist

- [ ] Never commit `.env` files
- [ ] Use HTTPS for all endpoints
- [ ] Set CORS allowed origins
- [ ] Rotate API tokens regularly
- [ ] Monitor for unusual traffic
- [ ] Implement rate limiting
- [ ] Keep dependencies updated

---

## Cost Estimates

### Free Tier Options
| Service | Backend | Frontend |
|---------|---------|----------|
| Railway | 500 hrs/mo | N/A |
| Render | 750 hrs/mo | N/A |
| Vercel | N/A | 100 GB bandwidth |
| Netlify | N/A | 100 GB bandwidth |

**Total Cost**: $0/month (within free tiers)

### Paid Tier (Optional)
- Railway: $5/month
- Vercel Pro: $20/month
- Netlify Pro: $19/month

---

## Troubleshooting

### "Cannot connect to backend"
1. Check `VITE_API_URL` is correct
2. Verify backend is running
3. Check CORS settings
4. Ensure HTTPS is used

### "API token invalid"
1. Check token in backend environment
2. Verify IP address whitelist
3. Generate new token if needed
4. Redeploy backend

### "Build failed"
1. Check Node.js version (16+)
2. Clear cache and rebuild
3. Check package.json scripts
4. Review build logs

---

## Scaling Considerations

### Backend
- **Cache**: Use Redis for distributed caching
- **Database**: Add MongoDB for historical data
- **Load Balancer**: Use Railway's auto-scaling
- **CDN**: CloudFlare for API caching

### Frontend
- Automatically scales with Vercel/Netlify
- No additional configuration needed

---

## Backup & Rollback

### Railway
- Automatic deployments from Git
- Rollback: Dashboard → Deployments → Redeploy previous

### Vercel
- All deployments saved
- Instant rollback from dashboard

---

## CI/CD Setup (Optional)

### GitHub Actions Example
```yaml
name: Deploy
on:
  push:
    branches: [main]

jobs:
  deploy-backend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Deploy to Railway
        run: railway up
        env:
          RAILWAY_TOKEN: ${{ secrets.RAILWAY_TOKEN }}

  deploy-frontend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Deploy to Vercel
        run: vercel --prod
        env:
          VERCEL_TOKEN: ${{ secrets.VERCEL_TOKEN }}
```

---

## Support Resources

- **Railway**: [docs.railway.app](https://docs.railway.app)
- **Vercel**: [vercel.com/docs](https://vercel.com/docs)
- **Render**: [render.com/docs](https://render.com/docs)
- **Netlify**: [docs.netlify.com](https://docs.netlify.com)

---

## Quick Deploy Commands

```bash
# Backend (Railway)
cd backend
railway login
railway init
railway up

# Frontend (Vercel)
cd frontend
vercel login
vercel
vercel --prod
```

---

**Your CWL Tracker is now live! 🎉**

Share your deployment URL with your clan and start tracking CWL data!
