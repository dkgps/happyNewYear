const MessageService = require('../services/message.service'); // UserService 사용

const getAllMessages = async(req, res, next) => {
	try
	{
		let messageDto = req.params;
		const messageList = await MessageService.getAllMessages(messageDto);
		res.send(messageList);
	}
	catch (err)
	{
		res.status(400).json({ status : 400, message : err.message});
	}
}

const getMessage = async (req, res, next) => {
	try
	{
		const messageId = req.query.messageId;
		const savedMessage = await MessageService.getMessage({messageId});
		res.send(savedMessage);
	}
	catch (err)
	{
		res.status(400).json({ status : 400, message : err.message});
	}
}

const insertMessage = async (req, res, next) => {
	try
	{
		const savedMessage = await MessageService.insertMessage(req.body);
		res.send(savedMessage);
	}
	catch (err)
	{
		res.status(400).json({ status : 400, message : err.message});
	}
}

const deleteMessage = async (req, res, next) => {
	try
	{
		let messageId = req.params.messageId;
		await MessageService.deleteMessage({messageId});
		res.send({ status : 200, message : "정상적으로 삭제되었습니다." });
	}
	catch (err)
	{
		res.status(400).json({ status : 400, message : err.message});
	}
}


module.exports = {
	getAllMessages,
	getMessage,
	insertMessage,
	deleteMessage
}
