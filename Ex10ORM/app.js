const express = require('express')
const {sequelize} = require('./models/index')
const indexRouter = require('./routes/index')
const bodyParser = require('body-parser')
const app = express()

app.use(express.urlencoded({extended : true})) //body 데잌터 가져올 때
//jSON 데이터를 받을 때 추가(npm i body-parser)
app.use(bodyParser.json())


//force : true(User라는 테이블이 이미 있을 때 삭제) / false(기존테이블 건들지 않음)
sequelize.sync({force : false})
.then(()=> console.log('DB 연결 성공!'))
.catch((err)=> console.log(err))


app.use('/', indexRouter)




app.set('port', process.env.PORT || 8888)

app.listen(app.get('port'), ()=>{
    console.log(app.get('port'), '번 포트에서 서버 연결 기다리는 중...');
})