export default function dbCall(sql, knex, context) {
  return knex.raw(sql);
}
