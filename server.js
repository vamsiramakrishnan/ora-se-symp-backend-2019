import express from 'express'
import graphqlHTTP from 'express-graphql';
import cors from 'cors';
import graphql from 'graphql';
import schema from './schema-basic/index';
import path from 'path';
import jwt from 'express-jwt';
import User from './schema-basic/models/Model';
import bodyParser from 'body-parser';

// Create the Express app
const app = express();
app.use(
  '/graphql',
  jwt({
    secret: 'shhhhhhared-secret',
    requestProperty: 'auth',
    credentialsRequired: false
  })
)
app.use('/graphql', async (req, res, next) => {
  if (req.auth) {
    const user = await User.query().findOne({ userName: req.auth.sub })
    console.log(user);
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