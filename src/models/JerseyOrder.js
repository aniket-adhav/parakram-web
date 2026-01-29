import mongoose from "mongoose";

const JerseyOrderSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      lowercase: true,
      index: true,
    },

    name: { type: String, required: true },
    phone: { type: String, required: true },

    jerseyName: { type: String, required: true },
    jerseyNo: { type: Number, required: true, min: 0, max: 999 },

    size: { type: String, required: true },
    department: { type: String, required: true, index: true },

    collar: {
      type: String,
      enum: ["With Collar", "Without Collar"],
      required: true,
    },

    utrNo: {
      type: String,
      required: true,
      index: true, // ❌ NO UNIQUE
    },

    // ✅ Cloudinary fields
    screenshotUrl: {
      type: String,
      required: true,
    },

    screenshotPublicId: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
      index: true,
    },

    secretCode: {
      type: String,
      sparse: true, // ✅ THIS IS REQUIRED
      index: true,
    },

    verifiedBy: String,
    verifiedAt: Date,
  },
  { timestamps: true }
);

export default mongoose.models.JerseyOrder ||
  mongoose.model("JerseyOrder", JerseyOrderSchema);