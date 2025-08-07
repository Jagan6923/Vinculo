const products = require('./data/products.json');
const Product = require('./models/productModel');
const dotenv = require('dotenv');
const connectDatabase = require('./config/database');

// ✅ Load environment variables
dotenv.config({ path: './config/config.env' });

// ✅ Connect to DB using environment variable
connectDatabase();

const seedProducts = async () => {
    try {
        await Product.deleteMany();
        console.log('🗑️ All products deleted!');

        await Product.insertMany(products);
        console.log('✅ Products seeded successfully!');

        process.exit(0);
    } catch (error) {
        console.error('❌ Error seeding products:', error.message);
        process.exit(1);
    }
};

seedProducts();
