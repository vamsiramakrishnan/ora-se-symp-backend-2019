
import uuid from 'uuid'
import moment from 'moment';
import knex from '../../helpers/database'
import { commentReturnArray } from '../../helpers/returning'

export default async function UpdateMetadata(args, context) {
    return await knex("COMMENTSTABLE")
        .returning(commentReturnArray)
        .where({ "ID": args.ID })
        .update({
            COMMENTMETADATA: JSON.stringify({ COMMENTCONTENT: args.commentContent, COMMENTIMAGES: args.commentImages }),
            MODIFIEDAT: moment().format("DD-MMM-YYYY hh.mm.ss A")
        });
}