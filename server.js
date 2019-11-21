import path from 'path';
import Koa from 'koa';
import KoaRouter from 'koa-router';
import graphqlHTTP from 'koa-graphql';
// module we created that lets you serve a custom build of GraphiQL
import graphiql from 'koa-custom-graphiql';
import koaStatic from 'koa-static';
import koaConvert from 'koa-convert';
import koaCors from 'kcors';

import schemaBasic from './schema-basic/index';

const app = new Koa();
const router = new KoaRouter();

app.use(koaConvert(koaCors()));

router.get(
  '/graphql',
  graphiql(() => ({
    css: '/graphiql.css',
    js: '/graphiql.js',
  })),
);

router.get(
  '/graphql-relay',
  graphiql({
    url: '/graphql-relay',
    css: '/graphiql.css',
    js: '/graphiql.js',
  }),
);

router.post(
  '/graphql',
  koaConvert(
    graphqlHTTP({
      schema: schemaBasic,
      graphiql: true,
      formatError: e => {
        console.error(e);
        return e;
      },
    }),
  ),
);

router.redirect('/', '/graphql');

app.use(router.routes());
app.use(router.allowedMethods());
// serve the custom build of GraphiQL
app.use(koaStatic(path.join(__dirname, 'node_modules/graphsiql')));
const port = process.env.PORT || 4000;
app.listen(port, '0.0.0.0', () =>
  console.log(
    `server listening at http://localhost:${port}/graphql && http://localhost:${port}/graphql-relay`,
  ),
);