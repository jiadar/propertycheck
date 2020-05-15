import mongoose from "mongoose";

const InspectionSchema = mongoose.Schema({
  _id: mongoose.Schema.ObjectId,
  dateAdded: String,
  dateCompleted: String,
  status: String,
  type: String,
  by: String,
});

export default mongoose.model('Inspection', InspectionSchema)

