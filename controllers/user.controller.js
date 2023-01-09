const User = require('../models/user');
const UserService = require('../services/user.service'); // UserService 사용

const kakaoLogin = async(req,res,next) => {
	try
	{
		const kakaoLogin = await UserService.kakaoLogin(req.body);
		res.send({ status: 200, signUp : kakaoLogin.signUp, uid : kakaoLogin.uid, token });
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

const insertUser = async (req, res, next) => {
	try
	{
		const savedUser = await UserService.insertUser(req.body);
		res.send(savedUser);
	}
	catch (err)
	{
		res.status(400).json({ status : 400, message : err.message});
	}
}

const updateUser = async (req, res, next) => {
	try
	{
		const result = await UserService.updateUser(req.body);
		res.send({ status : 200, result : result.toString() });
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
	getAllUsers,
	getUser,
	insertUser,
	updateUser,
	deleteUser
}
