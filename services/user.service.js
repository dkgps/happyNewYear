const { user } = require('../models/index'); // ./models/index.js에서 설정한 연결된 모델들을 가져온다
const axios = require('axios');
const kakaoLogin = async (req, res, next) => {
	try
	{
		const { accessToken } = req;
		// 카카오 회원 정보 가져오기
		let kakaoInfo = await axios({
            method:'get',
            url:'https://kapi.kakao.com/v2/user/me',
            headers:{
                Authorization: `Bearer ${accessToken}`
            }
        })

		let userDto = {};
		userDto.userEmail = kakaoInfo.data.kakao_account.email; // 이메일
		userDto.socialKey = kakaoInfo.data.id;                  // 소셜키
		userDto.social	  = 'kakao'								// 소셜 : 카카오

		// 회원 존재 여부 확인
		const kakaoUser = await user.findOne({
			where: { 
				social :  userDto.social,
				socialKey : userDto.socialKey
			}
		});
		
		// 회원이 있으면 로그인
		if(kakaoUser)
		{
			return { signUp : false }
		}
		// 없으면 회원 가입
		{
			await user.create(userDto);
			return { signUp : true }
		}
		
	}
	catch (err)
	{
		console.error(err);
        throw Error(`ERROR WHILE KAKAO LOGIN - ${err}`);
	}
	
}

// 전체 회원 리스트
const getAllUsers = async (req, res, next) => {
	try
	{
		const userList = await user.findAll();
		return userList;
	}
	catch (err)
	{
		console.error(err);
        throw Error(`ERROR WHILE GET ALL USERS - ${err}`);
	}
}

// 특정 회원 정보 가져오기 (find by uid)
const getUser = async (req, res, next) => {
	try
	{
        let uid = req.uid;
		const specificUser = await user.findOne({
			where: { uid }
		});
		return specificUser;
	}
	catch (err)
	{
		console.error(err);
		throw Error(`ERROR WHILE GET SPECIFIC USER - ${err}`);
	}
}

// 회원 가입
const insertUser = async (userDto, res, next) => {
	try
	{
        const savedUser = await user.create(userDto);
		return savedUser;
	}
	catch (err)
	{
		console.error(err);
		throw Error(`ERROR WHILE INSERT USER - ${err}`);
	}
}

// 회원 삭제
const deleteUser = async (req, res, next) => {
	try
	{
        let { uid } = req;
        const savedUser = await user.destroy({
            where : { uid : uid }
        });
		return savedUser;
	}
	catch (err)
	{
		console.error(err);
		throw Error(`ERROR WHILE DELETE USER - ${err}`);
	}
}

module.exports = {
	kakaoLogin,
    getAllUsers,
    getUser,
    insertUser,
    deleteUser
}