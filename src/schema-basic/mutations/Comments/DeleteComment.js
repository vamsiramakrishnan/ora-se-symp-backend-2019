
import uuid from 'uuid'
import moment from 'moment';
import knex from '../../helpers/database'
import { commentReturnArray } from '../../helpers/returning';

export default async function DeleteComment(args, context) {
    return await knex("COMMENTSTABLE")
        .returning(commentReturnArray)
        .where({ "ID": args.ID })
        .update({
            ISDELETED: "Y",
            MODIFIEDAT: moment().format("DD-MMM-YYYY hh.mm.ss A")
        });
}