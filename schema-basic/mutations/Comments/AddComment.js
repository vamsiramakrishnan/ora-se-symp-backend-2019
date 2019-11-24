
import uuid from 'uuid'
import moment from 'moment';
import knex from '../../helpers/database'
import { commentReturnArray } from '../../helpers/returning';

export default async function AddComment(args, context) {

    return await knex("COMMENTSTABLE")
        .returning(commentReturnArray)
        .insert({
            ID: uuid.v1(),
            AUTHORID: args.authorID,
            POSTID: args.postID,
            COMMENTMETADATA: args.commentMetadata,
            ISDELETED: "N",
            CREATEDAT: moment().format("DD-MMM-YYYY hh.mm.ss A"),
            MODIFIEDAT: moment().format("DD-MMM-YYYY hh.mm.ss A")
        });
}