
import uuid from 'uuid'
import moment from 'moment';
import dbCall from '../../helpers/fetch';
import knex from '../../helpers/database'

export default async function AddRegistration(args, context) {

    return await knex("EVENTREGISTRATIONTABLE")
        .returning(eventReturnArray)
        .insert({
            ID: uuid.v1(),
            REGISTEREEID: args.registereeID,
            EVENTID: args.eventID,
            ISDELETED: "N",
            CREATEDAT: moment().format("DD-MMM-YYYY hh.mm.ss A"),
            MODIFIEDAT: moment().format("DD-MMM-YYYY hh.mm.ss A")
        });
}