const { user } = require('../models/index'); // ./models/index.js에서 설정한 연결된 모델들을 가져온다

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

const getUser = async (req, res, next) => {
	try
	{
        let uid = req.uid;
		const savedUser = await user.findOne({
			where: { uid }
		});
		return savedUser;
	}
	catch (err)
	{
		console.error(err);
		throw Error(`ERROR WHILE GET SPECIFIC USER - ${err}`);
	}
}

const insertUser = async (req, res, next) => {
	try
	{
        console.log("Req: ",req);
	}
	catch (err)
	{
		console.error(err);
		throw Error(`ERROR WHILE INSERT USER - ${err}`);
	}
}
const deleteUser = (req, res, next) => {
	return({ "message" : "DELETE user to the test homepage" })
}

module.exports = {
    getAllUsers,
    getUser,
    insertUser,
    deleteUser
}