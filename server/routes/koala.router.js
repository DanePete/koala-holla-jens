const express = require('express');
const koalaRouter = express.Router();
const pg = require('pg');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
// app.use(express.static('server/public'));

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

/**
 * Router PUT
 * Sends a put request to the server to update the ready_to_transfer cell for a specific record
 */
 koalaRouter.put('/:id', (req, res) => {
  // console.log('params', req.params);
  console.log('ready param', req.body.transferData);
  // let ready = req.params.ready;
  // console.log('ready variable check', ready);
  let sqlQuery = `
    UPDATE koala SET "ready_to_transfer" =$1 WHERE id = $2;
  `;

  let sqlParams = [
    req.body.transferData, // $1
    req.params.id  // $2
  ]

  pool.query(sqlQuery, sqlParams)
    .then((dbRes) => {
        res.send(201);
    })
    .catch((err) => {
        console.log("post error", err);
        res.sendStatus(500);
    });
});

// PUT
koalaRouter.delete('/:id', (req, res) => {
    console.log('got them to delete', req.params.id);
    let idToDelete = req.params.id
    let sqlQuery = 'DELETE FROM "koala" WHERE id=$1;'
    let sqlParams = [idToDelete]
    pool.query(sqlQuery,sqlParams )
        .then((dbRes) => {
            console.log('It works');
            
            res.sendStatus(200)
        }).catch((err) => {
            console.log('DELETE error', err);
            res.sendStatus(500)
            
        })

})

// DELETE

module.exports = koalaRouter;