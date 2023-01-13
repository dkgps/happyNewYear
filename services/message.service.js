const { message } = require('../models/index'); // ./models/index.js에서 설정한 연결된 모델들을 가져온다
require('dotenv').config(); // env 사용

// 전체 메시지 리스트
const getAllMessages = async (req, res, next) => {
	try
	{
		let uid = req.uid ? req.uid : 0;
		let page = req.page ? req.page : 0;
		let perPage = req.perPage ? req.perPage : 6;
		const messageList = await message.findAll({ raw: true, nest:true,
			limit : perPage,
			offset: page*perPage,
			where : 
			{
				uid : uid,
				deleteYn : false
			},
			order : 
			[
				['messageId','ASC']
			]
		});
		return messageList;
	}
	catch (err)
	{
		return err;
	}
}

const getMessageList = async (req, res, next) => {
	try
	{
        let encrypted = req.encrypted;
		let decrypted = atob(encrypted);
		let uid = decrypted.indexOf("=") != -1 ? decrypted.split("=")[1] : 0;
		const messageList = await message.findAll({ raw: true, nest:true,
			where : 
			{
				uid : uid,
				deleteYn : false
			},
			order : 
			[
				['messageId','ASC']
			]
		});
		return messageList;
	}
	catch (err)
	{
		console.error(err);
		throw Error(`ERROR WHILE GET MESSAGELIST - ${err}`);
	}
}

// 특정 메시지 정보 가져오기 (find by messageId)
const getMessage = async (req, res, next) => {
	try
	{
        let messageId = req.messageId;
		const specificMessage = await message.findOne({
			where: { 
				messageId,
				deleteYn : false
			}
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
        await message.create(messageDto);
		return 1;
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
        await message.update({deleteYn : true}, {
            where : { messageId }
        });
		return 1;
	}
	catch (err)
	{
		console.error(err);
		throw Error(`ERROR WHILE DELETE MESSAGE - ${err}`);
	}
}


module.exports = {
    getAllMessages,
	getMessageList,
	getMessage,
	insertMessage,
	deleteMessage
}