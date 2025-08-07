# Razorpay Setup Guide

## 🔧 Getting Razorpay Test Keys

1. **Login to Razorpay Dashboard**

   - Go to https://dashboard.razorpay.com/
   - Login with your account

2. **Switch to Test Mode**

   - In the dashboard, make sure you're in **Test Mode** (not Live Mode)
   - Look for a toggle switch in the top navigation

3. **Get API Keys**

   - Navigate to **Settings** → **API Keys**
   - Click **Generate Test Key**
   - You'll get:
     - `Key ID` (starts with `rzp_test_`)
     - `Key Secret` (long string)

4. **Update Environment Variables**
   ```env
   # Replace with your actual test keys
   RAZORPAY_KEY_ID=rzp_test_your_key_here
   RAZORPAY_KEY_SECRET=your_secret_here
   ```

## 🧪 Testing Payments

### Test Card Details

Use these test card details in development:

**Success Cards:**

- **Card Number:** 4111 1111 1111 1111
- **Expiry:** Any future date (e.g., 12/25)
- **CVV:** Any 3 digits (e.g., 123)
- **Name:** Any name

**Other Test Cards:**

- **Visa:** 4012 0000 3333 0026
- **Mastercard:** 5555 5555 5555 4444
- **Rupay:** 6074 5678 9012 3456

### Test UPI ID

- **UPI ID:** success@razorpay

## 🚀 Production Setup

### When moving to production:

1. **Switch to Live Mode** in Razorpay Dashboard
2. **Generate Live Keys**
3. **Update config.prod.env:**
   ```env
   RAZORPAY_KEY_ID=rzp_live_your_live_key
   RAZORPAY_KEY_SECRET=your_live_secret
   ```
4. **Complete KYC verification**
5. **Add webhook endpoints**

## 🛠️ Troubleshooting

### Common Issues:

1. **"Payment failed" error:**

   - Check if you're using test keys in development
   - Verify keys are correct and not expired
   - Check network connectivity

2. **"Invalid API Key" error:**

   - Double-check the key format
   - Ensure no extra spaces in environment variables
   - Restart server after changing keys

3. **"Insufficient permissions" error:**
   - Check if your Razorpay account has necessary permissions
   - Complete account verification if required

### Debug Steps:

1. **Test Razorpay connection:**

   ```bash
   curl http://localhost:8000/api/v1/payments/payment/test
   ```

2. **Check API key endpoint:**

   ```bash
   curl http://localhost:8000/api/v1/payments/razorpayapikey
   ```

3. **Check server logs** for detailed error messages

## 📝 Environment Variables Template

### Development (.env)

```env
NODE_ENV=development
RAZORPAY_KEY_ID=rzp_test_your_test_key
RAZORPAY_KEY_SECRET=your_test_secret
```

### Production (.env.production)

```env
NODE_ENV=production
RAZORPAY_KEY_ID=rzp_live_your_live_key
RAZORPAY_KEY_SECRET=your_live_secret
```

## 🔐 Security Notes

- **Never commit API keys to version control**
- **Use different keys for development and production**
- **Rotate keys periodically**
- **Implement proper webhook signature verification**

## 📞 Support

- **Razorpay Docs:** https://razorpay.com/docs/
- **Support:** https://razorpay.com/support/
- **Test Cards:** https://razorpay.com/docs/payments/payments/test-card-details/
