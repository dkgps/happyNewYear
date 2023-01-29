const { message } = require('../models/index'); // ./models/index.js에서 설정한 연결된 모델들을 가져온다
const { user } = require('../models/index'); // ./models/index.js에서 설정한 연결된 모델들을 가져온다
require('dotenv').config(); // env 사용

const getMessageList = async (req, res, next) => {
	try
	{
		// param값 복호화
		const encrypted = req.params.encryptedQueryString;
		const decrypted = decodeURIComponent(atob(encrypted));
		const uid = decrypted.split("uid=")[1];

		if(!uid)
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

		let total = await message.count({
			where : {uid}
		});

		// 전체 페이지 수 
		if (!total) total = 0;
		let totalPage = Math.ceil(total /  perPage);


		// user 정보
		const specificUser = await user.findOne({
			where: { uid }
		});

		const sessionUid = req.session["uid"] ? req.session.uid : 0;
		
		let owner = false;
		if(specificUser.uid != sessionUid) // 본인 메시지가 아닌 경우
		{
			// 가입 진행중일 때
			if(!specificUser.nickname)
			{
				throw Error();
			}

			let disclosureStatus = specificUser.disclosureStatus; // 전체공개 설정
			for( let i = 0 ; i < messageList.length; i++ )
			{
				if( !disclosureStatus || !messageList[i].exposure )
				{
					messageList[i].message = "🔐";
				}
			}
		}
		else	//본인 메시지인 경우
		{
			owner = true;
			// 가입 진행중일 때
			if(!specificUser.nickname)
			{
				return {inProgress : true}
			}
		}

		let result = { 
			messageList, total, 
			uid, nickname: specificUser.nickname,
			page, perPage, totalPage,
			owner
		};
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