import mongoose from "mongoose";

/* ================= PLAYER ================= */
const PlayerSchema = new mongoose.Schema(
  {
    firstName: String,
    lastName: String,
    year: String,
    mobile: String,
    email: String,       // only captain will have email
    secretCode: String,
  },
  { _id: false }
);

/* ================= TEAM ================= */
const TeamSchema = new mongoose.Schema(
  {
    formCode: {
      type: String,
      required: true,
      unique: true,
    },

    players: {
      type: [PlayerSchema],
      required: true,
    },

    pdfGenerated: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

/* ================= SPORT ROOT ================= */
const TeamRegistrationSchema = new mongoose.Schema(
  {
    sport: {
      type: String,
      required: true,
      index: true,
    },

    teams: {
      type: [TeamSchema],
      default: [],
    },
  },
  { timestamps: true }
);

/* 🔥 HOT RELOAD SAFE */
if (mongoose.models.TeamRegistration) {
  delete mongoose.models.TeamRegistration;
}

export default mongoose.model(
  "TeamRegistration",
  TeamRegistrationSchema
);
