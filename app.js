const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const app = express();

//==================================================================
//  request body parsing
//==================================================================
app.use(bodyParser.urlencoded({extended:true})) // application/x-www-form-urlencoded에서 파싱
app.use(bodyParser.json());

//==================================================================
//  Serving static files
//==================================================================
app.use('/', express.static(__dirname + '/public'));

// 페이지 로딩 함수
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

//==================================================================
//  Load the router module in the app
//==================================================================
const userRoute = require("./routes/user.route")
app.use("/user", userRoute);

const messageRoute = require("./routes/message.route")
app.use("/message", messageRoute);


//==================================================================
//  템플릿 엔진 설정
//==================================================================
app.set("view engine", "ejs");

//==================================================================
//  포트 설정
//==================================================================
app.listen(3000, function(){
    console.log("server running");
});