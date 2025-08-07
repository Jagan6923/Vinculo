# Environment Configuration Guide

## Production Deployment Checklist

### 1. Update config.prod.env with your actual values:

```env
# Replace these placeholder URLs with your actual deployment URLs
BACKEND_URL=https://your-actual-backend-domain.com
FRONTEND_URL=https://your-actual-frontend-domain.com

# Update MongoDB connection string
DB_LOCAL_URI=mongodb+srv://username:password@cluster.mongodb.net/database

# Ensure these are set correctly
JWT_SECRET=your-secure-jwt-secret
RAZORPAY_KEY_ID=your-razorpay-key-id
RAZORPAY_KEY_SECRET=your-razorpay-key-secret
```

### 2. Platform-specific deployment:

#### Railway:

- Set NODE_ENV=production in Railway dashboard
- Add all environment variables from config.prod.env
- Set root directory to 'backend'
- Railway will automatically use 'npm start'

#### Vercel:

- Add vercel.json in backend folder
- Set environment variables in Vercel dashboard

#### Heroku:

- Add all environment variables in Heroku dashboard
- Ensure PORT is set (Heroku provides this automatically)

### 3. Database Setup:

- Create MongoDB Atlas cluster
- Update connection string in DB_LOCAL_URI
- Whitelist IP addresses (0.0.0.0/0 for all IPs or specific deployment IPs)

### 4. CORS Configuration:

- Update frontend URL in app.js CORS configuration
- Ensure both HTTP and HTTPS URLs are included if needed

### Common 404 Error Causes:

1. Wrong build directory or start command
2. Environment variables not loaded properly
3. Database connection issues
4. Missing files in deployment
5. Incorrect port configuration
