const express = require('express')
const indexRouter = require('./routes/index')
const chatRouter = require('./routes/chat')
const memberRouter = require('./routes/member')
const bodyParser = require('body-parser')
const nunjucks = require('nunjucks')
const {sequelize} = require('./models')
const webSocket = require('./socket')
const session = require('express-session')
const fileStore = require('session-file-store')(session) // session은 express-session임
const app = express()

app.use(express.urlencoded({extended : true})) //body 데이터 가져올 때

app.use(bodyParser.json()) 
app.use(session({
    httpOnly : true, // http 통신 시에만 허용
    secret : 'secretkey', // 암호화 키설정
    resave : false, // 세션에 수정사항이 없더라도 다시 저장 할 거니?
    cookie : { // 쿠키 설정해야 하는 내용이 있다면 추가하면 됨
        httpOnly : true
    },
    store : new fileStore()
}))

// force : false 기존 테이블은 건들지 않음
sequelize.sync({force : false})
.then(()=>{
    console.log("연결 설공 !")
})
.catch((err)=>{
    console.log(err)
})


app.set('views', __dirname+'/views')
app.set('view engine', 'html')

nunjucks.configure('views', {
    express : app,
    watch : true
})

//정적리소스 경로 지정(css,js...)
app.use(express.static(__dirname+'/public'))
// app.use('/s', sessionRouter) // localhost:8888/s/....
app.use('/', indexRouter)
app.use('/member', memberRouter)
app.use('/chat', chatRouter)

app.set('port', process.env.PORT || 8888)
const server = app.listen(app.get('port'), ()=>{
    console.log(app.get('port'),'번 포트에서 서버 연결 기다리는 중...');
})

webSocket(server, app)
