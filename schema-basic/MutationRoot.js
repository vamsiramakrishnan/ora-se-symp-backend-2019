import {
  GraphQLObjectType,
  GraphQLList,
  GraphQLNonNull,
  GraphQLString,
  GraphQLInt,
} from 'graphql';


import knex from './database';
import User from './User';

export default new GraphQLObjectType({
  name: 'AddUser',
  fields: () => ({
    user: {
      type: User,
      args: {
        ID: { type: GraphQLInt },
        userName: { type: GraphQLString },
        hash: { type: GraphQLString },
        firstName: { type: GraphQLString },
        lastName: { type: GraphQLString }
      },
      resolve: async (parent, args, context, resolveInfo) => {
        try {
          return (
            await knex(`USERTABLE`).insert(
              {
                ID: args.ID,
                userName: args.userName,
                hash: args.hash,
                firstName: args.firstName,
                lastName: args.lastName,
                createdAt: Date.now(),
                modifiedAt: Date.now()
              }
            )
          )
        }
        catch (err) {
          console.log(err)
          throw new Error('Failed to insert new User');
        }
      },
    },
  }),
});