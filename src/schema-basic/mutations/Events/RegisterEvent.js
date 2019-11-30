
import uuid from 'uuid'
import moment from 'moment';
import knex from '../../helpers/database';
import { eventReturnArray } from '../../helpers/returning';

export default async function AddRegistration(args, context) {
    return await knex("EVENTREGISTRATIONTABLE")
        .insert({
            ID: uuid.v1(),
            DAYID: args.eventSlot,
            REGISTEREEID: args.userID,
            EVENTID: args.eventID,
            ISDELETED: "N",
            CREATEDAT: moment().format("DD-MMM-YYYY hh.mm.ss A"),
            MODIFIEDAT: moment().format("DD-MMM-YYYY hh.mm.ss A")
        }).returning(eventReturnArray);
}