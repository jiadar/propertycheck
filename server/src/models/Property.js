import mongoose from "mongoose";

const PropertySchema = mongoose.Schema({
  _id: mongoose.Schema.ObjectId,
  address: String,
  city: String,
  state: String,
  zip: String,
  dateAdded: String
});

export default mongoose.model('Property', PropertySchema)

