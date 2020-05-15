export default `
  type Property @key(fields: "_id") {
    _id: ID!
    address: String
    city: String
    state: String
    zip: String
    dateAdded: String
    inspections: [Inspection]
    rooms: [Room]
  }

  extend type Query {
    property(id: String): Property
    properties: [Property] 
  }
`;
