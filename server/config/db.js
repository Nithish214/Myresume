import mongoose from "mongoose";

/**
 * Connects to MongoDB using the connection string in MONGO_URI.
 *
 * Why this lives in its own file: server.js stays focused on wiring up
 * Express, and any future scripts (seeders, tests) can reuse this same
 * connection logic instead of duplicating it.
 */
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    // If the DB can't be reached there's no point continuing - fail loudly
    // and exit so process managers (pm2, Docker, etc.) know to restart/alert.
    console.error(`MongoDB connection error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
