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
  sqlTable: 'COMMENTSTABLE',
  uniqueKey: 'ID',
  fields: () => ({
    ID: {
      // assumed SQL column to be "id"
      type: GraphQLString,
    },
    commentMetadata: {
      description: 'The metadata of the comment',
      sqlColumn:'COMMENTMETADATA',
      // assumed to be "body"
      type: GraphQLString,
    },
    commentContent: {
      description: 'The Content of the comment',
      sqlColumn:'COMMENTMETADATA.COMMENTCONTENT',
      // assumed to be "body"
      type: GraphQLString,
    },
    post: {
      description: 'The post that the comment belongs to',
      // a back reference to its Post
      type: Post,
      // how to join these tables
      sqlJoin: (commentTable, postTable) =>
        `${commentTable}.POSTID = ${postTable}.ID`,
    },
    author: {
      description: 'The user who wrote the comment',
      // and one to its User
      type: User,
      sqlJoin: (commentTable, userTable) =>
        `${commentTable}.AUTHORID = ${userTable}.ID`,
    },
    authorID: {
      type: GraphQLInt,
      sqlcolumn: 'AUTHORID',
    },
    postID: {
      type: GraphQLInt,
      sqlColumn: 'POSTID',
    },
    isDeleted: {
      type: GraphQLBoolean,
    },
    createdAt: {
      type: GraphQLString,
      sqlColumn: 'CREATEDAT',
    },
    modifiedAt: {
      type: GraphQLString,
      sqlColumn: 'MODIFIEDAT',
    },
    numComments: {
      description: 'Number of Comments the user has Written on Posts',
      type: GraphQLInt,
      sqlExpr: userTable =>
        `(SELECT COUNT(*) FROM COMMENTSTABLE WHERE AUTHORID = ${userTable}.ID AND ISDELETED = 'N')`,
    },
  }),
});
