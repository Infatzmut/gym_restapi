const mysql = require('mysql');
//permite convertir callbacks a promesas
const {promisify} = require('util');
const {database} = require('./keys');
// connect to the database
const pool = mysql.createPool(database);

// obtain connection
pool.getConnection((err, connection) => {
    if(err) {
        if(err.code === 'PROTOCOL_CONNECTION_LOST'){
            console.error('DABASE CONNECTION WAS CLOSED')
        } else if(err.code === 'ER_CONN_COUNT_ERROR') {
            console.error('DATABASE HAS TO MANY CONNECTIONS')
        } 
        if (err.code === 'ECONNREFUSED') {
            console.error('DATABASE CONNECTION WAS REFUSED')
        }
    }
    if (connection) {
        connection.release();
    }
    console.log('DB is connected');
    return;
})
// Promisify Pool Querys
pool.query = promisify(pool.query);

module.exports = pool;