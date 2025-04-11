// const mysql = require('mysql2/promise');
import mysql from 'mysql2/promise'

// Create a connection
const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'inter_production',
});

export default db;