require('dotenv').config();

const connectDB = require('../config/db');
const User = require('../models/User');

const seedAdmin = async () => {
  try {
    await connectDB();

    const email = process.env.ADMIN_EMAIL || 'admin@foundlink.org';
    const password = process.env.ADMIN_PASSWORD || 'Admin@123456';
    const name = process.env.ADMIN_NAME || 'System Admin';

    const existing = await User.findOne({ email });

    if (existing) {
      if (existing.role !== 'admin') {
        existing.role = 'admin';
        existing.isVerified = true;
        await existing.save();
        console.log(`Updated existing user to admin: ${email}`);
      } else {
        console.log(`Admin already exists: ${email}`);
      }
      process.exit(0);
    }

    await User.create({
      name,
      email,
      password,
      role: 'admin',
      isVerified: true,
    });

    console.log('Admin user created successfully:');
    console.log(`  Email: ${email}`);
    console.log(`  Password: ${password}`);
    console.log('Change the password after first login in production.');

    process.exit(0);
  } catch (err) {
    console.error('Seed failed:', err.message);
    process.exit(1);
  }
};

seedAdmin();
