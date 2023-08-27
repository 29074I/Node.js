const express = require('express')
// const nunjucks = require('nunjucks')
const indexRouter = require('./routes/index') 
const app = express()


// //html 문서 경로
// app.set('views', __dirname+'/views') 
// //사용할 View의 형식 지정
// app.set('view engine', 'html') 

// //numjucks 설정
// nunjucks.configure('views', {
//     express : app, // app(express) 객체 연결
//     watch : true // html 파일에 제대로 연결이 되면 템플릿 엔진을 렌더링(화면에 보여주겠다)
// })

//body parsing
app.use(express.urlencoded({extended : true})) //body데이터 다룰 수 있음


app.use('/',indexRouter) // localhost:8888/...



app.set('port', process.env.PORT || 8888)
app.listen(app.get('port'), ()=>{
    console.log(app.get('port'),"번 포트에서 서버 연결 기다리는 중...")
})