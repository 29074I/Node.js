const express = require('express')
const app = express()

app.get('/', (req,res)=>{
    // res.send('Hello Express!') // send는 일반 텍스트 응답
    // 응답은 무조건 한 번만!!!
    // dirname : 현재위치를 불러오는 것(Ex06Express 폴더 안)
    // dirname은 정적 리소스 위치 설정할 때도 많이 쓰임 (html, css, js, 이미지)
    res.sendFile(__dirname+'/Ex02.html') //html(파일)을 응답하고 싶으면 sendFile(경로)

})

// set() : 값 설정(저장)
// 기본적으로 사용하는 포트번호가 있다면 그 번호 쓰고 아니면 8888쓰겠다
app.set( 'port', process.env.port || 8888) 
app.listen(app.get('port'), ()=>{
    console.log(app.get('port'),'번 포트에서 서버 연결 기다리는 중...');
})