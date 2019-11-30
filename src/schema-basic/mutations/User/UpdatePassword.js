
import uuid from 'uuid'
import moment from 'moment';
import dbCall from '../../helpers/fetch';
import { userReturnArray } from '../../helpers/returning'
import knex from '../../helpers/database'

export default async function UpdatePassword(args, context) {
    return await knex('USERTABLE')
        .where({ "ID": args.ID })
        .update({
            "HASH": args.hash,
            "MODIFIEDAT": moment().format('DD-MMM-YYYY hh.mm.ss A')
        })
        .returning(userReturnArray)
}