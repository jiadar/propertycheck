const { ApolloServer } = require('apollo-server');
const { ApolloError } = require('apollo-server');
const { ValidationError } = require('apollo-server');
const { gql } = require('apollo-server');
import mongoose from "mongoose";
import Property from "./models/Property";
import Inspection from "./models/Inspection";
import Room from "./models/Room";
import Rating from "./models/Rating";
import Response from "./models/Response";
import schema from "./schema";

const db = "mongodb://localhost:27017/---replace me with mongo string----";

const opts = {
  useCreateIndex: true,
  useNewUrlParser: true
};

// Use the Mongoose ORM to connect to the underlying local mongo database.
// No security was set up for the demo

mongoose
  .connect(db, opts)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

// Pass along the mongoose ORM models in the context

const context = {
  Property,
  Inspection,
  Room,
  Rating,
  Response
};

// Start a new apollo server which executes the graphql queries. Connect to the engine to monitor
// performance and publish schemas. Allow introspection so the engine and playground can obtain the
// API specification

const server = new ApolloServer({
  schema,
  engine: {
    apiKey: "service:jiadar:SK9f2BCSAz4SMcD1PcXMUQ"
  },
  introspection: true,
  context,
  formatError: error => {
    console.log(error);
    return error;
  },
  formatResponse: response => {
    console.log(response);
    return response;
  },
});

// Run the apollo server using express under the hood

server.listen({ port: process.env.PORT || 4000 }).then(({ url }) => {
  console.log(`Server ready at ${url}`);
});

