import {
  GraphQLObjectType,
  GraphQLList,
  GraphQLString,
  GraphQLInt,
} from 'graphql';

import Post from './Post';
import Comment from './Comment';

const User = new GraphQLObjectType({
  description: 'An SE Symposium User',
  name: 'User',
  // tell join monster the expression for the table
  sqlTable: `"ADMIN"."userTable"`,
  // one of the columns must be unique for deduplication purposes
  uniqueKey: 'ID',
  fields: () => ({
    ID: {
      // no `sqlColumn` and no `resolve`. assumed that the column name is the same as the field name: id
      type: GraphQLString,
    },
    userName: {
      type: GraphQLString,
      // specify the SQL column
      sqlColumn: 'userName',
    },
    hash: {
      type: GraphQLString,
      // specify the SQL column
      sqlColumn: 'hash',
    },
    firstName: {
      type: GraphQLString,
      // specify the SQL column
      sqlColumn: 'firstName',
    },
    lastName: {
      type: GraphQLString,
      sqlColumn: 'lastName',
    },
    userMetadata: {
      type: GraphQLString,
      sqlColumn: 'userMetadata',
    },
    userLocation: {
      type: GraphQLString,
      sqlColumn: 'userMetadata"."location'
    },
    userDepartment: {
      type: GraphQLString,
      sqlColumn: 'userMetadata"."Department'
    },
    userRoom: {
      type: GraphQLString,
      sqlColumn: 'userMetadata"."Room'
    },
    createdAt: {
      type: GraphQLString,
      sqlColumn: 'createdAt',
    },
    modifiedAt: {
      type: GraphQLString,
      sqlColumn: 'modifiedAt',
    },
    fullName: {
      description: "A user's first and last name",
      type: GraphQLString,
      // depends on multiple SQL columns
      sqlDeps: ['firstName', 'lastName'],
      resolve: user => `${user.firstName} ${user.lastName}`,
    },
    posts: {
      description: 'A list of Posts the user has written',
      // has another GraphQLObjectType as a field
      type: new GraphQLList(Post), 
      sqlJoin: (userTable, postTable) =>
        `${userTable}.ID = ${postTable}."authorID"`,
      where: table => `${table}."isDeleted" = 'N'`,
      orderBy: {
        createdAt: 'DESC',
      },  
    },
    comments: {
      description: 'List of Comments the user has written on Posts',
      // another one-to-many relation
      // only JOIN comments that are not archived
      type: new GraphQLList(Comment),
      sqlJoin: (userTable, commentTable) =>
        `${userTable}.ID = ${commentTable}."authorID"`,
      where: table => `${table}."isDeleted" = 'N' `,
      orderBy: {
        modifiedAt: 'DESC',
      },
    },
    following: {
      description: 'Users that this user is following',
      type: new GraphQLList(User),
      // many-to-many is supported too, via an intermediate join table
      junction: {
        sqlTable: `"ADMIN"."networkingTable"`,
        sqlJoins: [
          (followerTable, relationTable) =>
            `${followerTable}."ID" = ${relationTable}."requestorID"`,
          (relationTable, followeeTable) =>
            `${relationTable}."acceptorID" = ${followeeTable}."ID"`,
        ],
      },
    },
    followers: {
      description: 'Followers of current user',
      type: new GraphQLList(User),
      // many-to-many is supported too, via an intermediate join table
      junction: {
        sqlTable: `"ADMIN"."networkingTable"`,
        sqlJoins: [
          (followeeTable, relationTable) =>
            `${followeeTable}."ID" = ${relationTable}."acceptorID"`,
          (relationTable, followerTable) =>
            `${relationTable}."requestorID" = ${followerTable}."ID"`,
        ],
      },
    },
    
    numPosts: {
      description: 'Number of Comments the user has Written on Posts',
      type: GraphQLInt,
      sqlExpr: userTable =>
        `(SELECT COUNT(*) FROM "ADMIN"."postTable" WHERE "authorID" = ${userTable}."ID" AND "isDeleted" = 'N')`,
    },
    numComments: {
      description: 'Number of Comments the user has Written on Posts',
      type: GraphQLInt,
      sqlExpr: userTable =>
        `(SELECT COUNT(*) FROM "ADMIN"."commentsTable" WHERE "authorID" = ${userTable}."ID" AND "isDeleted" = 'N')`,
    },
  }),
});

export default User;

function toBase64(clear) {
  return Buffer.from(String(clear)).toString('base64');
}
