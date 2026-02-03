import mongoose from "mongoose";

const JerseyOrderSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      lowercase: true,
      index: true,
    },
    name: String,
    phone: String,

    jerseyName: String,

    jerseyNo: {
      type: String,
      required: true,
      trim: false,
      maxlength: 3,
    },
    secretCode: {
  type: String,
  unique: true,
  sparse: true,
},


    size: String,
    department: String,
    collar: String,
    utrNo: String,

    screenshotUrl: String,
    screenshotPublicId: String,

    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
  },
  { timestamps: true }
);

// 🔥 FORCE MODEL RESET (VERY IMPORTANT)
if (mongoose.models.JerseyOrder) {
  delete mongoose.models.JerseyOrder;
}

export default mongoose.model("JerseyOrder", JerseyOrderSchema);
