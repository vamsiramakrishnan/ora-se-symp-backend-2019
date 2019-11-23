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
  sqlTable: 'POSTTABLE',
  uniqueKey: 'ID',
  fields: () => ({
    ID: {
      // SQL column assumed to be "id"
      type: GraphQLInt,
    },
    postMetadata: {
      sqlColumn: 'POSTMETADATA',
      description: 'The Metadata of the post',
      // assumed to be "body"
      type: GraphQLString,
    },
    postContent: {
      sqlColumn: `'POSTMETADATA'.'POSTCONTENT'`,
      description: 'The content of the post',
      // assumed to be "body"
      type: GraphQLString,
    },
    postImages: {
      sqlColumn: `'POSTMETADATA'.'POSTIMAGES'`,
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
        `${postTable}.AUTHORID = ${userTable}.ID`,
    },
    authorID: {
      type: GraphQLInt,
      sqlColumn: 'AUTHORID',
    },
    comments: {
      description: 'The comments on this post',
      type: new GraphQLList(Comment),
      sqlBatch: {
        // which column to match up to the users
        thisKey: 'POSTID',
        // the other column to compare to
        parentKey: 'ID',
      },
      where: commentsTable => `${commentsTable}.ISDELETED = 'N'`,
    },
    numComments: {
      description: 'The number of comments on this post',
      type: GraphQLInt,
      // use a correlated subquery in a raw SQL expression to do things like aggregation
      sqlExpr: postTable =>
        `(SELECT COUNT(*) FROM COMMENTSTABLE WHERE POSTID = ${postTable}.ID AND ISDELETED = 'N')`,
    },
    isDeleted: {
      type: GraphQLBoolean,
      sqlColumn: 'ISDELETED'
    },
    createdAt: {
      type: GraphQLString,
      sqlColumn: 'CREATEDAT',
    },
    modifiedAt: {
      type: GraphQLString,
      sqlColumn: 'MODIFIEDAT',
    },
  }),
});
