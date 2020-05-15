export default `
  type Room @key(fields: "_id") {
    _id: ID!
    desc: String
    images: [String]
    property: Property
  }

  extend type Query {
    room(id: String): Room
    rooms: [Room] 
  }
`;
