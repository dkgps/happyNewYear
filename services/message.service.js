const { message } = require('../models/index'); // ./models/index.js에서 설정한 연결된 모델들을 가져온다
require('dotenv').config(); // env 사용

const getMessageList = async (req, res, next) => {
	try
	{
		// param값 복호화
		const encrypted = req.params.encryptedQueryString;
		const decrypted = decodeURIComponent(atob(encrypted));
		const uid = decrypted.split("uid=")[1].split("&")[0];
		const nickname = decrypted.split("nickname=")[1];

		if(!uid || !nickname)
		{
			throw new Error();
		}
		
		// query값으로 넘어온 페이징 정보
		let page 	= ( req.query.page ? parseInt(req.query.page) : 0 );
		let perPage = ( req.query.perPage ? parseInt(req.query.perPage) : 6 );

		const messageList = await message.findAll({ raw: true, nest:true,
			limit : perPage,
			offset: page * perPage,
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

		const total = await message.count({
			where : {uid}
		});
		let result = { messageList, total, uid, nickname };
		return result;
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
	getMessageList,
	getMessage,
	insertMessage,
	deleteMessage
}