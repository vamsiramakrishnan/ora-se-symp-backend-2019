import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dbCall from "../../helpers/fetch";
import knex from "../../helpers/database";

export default async function SignIn(args, context) {
  var dbHash = await knex("USERTABLE")
    .where({ USERNAME: args.userName })
    .select("HASH");
  bcrypt.compare(args.hash, dbHash[0].HASH, function(err, res) {
    if (err) {
      throw err;
    }
    if (res) {
      // Passwords match
      jwt.sign({ userName: args.userName }, "SeSyMp#2019_AmRiTsAr", function(
        err,
        res
      ) {
        if (err) {
          throw err;
        }
        return res;
      });
    } else {
      // Passwords don't match
      console.log("Here");
      return "Unsuccessful Login Attempt";
    }
  });
}
