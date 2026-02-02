import mongoose from "mongoose";

const CoordinatorSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
    unique: true,
    uppercase: true,
  },
  department: {
    type: String,
    required: true,
  },
  maxTeamsPerSport: {
    type: Map,
    of: Number, // { Cricket: 3, Football: 2 }
    default: {},
  },
});

export default mongoose.models.Coordinator ||
  mongoose.model("Coordinator", CoordinatorSchema);
