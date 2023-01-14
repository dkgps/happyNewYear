var express = require('express');
var router = express.Router();
require('dotenv').config();

// 에러 페이지 출력
router.use((req, res, next) => {
    res.status(400).render('error');
});

module.exports = router;
