export default async function parseEventRegistration(args) {
    return await {
        ID: args.ID,
        eventSlot: args.DAYID,
        isDeleted: args.ISDELETED,
        userID: args.REGISTEREEID,
        eventID: args.EVENTID,
        createdAt: args.CREATEDAT,
        modifiedAt: args.MODIFIEDAT
    };
}
