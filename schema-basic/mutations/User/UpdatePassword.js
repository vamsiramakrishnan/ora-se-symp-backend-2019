
import uuid from 'uuid'
import moment from 'moment';
import dbCall from '../../helpers/fetch';
import knex from '../../helpers/database'

export default async function UpdatePassword(args, context) {
    return await knex('USERTABLE')
        .returning(userReturnArray)
        .where({ "ID": args.ID })
        .update({
            "HASH": await bcrypt.hash(args.hash, 10),
            "MODIFIEDAT": moment().format('DD-MMM-YYYY hh.mm.ss A')
        })
}