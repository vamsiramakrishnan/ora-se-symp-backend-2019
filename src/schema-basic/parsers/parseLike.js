export default async function parseLike(args) {
    return await {
        ID: args.ID,
        postID: args.POSTID,
        authorID: args.AUTHORID,
        isDeleted: args.ISDELETED,
        createdAt: args.CREATEDAT,
        modifiedAt: args.MODIFIEDAT
    };
}