# Vinculo E-commerce API Documentation

## Base URL

- **Development**: `http://localhost:8000`
- **Production**: Your deployed backend URL

## Authentication

Most endpoints require authentication using JWT tokens. The token should be sent in the request cookies or as a Bearer token in the Authorization header.

## Response Format

All API responses follow this general structure:

```json
{
  "success": true/false,
  "message": "Description of the response",
  "data": {...} // Response data (if applicable)
}
```

---

## Health Check Endpoints

### Get API Health

**GET** `/`

- **Description**: Check if the API is running
- **Auth Required**: No
- **Response**:

```json
{
  "message": "Vinculo API is running",
  "status": "healthy",
  "timestamp": "2025-01-01T00:00:00.000Z"
}
```

### Get API Health Status

**GET** `/api/health`

- **Description**: Detailed health check
- **Auth Required**: No

---

## Authentication Endpoints

### Register User

**POST** `/api/v1/register`

- **Description**: Register a new user
- **Auth Required**: No
- **Content-Type**: `multipart/form-data`
- **Body Parameters**:
  - `name` (string, required): User's full name
  - `email` (string, required): User's email address
  - `password` (string, required): User's password
  - `avatar` (file, optional): Profile picture
- **Response**: User data with JWT token

### Login User

**POST** `/api/v1/login`

- **Description**: Login user
- **Auth Required**: No
- **Body Parameters**:

```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

- **Response**: User data with JWT token

### Logout User

**GET** `/api/v1/logout`

- **Description**: Logout current user
- **Auth Required**: Yes
- **Response**: Success message

### Forgot Password

**POST** `/api/v1/password/forgot`

- **Description**: Send password reset email
- **Auth Required**: No
- **Body Parameters**:

```json
{
  "email": "user@example.com"
}
```

### Reset Password

**POST** `/api/v1/password/reset/:token`

- **Description**: Reset password using token from email
- **Auth Required**: No
- **URL Parameters**:
  - `token` (string): Reset token from email
- **Body Parameters**:

```json
{
  "password": "newpassword123",
  "confirmPassword": "newpassword123"
}
```

### Change Password

**PUT** `/api/v1/password/change`

- **Description**: Change current user's password
- **Auth Required**: Yes
- **Body Parameters**:

```json
{
  "oldPassword": "currentpassword",
  "password": "newpassword123"
}
```

### Get User Profile

**GET** `/api/v1/myprofile`

- **Description**: Get current user's profile
- **Auth Required**: Yes
- **Response**: User profile data

### Update Profile

**PUT** `/api/v1/update`

- **Description**: Update user profile
- **Auth Required**: Yes
- **Content-Type**: `multipart/form-data`
- **Body Parameters**:
  - `name` (string): Updated name
  - `email` (string): Updated email
  - `avatar` (file): Updated profile picture

### Save Shipping Info

**POST** `/api/v1/shipping/save`

- **Description**: Save user's shipping information
- **Auth Required**: Yes
- **Body Parameters**:

```json
{
  "address": "123 Main St",
  "city": "New York",
  "state": "NY",
  "country": "USA",
  "postalCode": "10001",
  "phoneNo": "1234567890"
}
```

---

## Admin User Management Endpoints

### Get All Users (Admin)

**GET** `/api/v1/admin/users`

- **Description**: Get all users (Admin only)
- **Auth Required**: Yes (Admin)
- **Response**: Array of all users

### Get User by ID (Admin)

**GET** `/api/v1/admin/user/:id`

- **Description**: Get specific user details (Admin only)
- **Auth Required**: Yes (Admin)
- **URL Parameters**:
  - `id` (string): User ID

### Update User (Admin)

**PUT** `/api/v1/admin/user/:id`

- **Description**: Update user details (Admin only)
- **Auth Required**: Yes (Admin)
- **URL Parameters**:
  - `id` (string): User ID
- **Body Parameters**: User data to update

### Delete User (Admin)

**DELETE** `/api/v1/admin/user/:id`

- **Description**: Delete user (Admin only)
- **Auth Required**: Yes (Admin)
- **URL Parameters**:
  - `id` (string): User ID

---

## Product Endpoints

### Get All Products

**GET** `/api/v1/products`

- **Description**: Get all products with filtering and pagination
- **Auth Required**: No
- **Query Parameters**:
  - `keyword` (string): Search keyword
  - `category` (string): Product category
  - `price[gte]` (number): Minimum price
  - `price[lte]` (number): Maximum price
  - `ratings[gte]` (number): Minimum rating
  - `page` (number): Page number (default: 1)
  - `limit` (number): Results per page (default: 4)

### Get Single Product

**GET** `/api/v1/products/product/:id`

- **Description**: Get detailed information about a specific product
- **Auth Required**: No
- **URL Parameters**:
  - `id` (string): Product ID

### Create Product Review

**PUT** `/api/v1/products/review`

- **Description**: Add a review for a product
- **Auth Required**: Yes
- **Body Parameters**:

```json
{
  "productId": "product_id",
  "rating": 5,
  "comment": "Great product!"
}
```

---

## Admin Product Management Endpoints

### Create New Product (Admin)

**POST** `/api/v1/products/admin/product/new`

- **Description**: Create a new product (Admin only)
- **Auth Required**: Yes (Admin)
- **Content-Type**: `multipart/form-data`
- **Body Parameters**:
  - `name` (string, required): Product name
  - `price` (number, required): Product price
  - `description` (string, required): Product description
  - `category` (string, required): Product category
  - `stock` (number, required): Available stock
  - `seller` (string, required): Seller name
  - `images` (files): Product images

### Get Admin Products (Admin)

**GET** `/api/v1/products/admin/products`

- **Description**: Get all products for admin dashboard
- **Auth Required**: Yes (Admin)

### Update Product (Admin)

**PUT** `/api/v1/products/admin/product/:id`

- **Description**: Update product details (Admin only)
- **Auth Required**: Yes (Admin)
- **Content-Type**: `multipart/form-data`
- **URL Parameters**:
  - `id` (string): Product ID
- **Body Parameters**: Product data to update

### Delete Product (Admin)

**DELETE** `/api/v1/products/admin/product/:id`

- **Description**: Delete a product (Admin only)
- **Auth Required**: Yes (Admin)
- **URL Parameters**:
  - `id` (string): Product ID

### Get Product Reviews (Admin)

**GET** `/api/v1/products/admin/reviews`

- **Description**: Get all reviews for a product (Admin only)
- **Auth Required**: Yes (Admin)
- **Query Parameters**:
  - `id` (string): Product ID

### Delete Product Review (Admin)

**DELETE** `/api/v1/products/admin/review`

- **Description**: Delete a product review (Admin only)
- **Auth Required**: Yes (Admin)
- **Query Parameters**:
  - `id` (string): Product ID
  - `reviewId` (string): Review ID

---

## Cart Endpoints

### Add to Cart

**POST** `/api/v1/cart`

- **Description**: Add item to user's cart
- **Auth Required**: Yes
- **Body Parameters**:

```json
{
  "productId": "product_id",
  "quantity": 2
}
```

### Get Cart

**GET** `/api/v1/cart`

- **Description**: Get current user's cart
- **Auth Required**: Yes
- **Response**: Cart with all items

### Update Cart Item

**PUT** `/api/v1/cart/:itemId`

- **Description**: Update quantity of cart item
- **Auth Required**: Yes
- **URL Parameters**:
  - `itemId` (string): Cart item ID
- **Body Parameters**:

```json
{
  "quantity": 3
}
```

### Remove Cart Item

**DELETE** `/api/v1/cart/:itemId`

- **Description**: Remove item from cart
- **Auth Required**: Yes
- **URL Parameters**:
  - `itemId` (string): Cart item ID

### Clear Cart

**DELETE** `/api/v1/cart`

- **Description**: Remove all items from cart
- **Auth Required**: Yes

---

## Order Endpoints

### Create New Order

**POST** `/api/v1/orders/order/new`

- **Description**: Create a new order
- **Auth Required**: Yes
- **Body Parameters**:

```json
{
  "shippingInfo": {
    "address": "123 Main St",
    "city": "New York",
    "state": "NY",
    "country": "USA",
    "postalCode": "10001",
    "phoneNo": "1234567890"
  },
  "orderItems": [
    {
      "name": "Product Name",
      "price": 99.99,
      "quantity": 2,
      "image": "image_url",
      "product": "product_id"
    }
  ],
  "paymentInfo": {
    "id": "payment_id",
    "status": "succeeded"
  },
  "totalPrice": 199.98
}
```

### Get Single Order

**GET** `/api/v1/orders/order/:id`

- **Description**: Get specific order details
- **Auth Required**: Yes
- **URL Parameters**:
  - `id` (string): Order ID

### Get My Orders

**GET** `/api/v1/orders/myorders`

- **Description**: Get all orders for current user
- **Auth Required**: Yes

---

## Admin Order Management Endpoints

### Get All Orders (Admin)

**GET** `/api/v1/orders/admin/orders`

- **Description**: Get all orders (Admin only)
- **Auth Required**: Yes (Admin)

### Update Order (Admin)

**PUT** `/api/v1/orders/admin/order/:id`

- **Description**: Update order status (Admin only)
- **Auth Required**: Yes (Admin)
- **URL Parameters**:
  - `id` (string): Order ID
- **Body Parameters**:

```json
{
  "orderStatus": "Shipped"
}
```

### Delete Order (Admin)

**DELETE** `/api/v1/orders/admin/order/:id`

- **Description**: Delete an order (Admin only)
- **Auth Required**: Yes (Admin)
- **URL Parameters**:
  - `id` (string): Order ID

---

## Payment Endpoints

### Get Razorpay API Key

**GET** `/api/v1/payments/razorpayapikey`

- **Description**: Get Razorpay API key for frontend
- **Auth Required**: No
- **Response**:

```json
{
  "razorpayApiKey": "rzp_test_xxxxxxxxx"
}
```

### Process Payment

**POST** `/api/v1/payments/payment/process`

- **Description**: Process payment with Razorpay
- **Auth Required**: Yes
- **Body Parameters**:

```json
{
  "amount": 19998,
  "currency": "INR"
}
```

### Verify Payment

**POST** `/api/v1/payments/payment/verify`

- **Description**: Verify Razorpay payment signature
- **Auth Required**: Yes
- **Body Parameters**:

```json
{
  "razorpay_payment_id": "pay_xxxxxxxxx",
  "razorpay_order_id": "order_xxxxxxxxx",
  "razorpay_signature": "signature_hash"
}
```

### Test Razorpay Connection

**GET** `/api/v1/payments/payment/test`

- **Description**: Test Razorpay API connection
- **Auth Required**: No

---

## User Address Management

### Get User Addresses

**GET** `/api/v1/users/user/:email/address`

- **Description**: Get all saved addresses for a user
- **Auth Required**: No
- **URL Parameters**:
  - `email` (string): User email
- **Response**: Array of saved addresses

### Delete User Address

**DELETE** `/api/v1/users/user/:email/address/:addressId`

- **Description**: Delete a specific address
- **Auth Required**: No
- **URL Parameters**:
  - `email` (string): User email
  - `addressId` (string): Address ID

---

## Shipping & Delivery Endpoints

### Shiprocket Authentication

**POST** `/api/v1/shiprocket/authenticate`

- **Description**: Authenticate with Shiprocket service
- **Auth Required**: No
- **Response**: Authentication token

### Estimate Delivery Date

**POST** `/api/v1/shiprocket/estimate-delivery`

- **Description**: Get estimated delivery date
- **Auth Required**: No
- **Body Parameters**:

```json
{
  "pickup_postcode": "400001",
  "delivery_postcode": "110001"
}
```

### Get Delivery Date

**POST** `/api/v1/delivery/delivery-date`

- **Description**: Alternative endpoint for delivery date estimation
- **Auth Required**: No
- **Body Parameters**:

```json
{
  "pickup_postcode": "400001",
  "delivery_postcode": "110001"
}
```

---

## File Upload

### Static Files Access

**GET** `/uploads/product/:filename`

- **Description**: Access uploaded product images
- **Auth Required**: No

**GET** `/uploads/user/:filename`

- **Description**: Access uploaded user avatars
- **Auth Required**: No

---

## Error Responses

### Common Error Codes:

- **400**: Bad Request - Invalid request data
- **401**: Unauthorized - Authentication required
- **403**: Forbidden - Insufficient permissions
- **404**: Not Found - Resource not found
- **422**: Unprocessable Entity - Validation errors
- **500**: Internal Server Error - Server error

### Error Response Format:

```json
{
  "success": false,
  "message": "Error description",
  "error": "Detailed error information"
}
```

---

## Rate Limiting and CORS

### CORS Configuration:

- Allowed origins: `localhost:3000`, production frontend URL
- Credentials: Supported
- Methods: GET, POST, PUT, DELETE, PATCH, OPTIONS, HEAD

### File Upload Limits:

- Product images: Multiple files supported
- User avatars: Single file
- Supported formats: Common image formats (JPG, PNG, GIF, etc.)

---

## Development Notes

### Environment Variables:

- `NODE_ENV`: production/development
- `FRONTEND_URL`: Frontend application URL
- `RAZORPAY_API_KEY`: Razorpay API key
- `RAZORPAY_SECRET_KEY`: Razorpay secret key
- Database connection strings and other secrets

### Database:

- MongoDB with Mongoose ODM
- Collections: Users, Products, Orders, Carts

### Authentication:

- JWT-based authentication
- Cookie-based session management
- Role-based access control (Admin/User)
