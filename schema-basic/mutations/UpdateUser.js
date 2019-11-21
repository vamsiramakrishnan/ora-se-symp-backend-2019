
import uuid from 'uuid'
import moment from 'moment';
import dbCall from '../helpers/fetch';
import knex from '../helpers/database'

export default async function AddUser(args,context) {
    return await dbCall(
        `INSERT INTO USERTABLE (ID, USERNAME, HASH, FIRSTNAME, LASTNAME, CREATEDAT, MODIFIEDAT, ROLE ) 
        VALUES ('${uuid.v1()}', 
        '${args.userName}', 
        '${args.hash}', 
        '${args.firstName}', 
        '${args.lastName}', 
        '${moment().format('DD-MMM-YYYY hh.mm.ss A')}', 
        '${moment().format('DD-MMM-YYYY hh.mm.ss A')}',
        '1' )`, knex, context)
}