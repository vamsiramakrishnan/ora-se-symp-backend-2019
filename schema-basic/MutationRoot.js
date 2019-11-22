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
import u_AddUser from './mutations/User/AddUser';
import u_UdpatePassword from './mutations/User/UpdatePassword';
import u_UpdateMetadata from './mutations/User/UpdateMetadata';


import p_AddPost from './mutations/Post/AddPost';
import p_UdpateMetadata from './mutations/Post/UpdateMetadata';
import p_DeletePost from './mutations/Post/DeletePost';

import Post from './queries/Post';


export default new GraphQLObjectType({
  name: 'Mutations',
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
        await u_AddUser(args, context)
      }
    },
    UpdateUserPassword: {
      type: User,
      args: {
        ID: { type: GraphQLString },
        userName: { type: GraphQLString },
        hash: { type: GraphQLString },
      },
      resolve: async (parent, args, context, resolveInfo) => {
        await u_UdpatePassword(args, context)
      }
    },
    UpdateUserMetadata: {
      type: User,
      args: {
        ID: { type: GraphQLString },
        userName: { type: GraphQLString },
        userMetadata: { type: GraphQLJSON },
      },
      resolve: async (parent, args, context, resolveInfo) => {
        await u_UpdateMetadata(args, context)
      }
    },
    AddPost: {
      type: Post,
      args: {
        authorID: { type: GraphQLString },
        postMetadata: { type: GraphQLJSON },
      },
      resolve: async (parent, args, context, resolveInfo) => {
        await p_AddPost(args, context)
      }
    },
    UpdatePost: {
      type: Post,
      args: {
        ID: { type: GraphQLString },
        authorID: { type: GraphQLString },
        postMetadata: { type: GraphQLJSON },
      },
      resolve: async (parent, args, context, resolveInfo) => {
        await p_UdpateMetadata(args, context)
      }
    },
    DeletePost: {
      type: Post,
      args: {
        ID: { type: GraphQLString },
      },
      resolve: async (parent, args, context, resolveInfo) => {
        await p_DeletePost(args, context)
      }
    }
  })
});
