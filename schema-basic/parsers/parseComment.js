export default async function parseComment(args) {
    return await {
        ID: args.ID,
        postID: args.POSTID,
        authorID: args.AUTHORID,
        postContent: JSON.parse(args.COMMENTMETADATA).COMMENTCONTENT,
        postImages: JSON.parse(args.COMMENTMETADATA).COMMENTIMAGES.toString(),
        isDeleted: args.ISDELETED,
        createdAt: args.CREATEDAT,
        modifiedAt: args.MODIFIEDAT
    };
}