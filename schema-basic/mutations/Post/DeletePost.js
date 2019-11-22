
import uuid from 'uuid'
import moment from 'moment';
import dbCall from '../../helpers/fetch';
import knex from '../../helpers/database'

export default async function DeletePost(args, context) {
    return await dbCall(
        `UPDATE POSTTABLE 
        SET ISDELETED = 'Y',
        MODIFIEDAT = '${moment().format('DD-MMM-YYYY hh.mm.ss A')}' 
        WHERE ID = '${args.ID}'`, knex, context)
}