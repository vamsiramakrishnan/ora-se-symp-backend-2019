import {
    GraphQLObjectType,
    GraphQLList,
    GraphQLString,
    GraphQLInt,
} from 'graphql';

import QuizQuestions from './QuizQuestions'
const QuizAnswers = new GraphQLObjectType({
    description: 'Quiz Answers table',
    name: 'quizAnswers',
    // tell join monster the expression for the table
    sqlTable: 'QUIZANSWERSTABLE',
    // one of the columns must be unique for deduplication purposes
    uniqueKey: 'ID',
    fields: () => ({
        ID: {
            // no `sqlColumn` and no `resolve`. assumed that the column name is the same as the field name: id
            type: GraphQLInt,
            sqlColumn: 'ID'
        },
        question: {
            description: "FK from quiz questions",
            type: GraphQLInt,
            // specify the SQL column
            sqlColumn: 'QUESTION',
        },
        answer: {
            description: 'Answer in quiz',
            type: GraphQLString,
            // specify the SQL column
            sqlColumn: 'ANSWER',
        },
        authorID: {
            description: "Who wrote this answer",
            type: GraphQLString,
            sqlColumn: 'LOGGEDINUSER',
            // depends on multiple SQL columns
        },
        answerTime: {
            description: 'Answer to Questions in Quiz',
            // has another GraphQLObjectType as a field
            type: GraphQLString,
            sqlColumn: 'ANSWERTIME'
        },
        quizQuestion: {
            type: QuizQuestions,
            sqlJoin: (quizAnswerTable, quizQuestionTable) =>
                `${quizAnswerTable}.QUESTION = ${quizQuestionTable}.ID`
        }
    }),
});

export default QuizAnswers;
