// 환경변수 불러오기
const dotenv = require('dotenv');
dotenv.config();


// config 객체 생성 후 export
const config = {
    dev : {
        host : 'localhost',
        user : 'root',
        password : '1234',
        database : 'test'
    },
    prod : {
        host : process.env.MYSQL_HOST,
        port : process.env.MYSQL_PORT,
        user : process.env.MYSQL_USER,
        password : process.env.MYSQL_PASSWORD,
        database : process.env.MYSQL_DB
    }
}

module.exports = config