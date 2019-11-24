export default function dbCall(sql, knex, context) {
  // console.log(sql);
  return knex.raw(sql);
}
