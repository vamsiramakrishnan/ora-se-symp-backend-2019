import {
  GraphQLObjectType,
  GraphQLList,
  GraphQLString,
  GraphQLInt,
  GraphQLBoolean,
} from 'graphql';

import User from './User';
import EventRegistration from './EventRegistration';

export default new GraphQLObjectType({
  description: 'Events in SE Symposium',
  name: 'Event',
  // another table in SQL to map to
  sqlTable: 'EVENTSTABLE',
  uniqueKey: 'ID',
  fields: () => ({
    ID: {
      // SQL column assumed to be "id"
      type: GraphQLString,
    },
    eventName: {
      sqlColumn: 'EVENTNAME',
      description: 'The Event Description',
      // assumed to be "body"
      type: GraphQLString,
    },
    eventMetadata: {
      sqlColumn: 'EVENTMETADATA',
      description: 'Further Event Details',
      // assumed to be "body"
      type: GraphQLString,
    },
    eventAttendees: {
      description: 'Attendees that are attending event',
      type: new GraphQLList(User),
      // many-to-many is supported too, via an intermediate join table
      junction: {
        sqlTable: 'EVENTREGISTRATIONTABLE',
        sqlJoins: [
          (eventTable, registrationTable) =>
            `${eventTable}.ID = ${registrationTable}.EVENTID`,
          (registrationTable, userTable) =>
            `${registrationTable}.REGISTEREEID = ${userTable}.ID`,
        ],
        where: registrationTable => `${registrationTable}.ISDELETED = 'N'`
      },
    },
    registrations: {
      description: 'Registrations for event ',
      type: new GraphQLList(EventRegistration),
      sqlJoin: (eventTable, registrationTable) =>
        `${eventTable}.ID = ${registrationTable}.POSTID`,
      where: table => `${table}.ISDELETED = 'N'`,
      orderBy: {
        CREATEDAT: 'DESC',
      },
    },
    numRegistrations: {
      description: 'The number of registrations in Event',
      type: GraphQLList(GraphQLInt),
      // use a correlated subquery in a raw SQL expression to do things like aggregation
      sqlExpr: eventTable =>
        `(SELECT COUNT(*) FROM EVENTREGISTRATIONTABLE WHERE EVENTID = ${eventTable}.ID AND ISDELETED = 'N')`,
    },
  }),
});
