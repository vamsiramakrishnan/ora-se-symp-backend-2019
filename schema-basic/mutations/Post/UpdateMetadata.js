import moment from 'moment';
import knex from '../../helpers/database'

export default async function UpdatePost(args, context) {
    return await knex('POSTTABLE')
    .where({"ID":args.ID})
    .update({ 
    "POSTMETADATA": args.postMetadata,  
    "MODIFIEDAT" : moment().format('DD-MMM-YYYY hh.mm.ss A') })
}