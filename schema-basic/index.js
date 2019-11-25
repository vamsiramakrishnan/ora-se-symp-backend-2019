import { GraphQLSchema } from 'graphql';
import QueryRoot from './QueryRoot';
import MutationRoot from './MutationRoot';

export default new GraphQLSchema({
  description: 'Schema for SE Sympoisum Users',
  query: QueryRoot,
  mutation: MutationRoot,
});
