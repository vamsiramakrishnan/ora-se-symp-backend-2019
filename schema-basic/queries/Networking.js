import {
  GraphQLObjectType,
  GraphQLList,
  GraphQLString,
  GraphQLInt,
} from 'graphql';

import User from './User';

export default new GraphQLObjectType({
  description: 'Networking Table',
  name: 'NetworkingTable',
  // another SQL table to map to
  sqlTable: 'NETWORKINGTABLE',
  uniqueKey: 'ID',
  fields: () => ({
    ID: {
      // assumed SQL column to be "id"
      type: GraphQLString,
    },
    requestorID: {
      description: 'Person who is following',
      // assumed to be "body"
      type: GraphQLString,
      sqlColumn: 'REQUESTORID'
    },
    acceptorID: {
      description: 'Person who is followed',
      // a back reference to its Post
      type: GraphQLString,
      sqlColumn: 'ACCEPTORID'
      // how to join these tables
    },
    createdAt: {
      type: GraphQLString,
      sqlColumn: 'CREATEDAT',
    },
  }),
});
