import { dbCabAnswerReturnArray } from '../../helpers/returning';
import knex from '../../helpers/database';
import moment from 'moment';

export default async function AddDBCabAnswers(args, context) {
    return await knex("ANSWERTABLE")
        .returning(dbCabAnswerReturnArray)
        .insert({
            QUESTION_ID: args.question_id,
            ANSWER: args.answer
        });
}