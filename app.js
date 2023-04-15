const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const app = express();
const session = require("express-session");
const dotenv = require("dotenv");
const aes256 = require("aes256");

//==================================================================
//  request body parsing
//==================================================================
app.use(bodyParser.urlencoded({extended:true})) // application/x-www-form-urlencoded에서 파싱
app.use(bodyParser.json());

//==================================================================
//  Middleware
//==================================================================
dotenv.config();
app.use(session({
    secret : process.env.SESSION_SECRET,
    resave : false,
    saveUninitialized : false,
    cookie : {
        maxAge : 3 * 24 * 60 * 60 * 1000,
        httpOnly : true, // 자바스크립트로 쿠키 조회 안되도록 (true)
        secure : false, // https환경에서만 주고받기
    }
}))

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

app.get("/decrypt", (req, res) => {
	try
	{
		let encryptedText = process.env.encryptedText;
		res.render('decrypt',{
			encryptedText : encryptedText,
		});
	}
	catch(err)
	{
		res.status(400).render('error');
	}
});

app.post("/decrypt", (req, res) => {
	try
	{
		const encryptedText = process.env.encryptedText;
        const key = req.body.key;

        if(key === process.env.key)
        {
            const decryptedText = aes256.decrypt(key, encryptedText);
            res.send(decryptedText);
        }
        else
        {
            res.send('유효하지 않은 key 입니다.');
        }
	}
	catch(err)
	{
		console.log(err);
	}
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