import {
  GraphQLObjectType,
  GraphQLList,
  GraphQLNonNull,
  GraphQLString,
  GraphQLInt
} from "graphql";

import jwt from 'jsonwebtoken'

// Users
import User from "./types/User";
import u_AddUser from "./mutations/User/AddUser";
import u_UdpatePassword from "./mutations/User/UpdatePassword";
import u_UpdateMetadata from "./mutations/User/UpdateMetadata";
import u_SignIn from "./mutations/User/SignIn";
import parseUser from "./parsers/parseUser";

// Posts
import Post from "./types/Post";
import p_AddPost from "./mutations/Post/AddPost";
import p_UdpateMetadata from "./mutations/Post/UpdateMetadata";
import p_DeletePost from "./mutations/Post/DeletePost";
import parsePost from "./parsers/parsePost";
import AddHashtag from "./mutations/Hashtags/addHashtags";

// Comments
import Comment from "./types/Comment";
import c_AddComment from "./mutations/Comments/AddComment";
import c_UpdateMetadata from "./mutations/Comments/AddComment";
import c_DeleteComment from "./mutations/Comments/DeleteComment";
import parseComment from "./parsers/parseComment";

//Likes
import Like from "./types/Like";
import l_AddLike from "./mutations/Like/AddLike";
import l_DeleteLike from "./mutations/Like/DeleteLike";
import parseLike from "./parsers/parseLike";

//Event Registration
import EventRegistration from "./types/EventRegistration";
import e_EventRegistration from './mutations/Events/RegisterEvent';
import parseEventRegistration from './parsers/parseEventRegistration';

//Answers 
import QuizAnswers from "./types/QuizAnswers";
import q_AddAnswer from './mutations/quiz/AddAnswer';
import parseAnswer from "./parsers/parseAnswer";


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
        return await parseUser(userInfo[0]);
      }
    },
    UpdateUserPassword: {
      type: User,
      args: {
        ID: { type: GraphQLString },
        hash: { type: GraphQLString }
      },
      resolve: authenticated(async (parent, args, context, resolveInfo) => {
        const userInfo = await u_UdpatePassword(args, context);
        const parsedUser = await parseUser(userInfo[0]);
        parsedUser.token = jwt.sign({ userName: args.userName }, "SeSyMp#2019_AmRiTsAr");
        return parsedUser
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
        location: { type: GraphQLString },
        profilePic: { type: GraphQLString },
        bio: { type: GraphQLString }
      },
      resolve: authenticated(async (parent, args, context, resolveInfo) => {
        const userInfo = await u_UpdateMetadata(args, context);
        return await parseUser(userInfo[0]);
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
        return await u_SignIn(args, context);
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
        return await parsePost(postInfo[0]);
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
        return await parsePost(postInfo[0]);
      })
    },
    DeletePost: {
      type: Post,
      args: {
        ID: { type: GraphQLString }
      },
      resolve: authenticated(async (parent, args, context, resolveInfo) => {
        const postInfo = await p_DeletePost(args, context);
        return await parsePost(postInfo[0]);
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
      resolve: authenticated(async (parent, args, context, resolveInfo) => {
        const commentInfo = await c_AddComment(args, context);
        return await parseComment(commentInfo[0]);
      })
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
    },
    EventRegister: {
      type: EventRegistration,
      args: {
        userID: { type: GraphQLString },
        eventSlot: { type: GraphQLString },
        eventID: { type: GraphQLString }
      },
      resolve: async (parent, args, context, resolveInfo) => {
        const postInfo = await e_EventRegistration(args, context);
        return await parseEventRegistration(postInfo[0]);
      }
    },
    AddAnswer: {
      type: QuizAnswers,
      args: {
        authorID: { type: GraphQLString },
        question: { type: GraphQLInt },
        answer: { type: GraphQLString }
      },
      resolve: async (parent, args, context, resolveInfo) => {
        const answerInfo = await q_AddAnswer(args, context);
        return await parseAnswer(answerInfo[0]);
      }
    },
    AddLike: {
      type: Like,
      args: {
        authorID: { type: GraphQLString },
        postID: { type: GraphQLString },
      },
      resolve: async (parent, args, context, resolveInfo) => {
        const likeInfo = await l_AddLike(args, context);
        return await parseLike(likeInfo[0]);
      }
    },
    DeleteLike: {
      type: Like,
      args: {
        likeID: { type: GraphQLString },
      },
      resolve: async (parent, args, context, resolveInfo) => {
        const likeInfo = await l_DeleteLike(args, context);
        return await parseLike(likeInfo[0]);
      }
    },
  })
});