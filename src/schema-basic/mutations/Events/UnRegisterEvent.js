
import uuid from 'uuid'
import moment from 'moment';
import dbCall from '../../helpers/fetch';
import knex from '../../helpers/database'
import { eventReturnArray } from '../../helpers/returning';


export default async function UnRegisterEvent(args, context) {
    return await knex("EVENTREGISTRATIONTABLE")
        .returning(eventReturnArray)
        .where({ "ID": args.ID })
        .update({
            ISDELETED: 'Y',
            CREATEDAT: moment().format("DD-MMM-YYYY hh.mm.ss A"),
            MODIFIEDAT: moment().format("DD-MMM-YYYY hh.mm.ss A")
        });
}