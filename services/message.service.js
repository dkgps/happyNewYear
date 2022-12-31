const { message } = require('../models/index'); // ./models/index.js에서 설정한 연결된 모델들을 가져온다

// 전체 메시지 리스트
const getAllMessages = async (req, res, next) => {
	try
	{
		let uid = req.uid;
		const messageList = await message.findAll({
			where : 
			{
				uid : uid
			},
			order : 
			[
				['orderNum','ASC']
			]
		});
		return messageList;
	}
	catch (err)
	{
		console.error(err);
        throw Error(`ERROR WHILE GET ALL MESSAGES - ${err}`);
	}
}

// 특정 메시지 정보 가져오기 (find by messageId)
const getMessage = async (req, res, next) => {
	try
	{
        let messageId = req.messageId;
		const specificMessage = await message.findOne({
			where: { messageId }
		});
		return specificMessage;
	}
	catch (err)
	{
		console.error(err);
		throw Error(`ERROR WHILE GET SPECIFIC MESSAGE - ${err}`);
	}
}

// 메시지 등록
const insertMessage = async (messageDto, res, next) => {
	try
	{
        const savedMessage = await message.create(messageDto);
		return savedMessage;
	}
	catch (err)
	{
		console.error(err);
		throw Error(`ERROR WHILE INSERT MESSAGE - ${err}`);
	}
}

// 메시지 삭제
const deleteMessage = async (req, res, next) => {
	try
	{
        let { messageId } = req;
        const savedMessage = await message.destroy({
            where : { messageId }
        });
		return savedMessage;
	}
	catch (err)
	{
		console.error(err);
		throw Error(`ERROR WHILE DELETE MESSAGE - ${err}`);
	}
}


module.exports = {
    getAllMessages,
	getMessage,
	insertMessage,
	deleteMessage
}