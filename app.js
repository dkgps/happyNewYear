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
app.use('/static', express.static(__dirname + '/public'));


app.get("/indexSub", (req, res) => {
    res.sendFile(__dirname + "/indexSub.html");
});

app.get("/indexSubLink", (req, res) => {
    res.sendFile(__dirname + "/indexSubLink.html");
});

//==================================================================
//  Load the router module in the app
//==================================================================
// 페이지 로딩 함수
app.get("/", (req, res) => {
    res.redirect("/auth");
});

app.get("/kakaoCallback", (req, res) => {
    res.redirect("/auth/kakaoCallback");
});

app.get("/signUp", (req, res) => {
    res.redirect("/auth/signUp");
});

const authRoute = require('./routes/auth.route');
app.use('/auth', authRoute);

const userRoute = require("./routes/user.route")
app.use("/user", userRoute);

const messageRoute = require("./routes/message.route")
app.use("/message", messageRoute);

const indexRoute = require('./routes/index');
app.use('/', indexRoute);


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