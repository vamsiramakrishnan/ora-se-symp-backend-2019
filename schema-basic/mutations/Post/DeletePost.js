import uuid from "uuid";
import moment from "moment";
import dbCall from "../../helpers/fetch";
import knex from "../../helpers/database";

export default async function DeletePost(args, context) {
  return await knex("POSTTABLE")
    .where({ ID: args.ID })
    .update({
      ISDELETED: "Y",
      MODIFIEDAT: moment().format("DD-MMM-YYYY hh.mm.ss A")
    });
}
