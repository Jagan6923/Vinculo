const express = require('express');
const app = express();
const errorMiddleware = require('./middlewares/error');
const cookieParser = require('cookie-parser')
const path = require('path')
const dotenv = require('dotenv');
const cors = require('cors');

// Load environment variables based on NODE_ENV
const envFile = process.env.NODE_ENV === 'production' ? 'config.prod.env' : 'config.env';
dotenv.config({ path: path.join(__dirname, `config/${envFile}`) });

const shiprocketRoutes = require('./routes/shiprocketRoutes');
const deliveryRoutes = require('./routes/deliveryroute');
// const Product = require('./products'); 
const { isAuthenticatedUser, authorizeRoles } = require('./middlewares/authenticate');

// CORS configuration for separate frontend/backend hosting
const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests from localhost and production domains
    const allowedOrigins = [
      'http://localhost:3000',
      'http://127.0.0.1:3000',
      process.env.FRONTEND_URL, // Your production frontend URL
      'https://vinculo-mgdn.vercel.app' // Your actual frontend domain
    ].filter(Boolean); // Remove undefined values

    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true, // Allow cookies to be sent
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS', 'HEAD'],
  allowedHeaders: [
    'Origin',
    'X-Requested-With',
    'Content-Type',
    'Accept',
    'Authorization',
    'Cache-Control',
    'X-HTTP-Method-Override'
  ],
  exposedHeaders: ['Set-Cookie'],
  optionsSuccessStatus: 200, // For legacy browser support
  preflightContinue: false
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))


const products = require('./routes/product')
const auth = require('./routes/auth')
const order = require('./routes/order')
const payment = require('./routes/payment')
const cartRoutes = require('./routes/cart');



const userRoutes = require('./routes/user');

app.use('/api/v1/products', products);
app.use('/api/v1/users', userRoutes);
app.use('/api/v1', auth); // Remove '/auth' to make routes like /api/v1/register work
app.use('/api/v1/orders', order);
app.use('/api/v1/payments', payment);
app.use('/api/v1/cart', isAuthenticatedUser, cartRoutes);
app.use('/api/v1/shiprocket', shiprocketRoutes);
app.use('/api/v1/delivery', deliveryRoutes);

// Health check endpoint
app.get('/', (req, res) => {
  res.json({
    message: "Vinculo API is running",
    status: "healthy",
    timestamp: new Date().toISOString()
  });
});

// API health check
app.get('/api/health', (req, res) => {
  res.json({
    message: "API is healthy",
    status: "ok",
    timestamp: new Date().toISOString()
  });
});

app.use(errorMiddleware)

module.exports = app;