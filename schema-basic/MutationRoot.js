import {
  GraphQLObjectType,
  GraphQLList,
  GraphQLNonNull,
  GraphQLString,
  GraphQLInt,
} from 'graphql';

import joinMonster from 'join-monster';
import knex from './database';
import User from './User';

export default new GraphQLObjectType({
  name: 'AddUser',
  fields: () => ({
    user: {
      type: User,
      args: {
        ID: {type:GraphQLInt},
        userName: {type: GraphQLString},
        hash: {type: GraphQLString},
        firstName: {type: GraphQLString},
        lastName: {type: GraphQLString},
        userMetadata: {type: GraphQLString},
        createdAt: {type: GraphQLString},
        modifiedAt: {type: GraphQLString}
      },
      resolve: async (parent, args, context, resolveInfo) => {
        try {
          return (
            await knex("userTable").insert(
              {'ID':args.ID,
              'userName': args.userName,
              'hash': args.hash,
              'firstName': args.firstName,
              'lastName': args.lastName,
              'userMetadata': args.userMetadata,
              'createdAt': args.createdAt,
              'modifiedAt': args.modifiedAt}
              )
            )
          } 
          catch (err) {
          throw new Error('Failed to insert new User');
        }
      },
    },
  }),
});
