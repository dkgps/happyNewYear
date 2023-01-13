const MessageService = require('../services/message.service'); // UserService 사용

const getMessage = async (req, res, next) => {
	try
	{
		let messageId = req.query.messageId;
		const message = await MessageService.getMessage({messageId});
		return message;
	}
	catch (err)
	{
		res.status(400).json({ status : 400, message : err.message});
	}
}

const getMessageList = async (req, res, next) => {
	try
	{
		const savedMessage = await MessageService.getMessageList(req);
		return savedMessage;
	}
	catch (err)
	{
		res.status(400).json({ status : 400, message : err.message});
	}
}

const insertMessage = async (req, res, next) => {
	try
	{
		const result = await MessageService.insertMessage(req.body);
		res.send(result.toString());
	}
	catch (err)
	{
		res.status(400).json({ status : 400, message : err.message});
	}
}

const updateMessage = async (req, res, next) => {
	try
	{
		const result = await MessageService.updateMessage(req.body);
		res.send({ status : 200, result : result.toString() });
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
		const result = await MessageService.deleteMessage({messageId});
		res.send({ status : 200, result : result.toString(), message : "정상적으로 삭제되었습니다." });
	}
	catch (err)
	{
		res.status(400).json({ status : 400, message : err.message});
	}
}


module.exports = {
	getMessage,
	getMessageList,
	insertMessage,
	updateMessage,
	deleteMessage
}
