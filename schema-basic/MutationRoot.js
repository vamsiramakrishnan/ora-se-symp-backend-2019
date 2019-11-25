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
import parseUser from "./parsers/parseUser";

import Post from "./queries/Post";
import p_AddPost from "./mutations/Post/AddPost";
import p_UdpateMetadata from "./mutations/Post/UpdateMetadata";
import p_DeletePost from "./mutations/Post/DeletePost";
import parsePost from "./parsers/parsePost";

//
import Comment from "./queries/Comment";
import c_AddComment from "./mutations/Comments/AddComment";
import c_UpdateMetadata from "./mutations/Comments/AddComment";
import c_DeleteComment from "./mutations/Comments/DeleteComment";


const authenticated = fn => (parent, args, context, info) => {
  if (context && context.user) {
    return fn(parent, args, context, info)
  }
  throw new Error('User is not authenticated')
}

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
      },
      resolve: async (parent, args, context, resolveInfo) => {
        const userInfo = await u_AddUser(args, context);
        const parsedUser = await parseUser(userInfo[0]);
        return parsedUser
      }
    },
    UpdateUserPassword: {
      type: User,
      args: {
        ID: { type: GraphQLString },
        userName: { type: GraphQLString },
        hash: { type: GraphQLString }
      },
      resolve: authenticated(async (parent, args, context, resolveInfo) => {
        return await u_UdpatePassword(args, context);
      })
    },
    UpdateUserMetadata: {
      type: User,
      args: {
        ID: { type: GraphQLString },
        userName: { type: GraphQLString },
        room: { type: GraphQLString },
        location: { type: GraphQLString },
        department: { type: GraphQLString },
        location: { type: GraphQLString }
      },
      resolve: authenticated(async (parent, args, context, resolveInfo) => {
        const userInfo = await u_UpdateMetadata(args, context);
        const parsedUser = await parseUser(userInfo[0]);
        return parsedUser
      })
    },
    SignIn: {
      type: User,
      args: {
        userName: { type: GraphQLString },
        hash: { type: GraphQLString },
        token: { type: GraphQLString }
      },
      resolve: async (parent, args, context, resolveInfo) => {
        const parsedUser = await u_SignIn(args, context);
        return parsedUser
      }
    },
    AddPost: {
      type: Post,
      args: {
        authorID: { type: GraphQLString },
        postContent: { type: GraphQLString },
        postImages: { type: GraphQLString }
      },
      resolve: authenticated(async (parent, args, context, resolveInfo) => {
        const postInfo = await p_AddPost(args, context);
        const parsedPost = await parsePost(postInfo[0]);
        return parsedPost
      })
    },
    UpdatePost: {
      type: Post,
      args: {
        ID: { type: GraphQLString },
        postContent: { type: GraphQLString },
        postImages: { type: GraphQLString }
      },
      resolve: authenticated(async (parent, args, context, resolveInfo) => {
        const postInfo = await p_UdpateMetadata(args, context);
        const parsedPost = await parsePost(postInfo[0]);
        return parsedPost
      })
    },
    DeletePost: {
      type: Post,
      args: {
        ID: { type: GraphQLString }
      },
      resolve: authenticated(async (parent, args, context, resolveInfo) => {
        const postInfo = await p_DeletePost(args, context);
        const parsedPost = await parsePost(postInfo[0]);
        return parsedPost
      })
    },
    AddComment: {
      type: Comment,
      args: {
        authorID: { type: GraphQLString },
        postID: { type: GraphQLString },
        commentContent: { type: GraphQLString },
        commentImages: { type: GraphQLString }
      },
      resolve: async (parent, args, context, resolveInfo) => {
        return await c_AddComment(args, context);
      }
    },
    UpdateComment: {
      type: Comment,
      args: {
        ID: { type: GraphQLString },
        commentContent: { type: GraphQLString },
        commentImages: { type: GraphQLString }
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
