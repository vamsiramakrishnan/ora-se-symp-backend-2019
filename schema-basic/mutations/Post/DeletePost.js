import uuid from "uuid";
import moment from "moment";
import dbCall from "../../helpers/fetch";
import knex from "../../helpers/database";
import { postReturnArray } from "../../helpers/returning";

export default async function DeletePost(args, context) {
  return await knex("POSTTABLE")
    .returning(postReturnArray)
    .where({ ID: args.ID })
    .update({
      ISDELETED: "Y",
      MODIFIEDAT: moment().format("DD-MMM-YYYY hh.mm.ss A")
    });
}
