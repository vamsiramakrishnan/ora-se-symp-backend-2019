import {
  GraphQLObjectType,
  GraphQLList,
  GraphQLString,
  GraphQLInt,
} from 'graphql';

import Post from './Post';
import Comment from './Comment';
import Event from './Event';
import config from '../config.json';

const Like = new GraphQLObjectType({
  description: 'An SE Symposium User',
  name: 'Like',
  // tell join monster the expression for the table
  sqlTable: 'LIKESTABLE',
  // one of the columns must be unique for deduplication purposes
  uniqueKey: 'ID',
  fields: () => ({
    ID: {
      // no `sqlColumn` and no `resolve`. assumed that the column name is the same as the field name: id
      type: GraphQLString,
    }
  }
  )
}
)
