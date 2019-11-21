import path from 'path';
// knex is a convenient library that can connect to various SQL databases
// you can use any library you wish
export default require('knex')({
  client: 'oracledb',
  connection: {
    connectString: 'sesymp2019_high',
    user: 'admin',
    password: 'Smavikir@4390!',
  },
  useNullAsDefault: true,
});
