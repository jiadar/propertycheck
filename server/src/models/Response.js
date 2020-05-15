import mongoose from "mongoose";

const ResponseSchema = mongoose.Schema({
  _id: mongoose.Schema.ObjectId,
  response: String,
  question: String
});

export default mongoose.model('Response', ResponseSchema)

