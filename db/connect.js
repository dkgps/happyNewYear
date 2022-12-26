
// dotenv 라이브러리를 통해 .env 파일 활용
const dotenv = require('dotenv');
dotenv.config();

const config = require('../config/config')

// mysql 라이브러리
const mysql = require('mysql');

// Node.js와 MySQL을 연결
const con = mysql.createPool(
    config[process.env.NODE_ENV || 'dev']
);

con.getConnection((err) => {
    if(err)
    {
        throw err;
    }
})

module.exports = con;
