const { Pool } = require('pg');


module.exports = new Pool({
    user: 'user',
    host: 'postgres',
    database: 'db',
    password: 'pass',
    port: 5432,
  });
  