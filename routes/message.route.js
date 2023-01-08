const express = require("express")
const router = express.Router()
const MessageController = require("../controllers/message.controller")

// 특정 유저에게 쓴 전체 메시지 가져오기
router.get("/", MessageController.getAllMessages)

// 특정 메시지 정보 가져오기(req.query.messageId)
router.get("/:messageId", MessageController.getMessage)

// 메시지 등록
router.post("/", MessageController.insertMessage)

// 메시지 수정
router.put("/", MessageController.updateMessage);

// 메시지 삭제
router.delete("/:messageId", MessageController.deleteMessage)

module.exports = router