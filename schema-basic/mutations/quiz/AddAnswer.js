import { answerReturnArray } from '../../helpers/returning';
import knex from '../../helpers/database';
import moment from 'moment';

export default async function AddAnswer(args, context) {
    return await knex("QUIZANSWERSTABLE")
        .returning(answerReturnArray)
        .insert({
            QUESTION: args.question,
            LOGGEDINUSER: args.authorID,
            ANSWER: args.answer,
            ANSWERTIME: moment().format("DD-MMM-YYYY hh.mm.sss A")
        });
}