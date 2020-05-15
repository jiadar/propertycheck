// resolvers/index.js
//
// This file merges all the resolver in this directory, building up to schema creation. If you add a new resolver
// you will have to import it here and append it to resolvers. 
//

import lodash from "lodash";
import Inspection from "./inspection";
import Property from "./property";
import Response from "./response";
import Room from "./room";
import Rating from "./rating";

const resolvers = lodash.merge(
  Inspection,
  Property,
  Response,
  Room,
  Rating
);

export default resolvers;
