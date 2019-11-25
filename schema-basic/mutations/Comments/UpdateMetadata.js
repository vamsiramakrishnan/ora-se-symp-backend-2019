
import uuid from 'uuid'
import moment from 'moment';
import dbCall from '../../helpers/fetch';
import knex from '../../helpers/database'

export default async function UpdateMetadata(args, context) {
    return await knex("COMMENTSTABLE")
        .returning(commentReturnArray)
        .where({ "ID": args.ID })
        .update({
            COMMENTMETADATA: JSON.stringify(args.commentContent, args.commentImages),
            MODIFIEDAT: moment().format("DD-MMM-YYYY hh.mm.ss A")
        });
}