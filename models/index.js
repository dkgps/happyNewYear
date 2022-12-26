const initModels = require('./init-models'); // init-models.js에서 메서드를 가져옴
const { Sequelize } = require('sequelize');

require('dotenv').config();

// config/config.json 파일에 있는 설정값 가져오기
const env = process.env.NODE_ENV || 'development';
const config = require("../config/config.json")[env] // 해당 키의 객체값을 불러옴
 
// new Sequelize를 통해 MySQL 연결 객체 생성
const sequelize = new Sequelize(config.database, config.username, config.password, config);
 
// 모델과 테이블간의 관계가 맺어짐.
const models = initModels(sequelize);
 
module.exports = models;