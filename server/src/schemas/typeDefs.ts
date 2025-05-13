const typeDefs = `
type User {
  _id: ID!
  username: String!
  email: String!
  savedBooks: [Book]
}

type Book {
  bookId: ID!
  title: String!
  authors: [String]
  description: String
  image: String
  link: String
}

type Auth {
  token: String!
  user: User!
}

type Query {
  getSingleUser(id: ID, username: String): User
}

type Mutation {
  createUser(username: String!, email: String!, password: String!): Auth
  saveBook(book: BookInput!): User
  deleteBook(bookId: ID!): User
}

input BookInput {
  bookId: ID!
  title: String!
  authors: [String]
  description: String
  image: String
  link: String
}
`;

export default typeDefs;

