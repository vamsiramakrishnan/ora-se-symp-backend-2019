import {
  GraphQLObjectType,
  GraphQLList,
  GraphQLString,
  GraphQLInt,
} from 'graphql';

import Quiz from './Quiz'
import QuizAnswers from './QuizAnswers.js'

const QuizQuestions = new GraphQLObjectType({
  description: 'Quiz Questions table',
  name: 'quizQuestions',
  // tell join monster the expression for the table
  sqlTable: 'QUIZQUESTIONTABLE',
  // one of the columns must be unique for deduplication purposes
  uniqueKey: 'ID',
  fields: () => ({
    ID: {
      // no `sqlColumn` and no `resolve`. assumed that the column name is the same as the field name: id
      type: GraphQLInt,
      sqlColumn: 'ID'
    },
    quiz: {
      description: "FK from QUIZ Table ",
      type: GraphQLString,
      // specify the SQL column
      sqlColumn: 'QUIZ',
    },
    question: {
      description: 'Questions in quiz',
      type: GraphQLString,
      // specify the SQL column
      sqlColumn: 'QUESTION',
    },
    options: {
      description: "Options",
      type: GraphQLString,
      sqlColumn: 'OPTIONS',
      // depends on multiple SQL columns
    },
    answer: {
      description: 'Answer to Questions in Quiz',
      // has another GraphQLObjectType as a field
      type: GraphQLString,
      sqlColumn: 'ANSWER'
    },
    area: {
      description: 'Area',
      type: GraphQLString,
      sqlColumn: 'AREA'
    },
    quiz: {
      description: 'Quiz that this question belongs to',
      type: Quiz,
      sqlJoin: (quizQuestiontable, quizTable) =>
        `${quizQuestiontable}.QUIZ = ${quizTable}.ID`
    },
    quizAnswers: {
      type: new GraphQLList(QuizAnswers),
      sqlJoin: (quizQuestionsTable, quizAnswersTable) =>
        `${quizQuestionsTable}.ID = ${quizAnswersTable}.QUESTION`
    }
  }),
});

export default QuizQuestions;
