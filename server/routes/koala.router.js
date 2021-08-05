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
koalaRouter.post('/', (req, res) =>{
    console.log('looking at req.body', req.body.name);
    
    let sqlQuery = `
    INSERT INTO 
        "koala"("name", "gender", "age", "ready_to_transfer", "notes")
    VALUES
        ($1, $2, $3, $4, $5)

    `;
    let sqlParams = [
        req.body.name,   //$1
        req.body.gender, //$2
        req.body.age,    //$3
        req.body.ready,  //$4
        req.body.notes   //$5
    ]
    console.log('sqlQuery', sqlQuery);

    pool.query(sqlQuery, sqlParams)
        .then((dbRes) => {

            res.sendStatus(201); //Created
        })
        .catch((err) => {

            console.log('SQL failed', err);
            res.sendStatus(500);
            
        });
    
})

// PUT


// DELETE

module.exports = koalaRouter;