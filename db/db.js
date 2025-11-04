const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const url = process.env.MONGODB_URI; // use environment variable
    if (!url) throw new Error("MongoDB URI is not defined");

    await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    console.log("✅ Connected to MongoDB Atlas");
  } catch (err) {
    console.error("❌ MongoDB connection error:", err);
  }
};

module.exports = connectDB;