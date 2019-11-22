import {
  GraphQLObjectType,
  GraphQLList,
  GraphQLNonNull,
  GraphQLString,
  GraphQLInt,
} from 'graphql';

import {
  GraphQLJSON
} from 'graphql-type-json'

import User from './queries/User';
import AddUser from './mutations/User/AddUser';
import UdpatePassword from './mutations/User/UpdatePassword';


export default new GraphQLObjectType({
  name: 'Mutation',
  fields: () => ({
    AddUser: {
      type: User,
      args: {
        userName: { type: GraphQLString },
        hash: { type: GraphQLString },
        firstName: { type: GraphQLString },
        lastName: { type: GraphQLString },
        role: { type: GraphQLInt }
      },
      resolve: async (parent, args, context, resolveInfo) => { 
        await AddUser(args,context)}
      },
    UpdateUserPassword: {
      type: User,
      args:{
        ID: {type: GraphQLString},
        userName: { type: GraphQLString },
        hash: { type: GraphQLString },
      },
      resolve: async (parent, args, context, resolveInfo) => { 
        await UdpatePassword(args,context)}
    },
    UpdateUserMetadata: {
      type: User,
      args:{
        ID: {type: GraphQLString},
        userName: { type: GraphQLString },
        userMetadata: { type: GraphQLJSON },
      },
      resolve: async (parent, args, context, resolveInfo) => { 
        await UpdateUserMetadata(args,context)}
    }
    })
  });