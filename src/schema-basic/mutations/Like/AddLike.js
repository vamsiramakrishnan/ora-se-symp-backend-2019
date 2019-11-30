
import uuid from 'uuid'
import moment from 'moment';
import knex from '../../helpers/database'
import { likesReturnArray } from '../../helpers/returning';

export default async function AddLike(args, context) {
    return await knex("LIKESTABLE")
        .insert({
            ID: uuid.v1(),
            AUTHORID: args.authorID,
            POSTID: args.postID,
            ISDELETED: "N",
            CREATEDAT: moment().format("DD-MMM-YYYY hh.mm.ss A"),
            MODIFIEDAT: moment().format("DD-MMM-YYYY hh.mm.ss A")
        }).returning(likesReturnArray);
}