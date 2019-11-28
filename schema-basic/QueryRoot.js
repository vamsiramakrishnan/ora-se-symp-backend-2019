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

import User from './types/User';
import Comment from './types/Comment';
import Post from './types/Post';
import Event from './types/Event';
import Agenda from './types/Agenda';
import Hashtag from './types/Hashtags';
import Quiz from './types/Quiz';

const authenticated = fn => (parent, args, context, info) => {
  if (context && context.user) {
    return fn(parent, args, context, info)
  }
  throw new Error('User is not authenticated')
}

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
      resolve: authenticated((parent, args, context, resolveInfo) => {
        return joinMonster(resolveInfo, context, sql =>
          dbCall(sql, knex, context),
        );
      }),
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
      resolve: authenticated((parent, args, context, resolveInfo) => {
        return joinMonster(resolveInfo, context, sql =>
          dbCall(sql, knex, context),
        );
      }),
    },
    users: {
      type: new GraphQLList(User),
      orderBy: {
        CREATEDAT: 'DESC'
      },
      resolve: authenticated((parent, args, context, resolveInfo) => {
        return joinMonster(resolveInfo, context, sql =>
          dbCall(sql, knex, context),
        );
      }),
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
      resolve: authenticated((parent, args, context, resolveInfo) => {
        return joinMonster(resolveInfo, context, sql =>
          dbCall(sql, knex, context),
        );
      }),
    },
    comments: {
      type: new GraphQLList(Comment),
      orderBy: {
        CREATEDAT: 'DESC'
      },
      resolve: authenticated((parent, args, context, resolveInfo) => {
        return joinMonster(resolveInfo, context, sql =>
          dbCall(sql, knex, context),
        );
      }),
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
      resolve: authenticated((parent, args, context, resolveInfo) => {
        return joinMonster(resolveInfo, context, sql =>
          dbCall(sql, knex, context),
        );
      }),
    },
    posts: {
      type: new GraphQLList(Post),
      orderBy: {
        CREATEDAT: 'DESC'
      },
      resolve: authenticated((parent, args, context, resolveInfo) => {
        return joinMonster(resolveInfo, context, sql =>
          dbCall(sql, knex, context),
        );
      }),
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
    agenda: {
      type: new GraphQLList(Agenda),
      resolve: (parent, args, context, resolveInfo) => {
        return joinMonster(resolveInfo, context, sql =>
          dbCall(sql, knex, context),
        );
      },
    },
    hashtag: {
      type: Hashtag,
      args: {
        id: {
          description: 'HashTagID Search',
          type: new GraphQLNonNull(GraphQLString),
        },
      },
      orderBy: {
        CREATEDAT: 'DESC'
      },
      where: (hashtagsTable, args, context) => {
        return `${hashtagsTable}.ID = '${args.id}'`;
      },
      resolve: authenticated((parent, args, context, resolveInfo) => {
        return joinMonster(resolveInfo, context, sql =>
          dbCall(sql, knex, context),
        );
      }),
    },
    hashtags: {
      type: new GraphQLList(Hashtag),
      resolve: authenticated((parent, args, context, resolveInfo) => {
        return joinMonster(resolveInfo, context, sql =>
          dbCall(sql, knex, context),
        );
      }),
    },
    quiz: {
      type: Quiz,
      args: {
        id: {
          description: 'Quiz ID Number',
          type: new GraphQLNonNull(GraphQLInt),
        },
      },
      // this function generates the WHERE condition
      where: (quizTable, args, context) => {
        return `${quizTable}.ID = '${args.id}'`;
      },
      resolve: (parent, args, context, resolveInfo) => {
        return joinMonster(resolveInfo, context, sql =>
          dbCall(sql, knex, context),
        );
      },
    },
    quizzes: {
      type: new GraphQLList(Quiz),
      args: {
        isActive: {
          description: 'Is the Quiz Active',
          type: GraphQLInt
        }
      },
      where: (quizTable, args, context) => {
        return `${quizTable}.ISACTIVE = '${args.isActive}'`
      },
      resolve: (parent, args, context, resolveInfo) => {
        return joinMonster(resolveInfo, context, sql =>
          dbCall(sql, knex, context),
        );
      },
    },
  }),
});
