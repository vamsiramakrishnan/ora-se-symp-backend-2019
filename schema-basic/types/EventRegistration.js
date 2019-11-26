import {
    GraphQLObjectType,
    GraphQLList,
    GraphQLString,
    GraphQLInt,
    GraphQLBoolean,
} from 'graphql';

import User from './User'
import Event from './Event'

export default new GraphQLObjectType({
    description: 'Events in SE Symposium',
    name: 'EventRegistration',
    // another table in SQL to map to
    sqlTable: 'EVENTREGISTRATIONTABLE',
    uniqueKey: 'ID',
    fields: () => ({
        ID: {
            // SQL column assumed to be "id"
            type: GraphQLString,
        },
        eventSlot: {
            sqlColumn: 'DAYID',
            description: 'The Event Description',
            // assumed to be "body"
            type: GraphQLString,
        },
        eventID: {
            sqlColumn: 'EVENTID',
            description: 'Further Event Details',
            // assumed to be "body"
            type: GraphQLString,
        },
        userID: {
            sqlColumn: 'REGISTEREEID',
            description: 'Further Event Details',
            // assumed to be "body"
            type: GraphQLString,
        },
        isDeleted: {
            type: GraphQLString,
            sqlColumn: "ISDELETED"
        },
        createdAt: {
            type: GraphQLString,
            sqlColumn: "CREATEDAT"
        },
        modifiedAt: {
            type: GraphQLString,
            sqlColumn: "MODIFIEDAT"
        },
        event: {
            description: 'List of Events that the user is attending',
            // another one-to-many relation
            // only JOIN comments that are not archived
            type: Event,
            // this is a one-to-one
            sqlJoin: (eventRegistrationTable, eventTable) =>
                `${eventRegistrationTable}.EVENTID = ${eventTable}.ID`
        },
        user: {
            description: 'List of Events that the user is attending',
            // another one-to-many relation
            // only JOIN comments that are not archived
            type: User,
            // this is a one-to-one
            sqlJoin: (eventRegistrationTable, userTable) =>
                `${eventRegistrationTable}.REGISTEREEID = ${userTable}.ID`
        },
    })
})



