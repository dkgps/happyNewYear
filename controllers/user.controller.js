const User = require('../models/user');
const UserService = require('../services/user.service'); // UserService 사용

const kakaoLogin = async(req,res,next) => {
	try
	{
		const kakaoLogin = await UserService.kakaoLogin(req);
		res.send(kakaoLogin);
	}
	catch (err)
	{
		res.status(400).json({ status : 400, message : err.message});
	}
}

const verifyToken = async(req,res,next) => {
	try
	{
		const result = await UserService.verifyToken(req.body);
		res.send(result);
	}
	catch (err)
	{
		res.status(400).json({ status : 400, message : err.message});
	}
}

const getAllUsers = async(req, res, next) => {
	try
	{
		const userList = await UserService.getAllUsers();
		res.send(userList);
	}
	catch (err)
	{
		res.status(400).json({ status : 400, message : err.message});
	}
}

const getUser = async (req, res, next) => {
	try
	{
		const uid = req.params.uid;
		const savedUser = await UserService.getUser({uid});
		res.send(savedUser);
	}
	catch (err)
	{
		res.status(400).json({ status : 400, message : err.message});
	}
}

// const insertUser = async (req, res, next) => {
// 	try
// 	{
// 		const savedUser = await UserService.insertUser(req.body);

// 		res.send(savedUser);
// 	}
// 	catch (err)
// 	{
// 		res.status(400).json({ status : 400, message : err.message});
// 	}
// }

const updateUser = async (req, res, next) => {
	try
	{
		// session에서 uid를 가져온 후 body에 넣기
		let uid = req.session.uid;
		req.body.uid = uid;
		const user = await UserService.updateUser(req.body);

		// session에서 회원가입 진행중 false로 변경
		req.session.inProgress = "F";
		res.send(user);
	}
	catch (err)
	{
		res.status(400).json({ status : 400, message : err.message});
	}
}

const deleteUser = async (req, res, next) => {
	try
	{
		let uid = req.params.uid;
		const result = await UserService.deleteUser({uid});
		res.send({ status : 200, result : result.toString(), message : "회원 탈퇴가 완료되었습니다." });
	}
	catch (err)
	{
		res.status(400).json({ status : 400, message : err.message});
	}
}


module.exports = {
	kakaoLogin,
	verifyToken,
	getAllUsers,
	getUser,
	updateUser,
	deleteUser
}
