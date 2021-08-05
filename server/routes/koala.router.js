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

// POST

// PUT


// DELETE

module.exports = koalaRouter;