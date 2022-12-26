const express = require("express"); // express 모듈 셋팅
const ejs = require("ejs"); // 페이지 로딩을 위해 필수
const app = express();

// view 엔진을 ejs를 쓰겠다는 설정
app.set("view engine", "ejs");

// 페이지 로딩 함수
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

// 서버 띄울때 포트 정보 셋팅 및 처음 실행 시 필요한 기능 수행 가능
app.listen(3000, function(){
    console.log("server running");
});