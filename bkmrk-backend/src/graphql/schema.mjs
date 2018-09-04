import graphqlTools from 'graphql-tools';

import resolvers from './resolvers';

const { makeExecutableSchema } = graphqlTools;

const schema = `
type User {
  uuid: String
  firstName: String
  lastName: String
  email: String
  emailVerified: Boolean
  links(
    order: String
    limit: Int
    offset: Int
  ): [Link]
}
type Meta {
  count: Int
}
type Tag {
  id: Int
  slug: String
  title: String
  meta: Meta
  links(
    order: String
    limit: Int
    offset: Int
  ): [Link]
}
input InputTag {
  id: Int
  title: String
}
type Link {
  uuid: String
  title: String
  url: String
  crawl: Boolean
  image: String
  leadimage: String
  author: String
  excerpt: String
  content: String
  public: Boolean
  tags(
    order: String
    limit: Int
    offset: Int
  ): [Tag]
}
type Token {
  token: String!
}
type Success {
  success: Boolean!
}
# the schema allows the following query:
type Query {
  user(uuid: String): User
  tag(id: Int!): Tag
  tags(limit: Int, order: String): [Tag]
  link(url: String, uuid: String): Link
  links(userUuid: String, limit: Int, offset: Int): [Link]
}
# this schema allows the following mutation:
type Mutation {
  login (
    username: String!
    password: String!
  ): Token
  registerUser (
    firstName: String!
    lastName: String!
    email: String!
    password: String!
  ): Token
  editUser (
    firstName: String
    lastName: String
    password: String
    newPassword: String
  ): User
  validateUserEmail(
    token: String!
  ): Success
  requestUserResetPassword(
    email: String!
  ): Success
  resetUserPassword(
    token: String!
    email: String!
    password: String!
  ): Success
  addLink (
    url: String!
    tags: [InputTag]
  ) : Link
  editLink (
    uuid: String!
    title: String
    author: String
    excerpt: String
    tags: [InputTag]
  ) : Link
  deleteLink (
    uuid: String!
  ) : Success
}
`;

export default makeExecutableSchema({
  typeDefs: schema,
  resolvers,
});
