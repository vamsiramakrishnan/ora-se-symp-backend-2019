import moment from 'moment';
import knex from '../../helpers/database'
import { postReturnArray } from '../../helpers/returning';

export default async function UpdatePost(args, context) {
    return await knex('POSTTABLE')
        .returning(postReturnArray)
        .where({ "ID": args.ID })
        .update({
            "POSTMETADATA": JSON.stringify({ "POSTCONTENT": args.postContent, "POSTIMAGES": args.postImages }),
            "MODIFIEDAT": moment().format('DD-MMM-YYYY hh.mm.ss A')
        })
}