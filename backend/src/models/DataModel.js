import mongoose from "mongoose";

const dataSchema = new mongoose.Schema({
  text: { type: String, required: true },
});

const Data = mongoose.model("Data", dataSchema);

export { Data };
