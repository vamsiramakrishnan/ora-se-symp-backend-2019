
import uuid from 'uuid'
import moment from 'moment';
import dbCall from '../../helpers/fetch';
import knex from '../../helpers/database'

export default async function AddPost(args,context) {
    return await dbCall(
        `INSERT INTO POSTTABLE (ID, AUTHORID, POSTMETADATA, ISDELETED, CREATEDAT, MODIFIEDAT ) 
        VALUES ('${uuid.v1()}', 
        '${args.authorID}', 
        '${args.postMetadata}', 
        'N', 
        '${moment().format('DD-MMM-YYYY hh.mm.ss A')}', 
        '${moment().format('DD-MMM-YYYY hh.mm.ss A')}'
         )`, knex, context)
}