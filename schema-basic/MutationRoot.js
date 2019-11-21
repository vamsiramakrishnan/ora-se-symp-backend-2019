import {
  GraphQLObjectType,
  GraphQLList,
  GraphQLNonNull,
  GraphQLString,
  GraphQLInt,
} from 'graphql';



import User from './queries/User';
import AddUser from './mutations/AddUser';
// import UpdateUser from './mutations/UpdateUser';

export default new GraphQLObjectType({
  name: 'AddUser',
  fields: () => ({
    user: {
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
    })
  });