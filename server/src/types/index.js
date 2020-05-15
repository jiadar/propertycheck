// types/index.js
//
// This file merges all the types in this directory, building up to schema creation. If you add a new type
// you will have to import it here and append it to typeDefs. 
//

import { mergeTypes } from "merge-graphql-schemas";
import { gql } from "apollo-server";

import Inspection from "./inspection";
import Property from "./property";
import Response from "./response";
import Room from "./room";
import Rating from "./rating";

const typeDefs = gql`
  ${Inspection}
  ${Property}
  ${Response}
  ${Room}
  ${Rating}
`;

export default typeDefs;

