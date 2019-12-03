import uuid from "uuid";
import moment from "moment";
import knex from "../../helpers/database";
import { hashtagsReturnArray } from "../../helpers/returning";
import handleNulls from "../../helpers/handleNulls";
import getHashTags from "../../helpers/hashtag"

export default async function AddHashtag(args, context) {
    const hashtags = await getHashTags(args.postContent);
    var insertArray = [];

    if (hashtags) {
        hashtags.forEach(function (hashtag) {
            insertArray.push({
                ID: uuid.v1(),
                POSTID: args.ID,
                HASHTAG: hashtag,
                CREATEDAT: moment().format("DD-MMM-YYYY hh.mm.ss A"),
                MODIFIEDAT: moment().format("DD-MMM-YYYY hh.mm.ss A")
            })
        })
        return knex("HASHTAGSTABLE").insert(insertArray);
    }
    else return null
}