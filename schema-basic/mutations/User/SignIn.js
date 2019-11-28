import jwt from "jsonwebtoken";
import knex from "../../helpers/database";
import { userReturnArray } from "../../helpers/returning";
import parseUser from "../../parsers/parseUser";

export default async function SignIn(args, context) {
  var dbHash = await knex("USERTABLE").where({ USERNAME: args.userName }).select("HASH");
  if (args.hash == dbHash[0].HASH) {
    const userInfo = await knex("USERTABLE").where({ USERNAME: args.userName }).increment("NUMLOGINS").returning(userReturnArray);
    const parsedUser = await parseUser(userInfo[0]);
    parsedUser.token = jwt.sign({ userName: args.userName }, "SeSyMp#2019_AmRiTsAr");
    return parsedUser;
  }
  else {
    return { token: "failure" }
  }
}