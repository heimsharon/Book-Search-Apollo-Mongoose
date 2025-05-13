const typeDefs = `
type User {
  _id: ID!
  username: String!
  email: String!
  bookCount: Int
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
  me: User
}

type Mutation {
  login(email: String!, password: String!): Auth
  addUser(input: AddUserInput!): Auth
  saveBook(input: BookInput!): User
  removeBook(bookId: ID!): User
}

input BookInput {
  bookId: ID!
  title: String!
  authors: [String]!
  description: String
  image: String
  link: String
}

input AddUserInput {
  username: String!
  email: String!
  password: String!
}
`;

export default typeDefs;
