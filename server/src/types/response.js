export default `
  type Response @key(fields: "_id") {
    _id: ID!,
    question: String,
    response: String
  }

  extend type Query {
    response(id: String): Response
    responses: [Response]
}
`;
