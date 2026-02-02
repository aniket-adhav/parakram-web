import mongoose from "mongoose";

const PlayerSchema = new mongoose.Schema(
  {
    firstName: String,
    lastName: String,
    email: { type: String, lowercase: true },
    year: String,
    mobile: String,
    secretCode: { type: String, index: true },
  },
  { _id: false }
);

const TeamRegistrationSchema = new mongoose.Schema(
  {
    sport: { type: String, required: true, index: true },
    department: { type: String, required: true, index: true },
    category: { type: String, required: true }, // Boys/Girls

    coordinatorCode: { type: String, required: true },

    captain: {
      name: String,
      email: String,
      mobile: String,
    },

    players: {
      type: [PlayerSchema],
      validate: [(v) => v.length > 0, "Players required"],
    },

    pdfUrl: String, // generated PDF link

  },
  { timestamps: true }
);

export default mongoose.models.TeamRegistration ||
  mongoose.model("TeamRegistration", TeamRegistrationSchema);
