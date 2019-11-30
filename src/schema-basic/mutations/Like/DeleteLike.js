
import uuid from 'uuid'
import moment from 'moment';
import knex from '../../helpers/database'
import { likeReturnArray } from '../../helpers/returning';

export default async function DeleteLike(args, context) {
    return await knex("LIKESTABLE")
        .returning(likeReturnArray)
        .where({ "ID": args.ID })
        .update({
            ISDELETED: "Y",
            MODIFIEDAT: moment().format("DD-MMM-YYYY hh.mm.ss A")
        });
}