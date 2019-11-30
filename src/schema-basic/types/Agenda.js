import {
  GraphQLObjectType,
  GraphQLList,
  GraphQLString,
  GraphQLInt,
  GraphQLBoolean,
} from 'graphql';


export default new GraphQLObjectType({
  description: 'Complete Event Agenda in SE Symposium',
  name: 'Agenda',
  // another table in SQL to map to
  sqlTable: 'AGENDAUPDATE',
  uniqueKey: 'TOPIC_ACTIVITY',
  fields: () => ({
    dayNo: {
      // SQL column assumed to be "id"
      sqlColumn: 'DAYNO',
      type: GraphQLString,
    },
    eventDate: {
      sqlColumn: 'EVENTDATE',
      description: 'Date at which event is happening',
      // assumed to be "body"
      type: GraphQLString,
    },
    startTime: {
      sqlColumn: 'COL_START',
      description: 'Start Time',
      // assumed to be "body"
      type: GraphQLString,
    },
    endTime: {
      sqlColumn: 'COL_END',
      description: 'End Time',
      // assumed to be "body"
      type: GraphQLString,
    },
    sessionLength: {
      sqlColumn: 'SESSIONTIME',
      description: 'Further Event Details',
      // assumed to be "body"
      type: GraphQLString,
    },
    sessionTitle: {
      sqlColumn: 'TOPIC_ACTIVITY',
      description: 'Further Event Details',
      // assumed to be "body"
      type: GraphQLString,
    },
    sessionHost: {
      sqlColumn: 'HOST_SPEAKER',
      description: 'Name of the Speaker',
      // assumed to be "body"
      type: GraphQLString,
    }
  }),
});