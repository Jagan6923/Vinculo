# Deployment Guide

## Separate Frontend & Backend Hosting

This guide explains how to deploy your frontend and backend separately for better scalability and maintenance.

## Backend Deployment

### Option 1: Railway (Recommended)

1. **Prepare your backend**

   ```bash
   cd backend
   ```

2. **Create a Railway account** at https://railway.app

3. **Deploy from GitHub**

   - Connect your GitHub repository
   - Select the backend folder
   - Railway will automatically detect Node.js

4. **Environment Variables**
   Add these in Railway dashboard:

   ```
   NODE_ENV=production
   PORT=8000
   DB_LOCAL_URI=your_mongodb_atlas_connection_string
   JWT_SECRET=your_jwt_secret
   FRONTEND_URL=https://your-frontend-domain.vercel.app
   RAZORPAY_KEY_ID=your_razorpay_key
   RAZORPAY_KEY_SECRET=your_razorpay_secret
   ```

5. **Database Setup**
   - Create MongoDB Atlas account
   - Create a cluster
   - Get connection string
   - Update DB_LOCAL_URI

### Option 2: Heroku

1. **Install Heroku CLI**

2. **Deploy**

   ```bash
   cd backend
   heroku create your-backend-app
   git push heroku main
   ```

3. **Set environment variables**
   ```bash
   heroku config:set NODE_ENV=production
   heroku config:set DB_LOCAL_URI=your_mongodb_connection
   # ... other variables
   ```

### Option 3: DigitalOcean App Platform

1. **Create account** at DigitalOcean

2. **Create new app**

   - Connect GitHub repository
   - Choose backend folder
   - Set build and run commands

3. **Configure environment variables**

## Frontend Deployment

### Option 1: Vercel (Recommended)

1. **Update API base URL**
   In your frontend code, update the API base URL to your deployed backend:

   ```javascript
   const API_BASE_URL = "https://your-backend.railway.app/api/v1";
   ```

2. **Deploy to Vercel**
   ```bash
   cd frontend
   npm run build
   npx vercel --prod
   ```

### Option 2: Netlify

1. **Build the project**

   ```bash
   cd frontend
   npm run build
   ```

2. **Deploy to Netlify**
   - Drag and drop the `build` folder to Netlify
   - Or connect via GitHub

## Important Configuration Updates

### 1. Update Backend CORS

In `backend/app.js`, update allowed origins:

```javascript
const allowedOrigins = [
  "http://localhost:3000",
  "https://your-frontend-domain.vercel.app", // Add your frontend URL
  "https://your-frontend-domain.netlify.app",
];
```

### 2. Update Frontend API URLs

Create an environment file in your frontend:

```javascript
// frontend/.env
REACT_APP_API_URL=https://your-backend.railway.app/api/v1
```

### 3. Update Environment Variables

**Backend Production (.env)**:

```
NODE_ENV=production
PORT=8000
DB_LOCAL_URI=mongodb+srv://username:password@cluster.mongodb.net/database
FRONTEND_URL=https://your-frontend-domain.vercel.app
BACKEND_URL=https://your-backend.railway.app
```

## Testing the Deployment

1. **Backend API Test**

   ```bash
   curl https://your-backend.railway.app/api/health
   ```

2. **Frontend Test**
   - Visit your frontend URL
   - Test login/registration
   - Test product loading
   - Test cart functionality

## Monitoring and Maintenance

### Backend Logs

```bash
# Railway
railway logs

# Heroku
heroku logs --tail -a your-app-name
```

### Frontend Analytics

- Set up Google Analytics
- Monitor Core Web Vitals
- Set up error tracking (Sentry)

## Security Checklist

- [ ] Environment variables are set correctly
- [ ] CORS origins are properly configured
- [ ] JWT secrets are secure
- [ ] Database has proper authentication
- [ ] HTTPS is enabled on both frontend and backend
- [ ] API rate limiting is configured
- [ ] Input validation is in place

## Database Migration

If you're moving from local MongoDB to Atlas:

1. **Export local data**

   ```bash
   mongodump --db data --out ./backup
   ```

2. **Import to Atlas**
   ```bash
   mongorestore --uri "mongodb+srv://..." ./backup/data
   ```

## Troubleshooting

### Common Issues

1. **CORS Errors**

   - Check allowed origins in backend
   - Verify frontend URL is correct

2. **Database Connection**

   - Verify MongoDB Atlas connection string
   - Check network access settings

3. **Environment Variables**

   - Ensure all required variables are set
   - Check for typos in variable names

4. **File Uploads**
   - Configure cloud storage (AWS S3, Cloudinary)
   - Update multer configuration

### Support

If you encounter issues:

1. Check deployment platform logs
2. Verify environment variables
3. Test API endpoints individually
4. Check network connectivity

## Cost Optimization

### Free Tier Options

- **Backend**: Railway (free tier), Heroku (limited free), Railway
- **Frontend**: Vercel (free), Netlify (free)
- **Database**: MongoDB Atlas (free tier - 512MB)

### Scaling Considerations

- Monitor resource usage
- Implement caching (Redis)
- Use CDN for static assets
- Implement database indexing
