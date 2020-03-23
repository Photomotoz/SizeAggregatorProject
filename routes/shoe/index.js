var express = require("express");
var router = express.Router();

const db = require("../../db/db");

exports.shoeGET = async function(req, res, next) {
  db.connect();

  const query = `SELECT * FROM shoes WHERE sku = $1`;
  const values = [req.params.sku];
  
  const queryResult = await db.query(query, values);

  if (queryResult.rowCount === 1) {
    res.json(queryResult.rows[0]);
  } else {
    res.body("Didn't find shoe with SKU : " + req.params.sku);
  }
};

exports.shoePOST = async function(req, res, next) {
  if (req.body.trueToSizeData < 0 || req.body.trueToSizeData > 5) {
    res.send("Out of bounds(0-5)");
    return;
  }

  db.connect();

  const queryResult = await db.query(`SELECT * FROM shoes WHERE sku=$1;`, [
    req.params.sku
  ]);

  if (queryResult.rowCount === 1) {
    console.log(queryResult.rows[0]);

    const newAverage =
      (queryResult.rows[0].truetosizeaverage *
        queryResult.rows[0].truetosizedatapoints +
        parseFloat(req.body.trueToSizeData)) /
      (queryResult.rows[0].truetosizedatapoints + 1);

    const query = `UPDATE shoes SET trueToSizeAverage = $1, trueToSizeDataPoints=trueToSizeDataPoints+1 WHERE sku= $2`;

    const values = [newAverage, req.params.sku];
    await db.query(query, values);
    res.send("Done");
  } else {
    const query = `INSERT INTO shoes (sku, trueToSizeAverage, trueToSizeDataPoints) VALUES ($1, $2, 1);`;
    const values = [req.params.sku, req.body.trueToSizeData];
    await db.query(query, values);
    res.send("Done");
  }
};
