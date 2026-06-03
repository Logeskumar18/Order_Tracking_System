require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Admin = require('./models/Admin');

const seedAdmin = async () => {
  try {
    // 1. Connect to the database
    await mongoose.connect(process.env.MONGODB_URL);
    console.log('Connected to MongoDB...');

    const email = 'admin@example.com';
    const password = 'admin123';

    // 2. Check if the admin already exists to prevent duplicates
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      console.log('Admin user already exists in the database.');
      process.exit(0);
    }

    // 3. Hash the password and create the admin
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    await Admin.create({
      name: 'System Admin',
      email: email,
      password: hashedPassword,
    });

    console.log(`✅ Admin created successfully!\n📧 Email: ${email}\n🔑 Password: ${password}`);
    process.exit(0);
  } catch (error) {
    console.error('❌ Failed to seed admin:', error);
    process.exit(1);
  }
};

seedAdmin();