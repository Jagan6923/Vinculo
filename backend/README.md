# Vinculo E-commerce Backend API

A Node.js/Express backend API for the Vinculo e-commerce platform.

## 🚀 Features

- **Authentication & Authorization**: JWT-based user authentication
- **Product Management**: CRUD operations for products
- **Order Management**: Complete order lifecycle management
- **Payment Integration**: Razorpay payment gateway integration
- **Email Service**: Automated email notifications
- **File Upload**: Product and user image handling
- **Cart Management**: Shopping cart functionality
- **Shipping Integration**: Shiprocket API integration

## 📦 Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT + bcrypt
- **Payment**: Razorpay
- **Email**: Nodemailer
- **File Upload**: Multer
- **Environment**: dotenv

## 🛠️ Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd vinculo/backend
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Environment Setup**

   ```bash
   cp config/config.env.example config/config.env
   ```

   Update the environment variables in `config/config.env`

4. **Database Setup**

   - Make sure MongoDB is running
   - Update `DB_LOCAL_URI` in config file

5. **Seed Sample Data** (Optional)
   ```bash
   npm run seeder
   ```

## 🔧 Scripts

```bash
# Start production server
npm start

# Start development server with nodemon
npm run dev

# Seed sample products
npm run seeder
```

## 🌐 API Endpoints

### Authentication

- `POST /api/v1/auth/register` - User registration
- `POST /api/v1/auth/login` - User login
- `GET /api/v1/auth/logout` - User logout

### Products

- `GET /api/v1/products` - Get all products
- `GET /api/v1/products/:id` - Get single product
- `POST /api/v1/products` - Create product (Admin)
- `PUT /api/v1/products/:id` - Update product (Admin)
- `DELETE /api/v1/products/:id` - Delete product (Admin)

### Orders

- `GET /api/v1/orders` - Get user orders
- `GET /api/v1/orders/:id` - Get single order
- `POST /api/v1/orders` - Create new order
- `PUT /api/v1/orders/:id` - Update order status (Admin)

### Cart

- `GET /api/v1/cart` - Get user cart
- `POST /api/v1/cart` - Add to cart
- `PUT /api/v1/cart/:id` - Update cart item
- `DELETE /api/v1/cart/:id` - Remove from cart

### Payment

- `POST /api/v1/payments/process` - Process payment

### Users

- `GET /api/v1/users/profile` - Get user profile
- `PUT /api/v1/users/profile` - Update user profile

## 🔒 Environment Variables

```env
PORT=8000
NODE_ENV=development
DB_LOCAL_URI=mongodb://localhost:27017/data
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_TIME=7d
COOKIE_EXPIRES_TIME=7
SMTP_HOST=your_smtp_host
SMTP_PORT=587
SMTP_USER=your_smtp_user
SMTP_PASS=your_smtp_password
SMTP_FROM_NAME=vinculoshop
SMTP_FROM_EMAIL=noreply@vinculoshop.com
BACKEND_URL=http://localhost:8000
FRONTEND_URL=http://localhost:3000
RAZORPAY_KEY_ID=your_razorpay_key
RAZORPAY_KEY_SECRET=your_razorpay_secret
```

## 🚀 Deployment

### Backend Deployment (Separate from Frontend)

1. **Build for Production**

   - No build step required for Node.js
   - Ensure all dependencies are installed

2. **Environment Configuration**

   - Copy `config/config.prod.env` to `config/config.env`
   - Update all URLs and secrets for production

3. **Database Setup**

   - Use MongoDB Atlas for cloud hosting
   - Update `DB_LOCAL_URI` with production connection string

4. **Deploy to Platform**

   ```bash
   # For platforms like Heroku, Railway, etc.
   # Make sure package.json has correct start script
   npm start
   ```

5. **Update CORS Origins**
   - Update allowed origins in `app.js`
   - Add your production frontend domain

## 📁 Project Structure

```
backend/
├── config/
│   ├── config.env          # Environment variables
│   ├── config.prod.env     # Production environment template
│   └── database.js         # Database connection
├── controllers/            # Route controllers
├── data/                   # Sample data files
├── middlewares/            # Custom middleware
├── models/                 # Mongoose models
├── routes/                 # API routes
├── services/              # External service integrations
├── uploads/               # File upload storage
├── utils/                 # Utility functions
├── app.js                 # Express app configuration
├── server.js              # Server entry point
└── seeder.js              # Database seeder
```

## 🔧 CORS Configuration

The backend is configured to accept requests from:

- `http://localhost:3000` (development frontend)
- `https://your-frontend-domain.com` (production frontend)

Update the `corsOptions` in `app.js` when deploying.

## 🐳 Docker Support (Optional)

Create a `Dockerfile`:

```dockerfile
FROM node:16-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install --only=production
COPY . .
EXPOSE 8000
CMD ["npm", "start"]
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📝 License

This project is licensed under the ISC License.

## 🆘 Support

For support, email support@vinculoshop.com or create an issue in the repository.
