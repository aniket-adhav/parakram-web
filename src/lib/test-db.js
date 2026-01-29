// test-db.js
import mongoose from "mongoose";

const uri = process.env.MONGODB_URI;

if (!uri) {
  console.error("❌ MONGODB_URI not found");
  process.exit(1);
}

try {
  await mongoose.connect(uri);
  console.log("✅ DB CONNECTED SUCCESSFULLY");
  process.exit(0);
} catch (err) {
  console.error("❌ DB CONNECTION FAILED", err);
  process.exit(1);
}