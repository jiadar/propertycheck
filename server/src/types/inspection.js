export default `
  type Inspection @key(fields: "_id") {
    _id: ID!
    dateAdded: String
    dateCompleted: String
    type: String
    by: String
    status: String
    property: Property
    ratings: [Rating]
  }

  extend type Query {
    inspection(id: String): Inspection
    inspections: [Inspection] 
  }
`;
