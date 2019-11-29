export default async function parsePost(args) {
    return await {
        ID: args.ID,
        userID: args.LOGGEDINUSER,
        questionID: args.QUESTION,
        answer: args.ANSWER,
        answerTime: args.ANSWERTIME
    };
}