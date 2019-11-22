
import uuid from 'uuid'
import moment from 'moment';
import dbCall from '../../helpers/fetch';
import knex from '../../helpers/database'

export default async function AddComment(args,context) {
    return await dbCall(
        `INSERT INTO COMMENTSTABLE (ID, AUTHORID, POSTID, COMMENTMETADATA, ISDELETED, CREATEDAT, MODIFIEDAT ) 
        VALUES ('${uuid.v1()}', 
        '${args.authorID}', 
        '${args.postID}', 
        '${args.commentMetadata}',
        'N', 
        '${moment().format('DD-MMM-YYYY hh.mm.ss A')}', 
        '${moment().format('DD-MMM-YYYY hh.mm.ss A')}'
         )`, knex, context)
}