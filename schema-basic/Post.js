import {
  GraphQLObjectType,
  GraphQLList,
  GraphQLString,
  GraphQLInt,
  GraphQLBoolean,
} from 'graphql';

import User from './User';
import Comment from './Comment';

export default new GraphQLObjectType({
  description: 'A post from a user',
  name: 'Post',
  // another table in SQL to map to
  sqlTable: '"ADMIN"."postTable"',
  uniqueKey: 'ID',
  fields: () => ({
    ID: {
      // SQL column assumed to be "id"
      type: GraphQLInt,
    },
    postContent: {
      sqlColumn: 'postMetadata"."postContent',
      description: 'The content of the post',
      // assumed to be "body"
      type: GraphQLString,
    },
    postVersion: {
      sqlColumn: 'postMetadata"."postVersion',
      description: 'The current version of the Post',
      // assumed to be "body"
      type: GraphQLString,
    },
    postHashtags: {
      sqlColumn: 'postMetadata"."postHashtags',
      description: 'Hashtags in the Post',
      // assumed to be "body"
      type: GraphQLString,
    },
    postImages: {
      sqlColumn: 'postMetadata"."postImages',
      description: 'Images in the Post',
      // assumed to be "body"
      type: GraphQLString,
    },
    author: {
      description: 'The user that created the post',
      // a back reference to its User
      type: User,
      // this is a one-to-one
      sqlJoin: (postTable, userTable) =>
        `${postTable}."authorID" = ${userTable}."ID"`,
    },
    authorId: {
      type: GraphQLInt,
      sqlColumn: 'authorID',
    },
    comments: {
      description: 'The comments on this post',
      type: new GraphQLList(Comment),
      sqlBatch: {
        // which column to match up to the users
        thisKey: 'postID',
        // the other column to compare to
        parentKey: 'ID',
      },
      where: commentsTable => `${commentsTable}."isDeleted" = 'N'`,
    },
    numComments: {
      description: 'The number of comments on this post',
      type: GraphQLInt,
      // use a correlated subquery in a raw SQL expression to do things like aggregation
      sqlExpr: postTable =>
        `(SELECT COUNT(*) FROM "ADMIN"."commentsTable" WHERE "postID" = ${postTable}."ID" AND "isDeleted" = 'N')`,
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
  }),
});
