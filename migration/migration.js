const db = require("../db/db");

module.exports.up = async function() {
  db.connect();

  try{
  const res = await db.query(`
  CREATE TABLE IF NOT EXISTS shoes (
    id SERIAL PRIMARY KEY,
    sku varchar(250) UNIQUE,
    trueToSizeAverage DOUBLE PRECISION,
    trueToSizeDataPoints INTEGER
  );`);
  }
  catch(err){

    console.log(err);
  }

};
