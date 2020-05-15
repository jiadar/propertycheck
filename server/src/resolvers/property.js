import Property from "../models/Property";
import Inspection from "../models/Inspection";
import Room from "../models/Room";
import mongoose from 'mongoose';

export default {
  Property: {
    __resolveReference(object) {
      return Property.findOne({ _id: object.id });
    },
    inspections(property) {
      return Inspection.find({ property: property._id.toString() });
    },
    rooms(property) {
      return Room.find({ property: property._id })
    }
  },
  Query: {
    property(_, args) {
      return Property.findOne({_id: args.id});
    },
    properties(_, args) {
      return Property.find({});
    }
  },
};
