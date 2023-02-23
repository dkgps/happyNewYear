const express = require("express")
const router = express.Router()
const userController = require("../controllers/user.controller")

// 카카오 로그인 / 회원가입
router.post("/kakaoLogin", userController.kakaoLogin);

// 구글 로그인 / 회원가입
router.post("/googleLogin", userController.googleLogin);

// 토큰 검증
router.post("/verifyToken", userController.verifyToken);

// 전체 회원 리스트 가져오기
router.get("/", userController.getAllUsers)

// 특정 회원 정보 가져오기
router.get("/:uid", userController.getUser)

// // 회원 등록
// router.post("/", userController.insertUser)

// 회원 수정 (회원가입)
router.put("/", userController.updateUser);

// 회원 삭제
router.delete("/:uid", userController.deleteUser)

module.exports = router