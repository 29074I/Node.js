const express = require('express')

const app = express() //app 생성

// get요청 받고 응답해주기
// localhost:8888/
app.get('/', (req, res, next)=>{
    res.send('Hello Express!') // 텍스트 응답
    next()
})

const myLogger = function(req, res){ // 로그출력 미들웨어
    console.log('LOGGED');
}
app.use(myLogger) // app에 만든 미들웨어 붙여주기






app.listen(8888, ()=>{
    console.log('8888포트에서 서버 연결 기다리는 중...');
})