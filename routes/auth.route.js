var express = require('express');
var router = express.Router();
require('dotenv').config();
const UserService = require('../services/user.service'); // UserService 사용

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

router.get("/signUp", async (req, res) => {
	try
	{
		let uid = req.query.uid;
		await UserService.existedUser({uid});
		
		res.render('signUp',{
			BASE_URL : process.env.BASE_URL,
		});
	}
	catch(err)
	{
		res.status(400).render('error');
	}
	
});

module.exports = router;
