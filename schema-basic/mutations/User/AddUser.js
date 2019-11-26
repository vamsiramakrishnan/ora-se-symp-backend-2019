
import uuid from 'uuid'
import moment from 'moment';
import dbCall from '../../helpers/fetch';
import knex from '../../helpers/database';
import bcrypt from 'bcrypt'
import { userReturnArray } from '../../helpers/returning';
import { userMetadataStruct } from '../../helpers/metadataStruct';

export default async function AddUser(args, context) {
  return await knex("USERTABLE")
    .returning(userReturnArray)
    .insert({
      ID: uuid.v1(),
      USERNAME: args.userName,
      HASH: args.hash,
      FIRSTNAME: args.firstName,
      LASTNAME: args.lastName,
      USERMETADATA: JSON.stringify(userMetadataStruct),
      CREATEDAT: moment().format("DD-MMM-YYYY hh.mm.ss A"),
      MODIFIEDAT: moment().format("DD-MMM-YYYY hh.mm.ss A"),
      NUMLOGINS: "0"
    });
}
