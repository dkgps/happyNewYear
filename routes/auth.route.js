var express = require('express');
var router = express.Router();
require('dotenv').config();
const UserService = require('../services/user.service'); // UserService 사용

router.get('/', async(req,res,next) => {
	try
	{
		if(req.session["uid"])
		{
			const user = await UserService.existedUser({uid : req.session["uid"]});
			let queryString = `?uid=${req.session["uid"]}`
			let encryptedString = btoa(encodeURIComponent(queryString)); // 쿼리 스트링 암호화
			res.redirect(`/message/${encryptedString}`);
		}
		else
		{
			res.render('index',{
				BASE_URL			 : process.env.BASE_URL,
				KAKAO_JAVASCRIPT_KEY : process.env.KAKAO_JAVASCRIPT_KEY,
			})
		}
	}
	catch (err)
	{
		console.log(err);
		res.status(400).render('error');
	}
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
		let uid = req.session.uid;
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
