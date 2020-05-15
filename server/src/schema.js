// schema.js 
//
// This file combines the types and resolvers to form a federated graphql schema
// Ultimately the schema object is passed into apollo server 
//

import { buildFederatedSchema } from "@apollo/federation";

import typeDefs from "./types/";
import resolvers from "./resolvers/";

const schema = buildFederatedSchema([{
  typeDefs,
  resolvers
}]);

export default schema;
