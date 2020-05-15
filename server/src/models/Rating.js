import mongoose from "mongoose";

const RatingSchema = mongoose.Schema({
  _id: mongoose.Schema.ObjectId,
  cond: String,
  images: Array,
  room: String
});

export default mongoose.model('Rating', RatingSchema)

