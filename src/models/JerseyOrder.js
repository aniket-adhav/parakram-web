import mongoose from "mongoose";

const JerseyOrderSchema = new mongoose.Schema({
  name: { type: String, required: true },

  email: { type: String, required: true,unique: true },

  phone: {
    type: String,
    required: true,
  },

  department: String,
  jerseyName: String,
  jerseyNo: String,
  size: String,

  amount: Number,

  paymentId: String,
  orderId: String,
  signature: String,

  secretCode: {
    type: String,
    unique: true,
    index: true,
  },

  paymentStatus: {
    type: String,
    default: "SUCCESS",
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// 🔒 One jersey per email
// JerseyOrderSchema.index({ email: 1 }, { unique: true });

export default mongoose.models.JerseyOrder ||
  mongoose.model("JerseyOrder", JerseyOrderSchema);