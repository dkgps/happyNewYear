const express = require("express")
const router = express.Router()
const MessageController = require("../controllers/message.controller")

// 특정 메시지 정보 가져오기(req.query.messageId)
router.get("/", async(req,res) => {
    try
    {
        const specificMessage = await MessageController.getMessage(req);
        res.send({
            message : specificMessage
        });
    }
    catch(err)
    {
        res.status(400).render('error');
    }
})

// 특정 회원의 모든 메시지 가져오기
router.get("/:encryptedQueryString", async(req,res) => {
    try
    {
        const result =  await MessageController.getMessageList(req);
        if(result.inProgress)
        {
            res.redirect("/auth/signUp");
        }
        else
        {
            res.render("message",{
                messageList : result.messageList,
                total       : result.total,
                owner       : result.owner,
                disclosureStatus : result.disclosureStatus,
                // 페이징
                currentPage : result.page,
                pageSize    : result.perPage,
                totalPage   : result.totalPage
            });
        }
    }
    catch(err)
    {
        res.status(400).render('error');
    }
    
})

// 메시지 등록
router.post("/", MessageController.insertMessage)

// 메시지 삭제
router.delete("/:messageId", MessageController.deleteMessage)

module.exports = router