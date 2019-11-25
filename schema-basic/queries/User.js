import {
  GraphQLObjectType,
  GraphQLList,
  GraphQLString,
  GraphQLInt,
} from 'graphql';

import GraphQLJSON, { GraphQLJSONObject } from 'graphql-type-json';

import Post from './Post';
import Comment from './Comment';
import Event from './Event';
import Hashtags from './Hashtags';

const User = new GraphQLObjectType({
  description: 'An SE Symposium User',
  name: 'User',
  // tell join monster the expression for the table
  sqlTable: 'USERTABLE',
  // one of the columns must be unique for deduplication purposes
  uniqueKey: 'ID',
  fields: () => ({
    ID: {
      // no `sqlColumn` and no `resolve`. assumed that the column name is the same as the field name: id
      type: GraphQLString,
      sqlColumn: 'ID'
    },
    userName: {
      type: GraphQLString,
      // specify the SQL column
      sqlColumn: 'USERNAME',
    },
    firstName: {
      type: GraphQLString,
      // specify the SQL column
      sqlColumn: 'FIRSTNAME',
    },
    lastName: {
      type: GraphQLString,
      sqlColumn: 'LASTNAME',
    },
    userMetadata: {
      type: GraphQLJSON,
      sqlColumn: 'USERMETADATA',
    },
    userLocation: {
      type: GraphQLString,
      sqlColumn: 'USERMETADATA.LOCATION'
    },
    token: {
      type: GraphQLString,
    },
    Department: {
      type: GraphQLString,
      sqlColumn: 'USERMETADATA.DEPARTMENT'
    },
    Room: {
      type: GraphQLString,
      sqlColumn: 'USERMETADATA.ROOM'
    },
    ProfilePic: {
      type: GraphQLString,
      sqlColumn: 'USERMETADATA.PROFILEPIC'
    },
    NumLogins: {
      type: GraphQLInt,
      sqlColumn: 'NUMLOGINS'
    },
    createdAt: {
      type: GraphQLString,
      sqlColumn: 'CREATEDAT',
    },
    modifiedAt: {
      type: GraphQLString,
      sqlColumn: 'MODIFIEDAT',
    },
    fullName: {
      description: "A user's first and last name",
      type: GraphQLString,
      // depends on multiple SQL columns
      sqlDeps: ['FIRSTNAME', 'LASTNAME'],
      resolve: user => `${user.FIRSTNAME} ${user.LASTNAME}`,
    },
    posts: {
      description: 'A list of Posts the user has written',
      // has another GraphQLObjectType as a field
      type: new GraphQLList(Post),
      sqlJoin: (userTable, postTable) =>
        `${userTable}.ID = ${postTable}.AUTHORID`,
      where: table => `${table}.ISDELETED = 'N'`,
      orderBy: {
        CREATEDAT: 'DESC',
      },
    },
    comments: {
      description: 'List of Comments the user has written on Posts',
      // another one-to-many relation
      // only JOIN comments that are not archived
      type: new GraphQLList(Comment),
      sqlJoin: (userTable, commentTable) =>
        `${userTable}.ID = ${commentTable}.AUTHORID`,
      where: table => `${table}.ISDELETED = 'N' `,
      orderBy: {
        MODIFIEDAT: 'DESC',
      },
    },
    following: {
      description: 'Users that this user is following',
      type: new GraphQLList(User),
      // many-to-many is supported too, via an intermediate join table
      junction: {
        sqlTable: "NETWORKINGTABLE",
        sqlJoins: [
          (followerTable, relationTable) =>
            `${followerTable}.ID = ${relationTable}.REQUESTORID`,
          (relationTable, followeeTable) =>
            `${relationTable}.ACCEPTORID = ${followeeTable}.ID`,
        ],
      },
    },
    followers: {
      description: 'Followers of current user',
      type: new GraphQLList(User),
      // many-to-many is supported too, via an intermediate join table
      junction: {
        sqlTable: 'NETWORKINGTABLE',
        sqlJoins: [
          (followeeTable, relationTable) =>
            `${followeeTable}.ID = ${relationTable}.ACCEPTORID`,
          (relationTable, followerTable) =>
            `${relationTable}.REQUESTORID = ${followerTable}.ID`,
        ],
      },
    },
    events: {
      description: 'List of Events that the user is attending',
      // another one-to-many relation
      // only JOIN comments that are not archived
      type: new GraphQLList(Event),
      junction: {
        sqlTable: 'EVENTREGISTRATIONTABLE',
        sqlJoins: [
          (userTable, registrationTable) =>
            `${userTable}.ID = ${registrationTable}.REGISTEREEID`,
          (registrationTable, eventTable) =>
            `${registrationTable}.EVENTID = ${eventTable}.ID`,
        ],
      },
    },
    hashtags: {
      description: ' List of Hashtags created by the User',
      type: new GraphQLList(Hashtags),
      junction: {
        sqlTable: 'POSTTABLE',
        sqlJoins: [
          (userTable, postTable) => `${userTable}.ID =${postTable}.AUTHORID`,
          (postTable, hashtagTable) => `${postTable}.ID = ${hashtagTable}.POSTID`
        ],
      }
    },
    numPosts: {
      description: 'Number of Comments the user has Written on Posts',
      type: GraphQLInt,
      sqlExpr: userTable =>
        `(SELECT COUNT(*) FROM POSTTABLE WHERE AUTHORID = ${userTable}.ID AND ISDELETED = 'N')`,
    },
    numComments: {
      description: 'Number of Comments the user has Written on Posts',
      type: GraphQLInt,
      sqlExpr: userTable =>
        `(SELECT COUNT(*) FROM COMMENTSTABLE WHERE AUTHORID = ${userTable}.ID AND ISDELETED = 'N')`,
    },
    hashtags: {
      description: ' List of Hashtags created by the User',
      type: new GraphQLList(Hashtags),
      junction: {
        sqlTable: 'POSTTABLE',
        sqlJoins: [
          (userTable, postTable) => `${userTable}.ID =${postTable}.AUTHORID`,
          (postTable, hashtagTable) => `${postTable}.ID = ${hashtagTable}.POSTID`
        ],
        sqlExpr: 'SELECT COUNT(*)'
      }
    },
  }),
});

export default User;

function toBase64(clear) {
  return Buffer.from(String(clear)).toString('base64');
}
