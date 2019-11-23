export const parsePost = async function parsePost(args) {
  return {
    ID: args.ID,
    authorID: args.AUTHORID,
    postMetadata: args.POSTMETADATA,
    createdAt: args.CREATEDAT,
    modifiedAt: args.MODIFIEDAT
  };
};
