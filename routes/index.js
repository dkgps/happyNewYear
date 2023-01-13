var express = require('express');
var router = express.Router();
require('dotenv').config();

router.get('/', function(req,res,next) {
	res.render('index',{
		BASE_URL			 : process.env.BASE_URL,
		KAKAO_JAVASCRIPT_KEY : process.env.KAKAO_JAVASCRIPT_KEY,
	})
})

router.get('/kakaoCallback', function(req,res,next) {
	res.render('kakaoCallback',{
		BASE_URL		   : process.env.BASE_URL,
		KAKAO_REST_API_KEY : process.env.KAKAO_REST_API_KEY,
	})
})

router.use((req, res, next) => {
    res.status(400).render('error');
});

module.exports = router;
