export default async function parsePost(args) {
    return await {
        ID: args.ID,
        authorID: args.LOGGEDINUSER,
        question: args.QUESTION,
        answer: args.ANSWER,
        answerTime: args.ANSWERTIME
    };
}