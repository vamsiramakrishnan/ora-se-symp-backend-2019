import {
    GraphQLObjectType,
    GraphQLList,
    GraphQLString,
    GraphQLInt,
    GraphQLBoolean,
  } from 'graphql';
  
  import User from './User';
  
  export default new GraphQLObjectType({
    description: 'Events in SE Symposium',
    name: 'Event',
    // another table in SQL to map to
    sqlTable: '"ADMIN"."eventsTable"',
    uniqueKey: 'ID',
    fields: () => ({
      ID: {
        // SQL column assumed to be "id"
        type: GraphQLInt,
      },
      eventName: {
        sqlColumn: 'eventName',
        description: 'The Event Description',
        // assumed to be "body"
        type: GraphQLString,
      },
      eventMetadata: {
        sqlColumn: 'eventMetadata',
        description: 'Further Event Details',
        // assumed to be "body"
        type: GraphQLString,
      },
      attendees: {
        description: 'Event Attendees',
        // a back reference to its User
        type: User,
        // this is a one-to-one
        sqlJoin: (postTable, userTable) =>
          `${postTable}."authorID" = ${userTable}."ID"`,
      },
      authorId: {
        type: GraphQLInt,
        sqlColumn: 'authorID',
      },
      eventAttendees: {
        description: 'Users that this user is following',
        type: new GraphQLList(User),
        // many-to-many is supported too, via an intermediate join table
        junction: {
          sqlTable: `"ADMIN"."eventRegistrationTable"`,
          sqlJoins: [
            (eventTable, registrationTable) =>
              `${eventTable}."ID" = ${registrationTable}."eventID"`,
            (registrationTable, userTable) =>
              `${registrationTable}."registereeID" = ${userTable}."ID"`,
          ],
        },
      },
      numRegistrations: {
        description: 'The number of registrations in Event',
        type: GraphQLInt,
        // use a correlated subquery in a raw SQL expression to do things like aggregation
        sqlExpr: eventTable =>
          `(SELECT COUNT(*) FROM "ADMIN"."eventRegistrationTable" WHERE "eventID" = ${eventTable}."ID")`,
      },
    }),
  });
  