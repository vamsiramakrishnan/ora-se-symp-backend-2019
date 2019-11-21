export default function dbCall(sql, knex, context) {
  // this is a little trick to help debugging and demo-ing. the client will display whatever is on the X-SQL-Preview header
  // DONT do something like this in production
  if (context) {
    context.set(
      'X-SQL-Preview',
      context.response.get('X-SQL-Preview') +
        '%0A%0A' +
        sql.replace(/%/g, '%25').replace(/\n/g, '%0A'),
    );
  }
  // send the request to the database
  return knex.raw(sql);
}
