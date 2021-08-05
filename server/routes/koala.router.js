const express = require('express');
const koalaRouter = express.Router();
const pg = require('pg');

// DB CONNECTION
const config = {
  database: 'koala_db', 
  host: 'localhost', 
  port: 5432, 
  max: 10, 
  idleTimeoutMillis: 30000 
};

const pool = new pg.Pool(config);

console.log('GOT TO KOALA ROUTER JS FILE');

// GET

koalaRouter.get('/', (req, res) => {
    let sqlQuery = `
        SELECT * FROM "koala"
    `;
    pool.query(sqlQuery)
        .then((dbRes) => {
            console.log('dbRes.rows', dbRes.rows);
            res.send(dbRes.rows);
        })
        .catch((error) => {
            res.sendStatus(500);
        });
});

// POST

// PUT


// DELETE

module.exports = koalaRouter;