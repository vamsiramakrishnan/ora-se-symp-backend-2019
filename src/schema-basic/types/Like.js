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
  description: 'Likes on posts',
  name: 'Like',
  // another SQL table to map to
  sqlTable: 'LIKESTABLE',
  uniqueKey: 'ID',
  fields: () => ({
    ID: {
      // assumed SQL column to be "id"
      type: GraphQLString,
    },
    post: {
      description: 'The post that the comment belongs to',
      // a back reference to its Post
      type: Post,
      // how to join these tables
      sqlJoin: (likesTable, postTable) =>
        `${likesTable}.POSTID = ${postTable}.ID`,
    },
    author: {
      description: 'The user who wrote the comment',
      // and one to its User
      type: User,
      sqlJoin: (likesTable, userTable) =>
        `${likesTable}.AUTHORID = ${userTable}.ID`,
    },
    authorID: {
      type: GraphQLString,
      sqlColumn: 'AUTHORID',
    },
    postID: {
      type: GraphQLString,
      sqlColumn: 'POSTID',
    },
    isDeleted: {
      type: GraphQLString,
      sqlColumn: 'ISDELETED'
    },
    createdAt: {
      type: GraphQLString,
      sqlColumn: 'CREATEDAT',
    },
    modifiedAt: {
      type: GraphQLString,
      sqlColumn: 'MODIFIEDAT',
    }
  }),
});
