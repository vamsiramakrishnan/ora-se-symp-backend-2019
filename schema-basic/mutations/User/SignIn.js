import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import dbCall from '../../helpers/fetch';
import knex from '../../helpers/database';

export default async function SignIn(args, context) {
    var dbHash = await dbCall(
        `SELECT HASH
         FROM USERTABLE
         WHERE USERNAME = '${args.userName}'`, knex, context)
    console.log(dbHash);
    console.log(await bcrypt.hash(args.hash,10));
    bcrypt.compare(dbHash.HASH, args.hash, function (err, res) {
        if (res) {
            // Passwords match
            var jwtToken = jwt.sign({ userName: args.userName }, 'SeSyMp#2019_AmRiTsAr').toString()
            console.log(jwtToken)
            return jwtToken
        } else {
            // Passwords don't match
            console.log("Here");
            return "Unsuccessful Login Attempt"
        }
    })
}
