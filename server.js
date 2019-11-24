import express from 'express'
import graphqlHTTP from 'express-graphql';
import cors from 'cors';
import schema from './schema-basic/index';
import path from 'path';
import jwt from 'express-jwt';
import User from './schema-basic/models/Model';
import bodyParser from 'body-parser';
import knex from './schema-basic/helpers/database';

// Create the Express app
const app = express();
// console.log(printSchema(schema));
app.use(cors());
app.use(
  '/graphql',
  jwt({
    secret: 'SeSyMp#2019_AmRiTsAr',
    requestProperty: 'auth',
    credentialsRequired: false,
    userProperty: 'user',
  })
)
app.use('/graphql', async (req, res, next) => {
  console.log(req.auth)
  if (req.auth) {
    const dbDump = await knex.from('USERTABLE').where({ userName: req.auth }).select('*');
    const user = dbDump[0];
    req.context = {
      user
    }
  }
  next()
})
app.use('/graphql', bodyParser.json(), graphqlHTTP(req => ({
  schema: schema,
  graphiql: true,
  customFormatErrorFn: e => {
    console.error(e);
    return e;
  }
}
)));

// serve the custom build of GraphiQL
app.use(express.static(path.join(__dirname, 'node_modules/graphsiql')));
const port = process.env.PORT || 4000;
app.listen(port, '0.0.0.0', () =>
  console.log(
    `server listening at http://localhost:${port}/graphql`,
  ),
);