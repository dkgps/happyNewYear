const { user } = require('../models/index'); // ./models/index.js에서 설정한 연결된 모델들을 가져온다

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
    getAllUsers,
    getUser,
    insertUser,
    deleteUser
}