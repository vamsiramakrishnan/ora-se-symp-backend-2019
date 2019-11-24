export default async function parsePost(args) {
  return await {
    ID: args.ID,
    authorID: args.AUTHORID,
    postMetadata: args.POSTMETADATA,
    postContent: JSON.parse(args.POSTMETADATA).POSTCONTENT,
    postImages: JSON.parse(args.POSTMETADATA).POSTIMAGES.toString(),
    isDeleted: args.ISDELETED,
    createdAt: args.CREATEDAT,
    modifiedAt: args.MODIFIEDAT
  };
}
