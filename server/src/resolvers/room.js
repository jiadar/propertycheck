import Room from "../models/Room";

export default {
  Room: {
    __resolveReference(object) {
      return Room.findOne({ _id: object.id });
    },
  }
};

