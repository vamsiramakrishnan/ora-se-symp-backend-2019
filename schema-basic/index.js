import {GraphQLSchema} from 'graphql';
import QueryRoot from './QueryRoot';
import MutationRoot from './MutationRoot';

export default new GraphQLSchema({
  description: 'a test schema',
  query: QueryRoot,
  mutation: MutationRoot,
});
