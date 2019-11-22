
import uuid from 'uuid'
import moment from 'moment';
import dbCall from '../../helpers/fetch';
import knex from '../../helpers/database'

export default async function UpdateMetadata(args,context) {
    if (args.ID != null){
    return await dbCall(
        `UPDATE POSTTABLE 
        SET POSTMETADATA = '${args.postMetadata}',
        MODIFIEDAT = '${moment().format('DD-MMM-YYYY hh.mm.ss A')}' 
        WHERE ID = '${args.ID}')`, knex, context)
    }
    else{
        return await dbCall(
            `UPDATE POSTTABLE 
               SET POSTMETADATA = '${args.postMetadata}',
               MODIFIEDAT = '${moment().format('DD-MMM-YYYY hh.mm.ss A')}' 
             WHERE USERNAME = '${args.userName}'`, knex, context)
    }
}