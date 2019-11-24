import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dbCall from "../../helpers/fetch";
import knex from "../../helpers/database";

export default async function SignIn(args, context) {
  var dbHash = await knex("USERTABLE").where({ USERNAME: args.userName }).select("HASH");
  const result = await bcrypt.compare(args.hash, dbHash[0].HASH)
  if (result) {
    await knex("USERTABLE").where({ USERNAME: args.userName }).increment("NUMLOGINS");
    return await jwt.sign({ userName: args.userName }, "SeSyMp#2019_AmRiTsAr")
  }
  else {
    return "failure"
  }
}

