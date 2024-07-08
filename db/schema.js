import { GraphQLSchema, GraphQLObjectType, GraphQLString } from 'graphql';
import db from './database';

const TicketType = new GraphQLObjectType({
  name: 'Ticket',
  fields: {
    subject: { type: GraphQLString },
    status: {
      type: GraphQLString,
      resolve: (parent, args, context, info) => {
        return db.Status.findByPk(parent.statusId);
      },
    },
    priority: {
      type: GraphQLString,
      resolve: (parent, args, context, info) => {
        return db.Priority.findByPk(parent.priorityId);
      },
    },
    user: {
      type: GraphQLString,
      resolve: (parent, args, context, info) => {
        return db.User.findByPk(parent.userId);
      },
    },
  },
});

const QueryType = new GraphQLObjectType({
  name: 'Query',
  fields: {
    tickets: {
      type: new GraphQLList(TicketType),
      resolve: (parent, args, context, info) => {
        return db.Ticket.findAll();
      },
    },
  },
});

const schema = new GraphQLSchema({
  query: QueryType,
});

export default schema;
