export default async function parseUser(args) {
  return await {
    ID: args.ID,
    userName: args.USERNAME,
    firstName: args.FIRSTNAME,
    lastName: args.LASTNAME,
    userMetadata: args.USERMETADATA,
    room: JSON.parse(args.USERMETADATA).ROOM,
    profilePic: JSON.parse(args.USERMETADATA).PROFILEPIC,
    location: JSON.parse(args.USERMETADATA).LOCATION,
    department: JSON.parse(args.USERMETADATA).DEPARTMENT,
    createdAt: args.CREATEDAT,
    modifiedAt: args.MODIFIEDAT
  };
}
