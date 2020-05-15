import Rating from "../models/Rating";
import Response from "../models/Response";
import Room from "../models/Room";
import mongoose from 'mongoose';
import assert from "assert"

export default { 
  Rating: {
    __resolveReference(object) {
      return Rating.findOne({ _id: object.id });
    },
    responses(rating) {
      return Response.find({ rating: rating._id.toString() });
    },
    room(rating) {
      // Note: This didn't work at first as the _id in Mongoose RoomSchema (Model) was String
      // Therefore the string would not be converted to an ObjectId. Changing the _id in the model
      // to mongoose.Schema.ObjectId solves the issue. Also, room needs to be present in the mongoose
      // schema for Rating. It's Ok if it is a string in that schema, as it will be converted to an
      // ObjectId when the below runs. 
      return Room.findById(rating.room);
    },
  }
};
