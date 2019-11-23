import {
  GraphQLObjectType,
  GraphQLList,
  GraphQLNonNull,
  GraphQLString,
  GraphQLInt
} from "graphql";

import { GraphQLJSON } from "graphql-type-json";

import User from "./queries/User";
import u_AddUser from "./mutations/User/AddUser";
import u_UdpatePassword from "./mutations/User/UpdatePassword";
import u_UpdateMetadata from "./mutations/User/UpdateMetadata";
import u_SignIn from "./mutations/User/SignIn";

import Post from "./queries/Post";
import p_AddPost from "./mutations/Post/AddPost";
import p_UdpateMetadata from "./mutations/Post/UpdateMetadata";
import p_DeletePost from "./mutations/Post/DeletePost";
import parsePost from "./parse";

import Comment from "./queries/Comment";
import c_AddComment from "./mutations/Comments/AddComment";
import c_UpdateMetadata from "./mutations/Comments/AddComment";
import c_DeleteComment from "./mutations/Comments/DeleteComment";

export default new GraphQLObjectType({
  name: "Mutations",
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
        return await u_AddUser(args, context);
      }
    },
    UpdateUserPassword: {
      type: User,
      args: {
        ID: { type: GraphQLString },
        userName: { type: GraphQLString },
        hash: { type: GraphQLString }
      },
      resolve: async (parent, args, context, resolveInfo) => {
        return await u_UdpatePassword(args, context);
      }
    },
    UpdateUserMetadata: {
      type: User,
      args: {
        ID: { type: GraphQLString },
        userName: { type: GraphQLString },
        userMetadata: { type: GraphQLJSON }
      },
      resolve: async (parent, args, context, resolveInfo) => {
        return await u_UpdateMetadata(args, context);
      }
    },
    SignIn: {
      type: User,
      args: {
        userName: { type: GraphQLString },
        hash: { type: GraphQLString },
        token: { type: GraphQLString }
      },
      resolve: async (parent, args, context, resolveInfo) => {
        return await u_SignIn(args, context);
      }
    },
    AddPost: {
      type: Post,
      args: {
        authorID: { type: GraphQLString },
        postMetadata: { type: GraphQLJSON }
      },
      resolve: async (parent, args, context, resolveInfo) => {
        return p_AddPost(args, context, postInfo => parsePost(postInfo));
      }
    },
    UpdatePost: {
      type: Post,
      args: {
        ID: { type: GraphQLString },
        postMetadata: { type: GraphQLJSON }
      },
      resolve: async (parent, args, context, resolveInfo) => {
        return await p_UdpateMetadata(args, context);
      }
    },
    DeletePost: {
      type: Post,
      args: {
        ID: { type: GraphQLString }
      },
      resolve: async (parent, args, context, resolveInfo) => {
        const deletePostFields = await p_DeletePost(args, context);
        return deletePostFields;
      }
    },
    AddComment: {
      type: Comment,
      args: {
        authorID: { type: GraphQLString },
        postID: { type: GraphQLString },
        commentMetadata: { type: GraphQLJSON }
      },
      resolve: async (parent, args, context, resolveInfo) => {
        return await c_AddComment(args, context);
      }
    },
    UpdateComment: {
      type: Comment,
      args: {
        ID: { type: GraphQLString },
        commentMetadata: { type: GraphQLJSON }
      },
      resolve: async (parent, args, context, resolveInfo) => {
        return await c_UpdateMetadata(args, context);
      }
    },
    DeleteComment: {
      type: Comment,
      args: {
        ID: { type: GraphQLString }
      },
      resolve: async (parent, args, context, resolveInfo) => {
        return await c_DeleteComment(args, context);
      }
    }
  })
});
