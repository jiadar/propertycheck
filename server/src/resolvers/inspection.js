import Rating from "../models/Rating";
import Inspection from "../models/Inspection";
import mongoose from 'mongoose';

export default {
  Inspection: {
    __resolveReference(object) {
      return Inspection.findOne({ _id: object.id });
    },
    ratings(inspection) {
      return Rating.find( { inspection: inspection._id.toString() });
    }
  },
  Query: {
    inspection(_, args) {
      return Inspection.findOne({_id: args.id});
    },
    inspections(_, args) {
      return Inspection.find({});
    }
  }
};
