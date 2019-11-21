import {
  GraphQLObjectType,
  GraphQLList,
  GraphQLString,
  GraphQLBoolean,
  GraphQLInt,
} from 'graphql';

import Post from './Post';
import User from './User';

export default new GraphQLObjectType({
  description: 'Comments on posts',
  name: 'Comment',
  // another SQL table to map to
  sqlTable: '"ADMIN"."commentsTable"',
  uniqueKey: 'ID',
  fields: () => ({
    ID: {
      // assumed SQL column to be "id"
      type: GraphQLString,
    },
    commentMetadata: {
      description: 'The metadata of the comment',
      sqlColumn:'commentMetadata',
      // assumed to be "body"
      type: GraphQLString,
    },
    commentContent: {
      description: 'The Content of the comment',
      sqlColumn:'commentMetadata"."commentContent',
      // assumed to be "body"
      type: GraphQLString,
    },
    post: {
      description: 'The post that the comment belongs to',
      // a back reference to its Post
      type: Post,
      // how to join these tables
      sqlJoin: (commentTable, postTable) =>
        `${commentTable}."postID" = ${postTable}."ID"`,
    },
    author: {
      description: 'The user who wrote the comment',
      // and one to its User
      type: User,
      sqlJoin: (commentTable, userTable) =>
        `${commentTable}."authorID" = ${userTable}."ID"`,
    },
    authorID: {
      type: GraphQLInt,
      sqlcolumn: 'authorID',
    },
    postID: {
      type: GraphQLInt,
      sqlColumn: 'postID',
    },
    isDeleted: {
      type: GraphQLBoolean,
    },
    createdAt: {
      type: GraphQLString,
      sqlColumn: 'createdAt',
    },
    modifiedAt: {
      type: GraphQLString,
      sqlColumn: 'modifiedAt',
    },
    numComments: {
      description: 'Number of Comments the user has Written on Posts',
      type: GraphQLInt,
      sqlExpr: userTable =>
        `(SELECT COUNT(*) FROM "ADMIN"."commentsTable" WHERE "authorID" = ${userTable}."ID" AND "isDeleted" = 'N')`,
    },
  }),
});
