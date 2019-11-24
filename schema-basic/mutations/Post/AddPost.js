import uuid from "uuid";
import moment from "moment";
import knex from "../../helpers/database";
import { postReturnArray } from "../../helpers/returning";

export default async function AddPost(args, context) {

  return await knex("POSTTABLE")
    .returning(postReturnArray)
    .insert({
      ID: uuid.v1(),
      AUTHORID: args.authorID,
      POSTMETADATA: args.postMetadata,
      ISDELETED: "N",
      CREATEDAT: moment().format("DD-MMM-YYYY hh.mm.ss A"),
      MODIFIEDAT: moment().format("DD-MMM-YYYY hh.mm.ss A")
    });
}
