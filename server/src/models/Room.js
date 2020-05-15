import mongoose from "mongoose";

const RoomSchema = mongoose.Schema({
  _id: mongoose.Schema.ObjectId,
  desc: String,
  images: Array
});

export default mongoose.model('Room', RoomSchema)

