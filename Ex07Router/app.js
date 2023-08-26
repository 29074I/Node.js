const express = require('express')
const userRouter = require('./routes/user') //user.js 모듈
const boardRouter = require('./routes/board')
const app = express()

// user요청 시
app.use( '/user', userRouter) // localhost:8888/user/....

// board 요청 시
app.use('/board', boardRouter) // localhost:8888/board/....


app.set('port', process.env.PORT || 8888)
app.listen(app.get('port'), ()=>{
    console.log(app.get('port'),'번 포트에서 서버 연결 기다리는 중...');
})