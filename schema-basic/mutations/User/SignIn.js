import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dbCall from "../../helpers/fetch";
import knex from "../../helpers/database";
import { userReturnArray } from "../../helpers/returning";
import parseUser from "../../parsers/parseUser";

export default async function SignIn(args, context) {
  var dbHash = await knex("USERTABLE").where({ USERNAME: args.userName }).select("HASH");
  const result = await bcrypt.compare(args.hash, dbHash[0].HASH)
  if (result) {
    const userInfo = await knex("USERTABLE").where({ USERNAME: args.userName }).increment("NUMLOGINS").returning(userReturnArray);
    const parsedUser = await parseUser(userInfo[0]);
    parsedUser.token = jwt.sign({ userName: args.userName }, "SeSyMp#2019_AmRiTsAr");
    console.log(parsedUser)
    return parsedUser;
  }
  else {
    return "failure"
  }
}

