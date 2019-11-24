import {
  GraphQLObjectType,
  GraphQLList,
  GraphQLNonNull,
  GraphQLString,
  GraphQLInt,
} from 'graphql';

import joinMonster from 'join-monster';
import knex from './helpers/database';
import dbCall from './helpers/fetch';
import User from './queries/User';
import Comment from './queries/Comment';
import Post from './queries/Post';
import Event from './queries/Event';

export default new GraphQLObjectType({
  description: 'Global Query Object',
  name: 'Query',
  fields: () => ({
    version: {
      type: GraphQLString,
      resolve: () => joinMonster.version,
    },
    user: {
      type: User,
      args: {
        id: {
          description: 'The users ID number',
          type: new GraphQLNonNull(GraphQLString),
        },
      },
      // this function generates the WHERE condition
      where: (usersTable, args, context) => {
        return `${usersTable}.ID = '${args.id}'`;
      },
      orderBy: {
        CREATEDAT: 'DESC'
      },
      resolve: (parent, args, context, resolveInfo) => {
        return joinMonster(resolveInfo, context, sql =>
          dbCall(sql, knex, context),
        );
      },
    },
    userByName: {
      type: User,
      args: {
        userName: {
          description: 'The user name',
          type: new GraphQLNonNull(GraphQLString),
        },
      },
      where: (usersTable, args, context) => {
        return `${usersTable}.USERNAME = '${args.userName}'`;
      },
      orderBy: {
        CREATEDAT: 'DESC'
      },
      resolve: (parent, args, context, resolveInfo) => {
        return joinMonster(resolveInfo, context, sql =>
          dbCall(sql, knex, context),
        );
      },
    },
    users: {
      type: new GraphQLList(User),
      orderBy: {
        CREATEDAT: 'DESC'
      },
      resolve: (parent, args, context, resolveInfo) => {
        return joinMonster(resolveInfo, context, sql =>
          dbCall(sql, knex, context),
        );
      },
    },
    comment: {
      type: Comment,
      args: {
        id: {
          description: 'Comment ID Search',
          type: new GraphQLNonNull(GraphQLString),
        },
      },
      orderBy: {
        CREATEDAT: 'DESC'
      },
      where: (commentsTable, args, context) => {
        return `${commentsTable}.ID = '${args.id}'`;
      },
      resolve: (parent, args, context, resolveInfo) => {
        return joinMonster(resolveInfo, context, sql =>
          dbCall(sql, knex, context),
        );
      },
    },
    comments: {
      type: new GraphQLList(Comment),
      orderBy: {
        CREATEDAT: 'DESC'
      },
      resolve: (parent, args, context, resolveInfo) => {
        return joinMonster(resolveInfo, context, sql =>
          dbCall(sql, knex, context),
        );
      },
    },
    post: {
      type: Post,
      args: {
        id: {
          description: 'Post ID Search',
          type: new GraphQLNonNull(GraphQLString),
        },
      },
      orderBy: {
        CREATEDAT: 'DESC'
      },
      where: (postTable, args, context) => {
        return `${postTable}.ID = '${args.id}'`;
      },
      resolve: (parent, args, context, resolveInfo) => {
        return joinMonster(resolveInfo, context, sql =>
          dbCall(sql, knex, context),
        );
      },
    },
    posts: {
      type: new GraphQLList(Post),
      orderBy: {
        CREATEDAT: 'DESC'
      },
      resolve: (parent, args, context, resolveInfo) => {
        return joinMonster(resolveInfo, context, sql =>
          dbCall(sql, knex, context),
        );
      },
    },
    event: {
      type: Event,
      args: {
        id: {
          description: 'event ID Search',
          type: new GraphQLNonNull(GraphQLString),
        },
      },
      where: (eventsTable, args, context) => {
        return `${eventsTable}.ID = '${args.id}'`;
      },
      resolve: (parent, args, context, resolveInfo) => {
        return joinMonster(resolveInfo, context, sql =>
          dbCall(sql, knex, context),
        );
      },
    },
    events: {
      type: new GraphQLList(Event),
      resolve: (parent, args, context, resolveInfo) => {
        return joinMonster(resolveInfo, context, sql =>
          dbCall(sql, knex, context),
        );
      },
    },
  }),
});
