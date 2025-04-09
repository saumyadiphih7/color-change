import mongoose from "mongoose";

const panelSchema = mongoose.Schema({
  panelName: {
    type: String,
    enum: ["AdminPanel", "CustomerPanel"],
  },
  username: {
    type: String,
    required: true,
  },
  backgroundColor: {
    type: String,
    required: true,
    default: "#ffffff",
  },
  textColor: {
    type: String,
    required: true,
    default: "#000000",
  },
});

const Panel = mongoose.model("Panel", panelSchema);
export default Panel
  