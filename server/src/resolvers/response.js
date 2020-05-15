import Response from "../models/Response";
import mongoose from 'mongoose';

export default {
  Response: {
    __resolveReference(object) {
      return Response.findOne({ _id: object.id });
    },
  },
};

