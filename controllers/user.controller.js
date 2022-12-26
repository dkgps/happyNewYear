const User = require('../models/user');
const UserService = require('../services/user.service'); // UserService 사용

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
		console.log(req.body);
		// const savedUser = await UserService.insertUser();
		// res.send(savedUser);
	}
	catch (err)
	{
		res.status(400).json({ status : 400, message : err.message});
	}
}

const deleteUser = (req, res, next) => {
	res.json({ "message" : "DELETE user to the test homepage" })
}


module.exports = {
	getAllUsers,
	getUser,
	insertUser,
	deleteUser
}
