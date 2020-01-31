export default async function parsePost(args) {
    return await {
        ID: args.ID,
        question_id: args.QUESTION_ID,
        answer: args.ANSWER
    };
}