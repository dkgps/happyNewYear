const express = require("express")
const router = express.Router()
const MessageController = require("../controllers/message.controller")

// 특정 유저의 메시지 리스트
router.get("/", async(req,res) => {
    const messageList = await MessageController.getAllMessages(req);
    res.render("message", {messageList});
})

// 특정 메시지 정보 가져오기(req.query.messageId)
router.get("/:messageId", MessageController.getMessage)

// 메시지 등록
router.post("/", MessageController.insertMessage)

// 메시지 수정
router.put("/", MessageController.updateMessage);

// 메시지 삭제
router.delete("/:messageId", MessageController.deleteMessage)

module.exports = router