import path from 'path';
// knex is a convenient library that can connect to various SQL databases
// you can use any library you wish
export default require('knex')({
  client: 'oracledb',
  connection: {
    connectString: 'sesymp2019_high',
    user: 'sesym',
    password: 'Oracle12345#',
  },
  useNullAsDefault: true,
  pool: {
    min: 0,
    max: 7
  }
});
