import {
  GraphQLObjectType,
  GraphQLList,
  GraphQLString,
  GraphQLInt,
} from 'graphql';

import GraphQLJSON, { GraphQLJSONObject } from 'graphql-type-json';
import QuizQuestions from './QuizQuestions';

const Quiz = new GraphQLObjectType({
  description: 'Quiz table',
  name: 'quiz',
  // tell join monster the expression for the table
  sqlTable: 'QUIZTABLE',
  // one of the columns must be unique for deduplication purposes
  uniqueKey: 'ID',
  fields: () => ({
    ID: {
      // no `sqlColumn` and no `resolve`. assumed that the column name is the same as the field name: id
      type: GraphQLInt,
      sqlColumn: 'ID'
    },
    name: {
      type: GraphQLString,
      // specify the SQL column
      sqlColumn: 'NAME',
    },
    isActive: {
      type: GraphQLInt,
      // specify the SQL column
      sqlColumn: 'ISACTIVE',
    },
    quizQuestions: {
      type: new GraphQLList(QuizQuestions),
      sqlJoin: (quizTable, quizQuestionTable) =>
        `${quizTable}.ID = ${quizQuestionTable}.QUIZ`,
    },
  }),
});

export default Quiz;

