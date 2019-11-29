import { answerReturnArray } from '../../helpers/returning';

export default async function AddComment(args, context) {

    return await knex("QUIZANSWERSTABLE")
        .returning(commentReturnArray)
        .insert({
            QUESTION: args.questionID,
            LOGGEDINUSER: args.userID,
            ANSWER: args.answer,
            ANSWERTIME: moment().format("DD-MMM-YYYY hh.mm.ss A")
        });
}