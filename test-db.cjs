// test-db.cjs
require("dotenv").config({ path: ".env.local" });
const mongoose = require("mongoose");

const uri = process.env.MONGODB_URI;

if (!uri) {
  console.error("❌ MONGODB_URI not found");
  process.exit(1);
}

(async () => {
  try {
    await mongoose.connect(uri);
    console.log("✅ DB CONNECTED SUCCESSFULLY");
    process.exit(0);
  } catch (err) {
    console.error("❌ DB CONNECTION FAILED");
    console.error(err);
    process.exit(1);
  }
})();