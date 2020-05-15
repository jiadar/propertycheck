export default `
  type Rating @key(fields: "_id") {
    _id: ID!
    cond: String
    images: [String]
    responses: [Response]
    room: Room
  }

  extend type Query {
    rating(id: String): Rating
    ratings: [Rating] 
  }
`;
