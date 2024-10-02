const mysql = require("mysql2/promise");

// const db = mysql.createPool(process.env.CONNECTION_STRING);
const db = mysql.createPool({
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PWD,
    host: process.env.MYSQL_HOST,
    port: process.env.MYSQL_PORT,
    database: process.env.MYSQL_DB,

    //Configuração das Conexões:
    multipleStatements: true,

    //Configuração da Pool:
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

module.exports = db;