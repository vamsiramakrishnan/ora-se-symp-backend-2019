import {
    GraphQLObjectType,
    GraphQLList,
    GraphQLString,
    GraphQLInt,
} from 'graphql';

import QuizQuestions from './QuizQuestions'
const QuizDBCabAnswers = new GraphQLObjectType({
    description: 'Quiz Answers table',
    name: 'quizDBCabAnswers',
    // tell join monster the expression for the table
    sqlTable: 'ANSWERTABLE',
    // one of the columns must be unique for deduplication purposes
    uniqueKey: 'ID',
    fields: () => ({
        ID: {
            // no `sqlColumn` and no `resolve`. assumed that the column name is the same as the field name: id
            type: GraphQLInt,
            sqlColumn: 'ID'
        },
        question_id: {
            description: "FK from quiz questions",
            type: GraphQLInt,
            // specify the SQL column
            sqlColumn: 'QUESTION_ID',
        },
        answer: {
            description: 'Answer in quiz',
            type: GraphQLString,
            // specify the SQL column
            sqlColumn: 'ANSWER',
        },
        quizQuestion: {
            type: QuizQuestions,
            sqlJoin: (quizAnswerTable, quizQuestionTable) =>
                `${quizAnswerTable}.QUESTION_ID = ${quizQuestionTable}.ID`
        }
    }),
});

export default QuizDBCabAnswers;
