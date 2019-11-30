import uuid from "uuid";
import moment from "moment";
import knex from "../../helpers/database";
import { userReturnArray } from "../../helpers/returning";

export default async function UpdateMetadata(args, context) {
  return await knex('USERTABLE')
    .returning(userReturnArray)
    .where({ "ID": args.ID })
    .update({
      "USERMETADATA": JSON.stringify({ LOCATION: args.location, ROOM: args.room, PROFILEPIC: args.profilePic, DEPARTMENT: args.department }),
      "BIO": args.bio,
      "MODIFIEDAT": moment().format('DD-MMM-YYYY hh.mm.ss A')
    })
}
