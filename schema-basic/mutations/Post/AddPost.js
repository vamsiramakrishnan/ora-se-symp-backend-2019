import uuid from "uuid";
import moment from "moment";
import dbCall from "../../helpers/fetch";
import knex from "../../helpers/database";

export default async function AddPost(args, context) {
  return await knex("POSTTABLE")
    .returning(["ID", "AUTHORID", "POSTMETADATA", "CREATEDAT", "MODIFIEDAT"])
    .insert({
      ID: uuid.v1(),
      AUTHORID: args.authorID,
      POSTMETADATA: args.postMetadata,
      ISDELETED: "N",
      CREATEDAT: moment().format("DD-MMM-YYYY hh.mm.ss A"),
      MODIFIEDAT: moment().format("DD-MMM-YYYY hh.mm.ss A")
    });
}
