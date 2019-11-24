import uuid from "uuid";
import moment from "moment";
import dbCall from "../../helpers/fetch";
import knex from "../../helpers/database";
import { userReturnArray } from "../../helpers/returning";

export default async function UpdateMetadata(args, context) {
  return await knex('USERTABLE')
    .returning(userReturnArray)
    .where({ "ID": args.ID })
    .update({
      "USERMETADATA": args.userMetadata,
      "MODIFIEDAT": moment().format('DD-MMM-YYYY hh.mm.ss A')
    })
}
