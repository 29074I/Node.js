const express = require('express')
const app = express()

// post 방식에서 사용하는 것으로
// post 요청 데이터는 body에 있음
// 따라서 body파싱
app.use(express.urlencoded({extended:true}))


app.get('/',(req,res)=>{
    res.sendFile(__dirname+'/Ex04form.html')
})

app.get('/get', (req,res)=>{
    // 방법 1.QueryString : ?id=test1&pw=test2
   
    console.log(req.query.id);
    console.log(req.query.pw);
    res.send('get  완료')
})

// a 태그
app.get('/get/:id/:pw', (req,res)=>{
    // 방법 2.localhost:8888/login/test1/test2
    console.log(req.params.id);
    console.log(req.params.pw);
    res.send('요청 완료')
})

// post 
app.post('/post', (req,res)=>{
    console.log(req.body.id);
    console.log(req.body.pw);
    res.send('post 완료')
})

app.set('port' , process.env.PORT ||8888)

app.listen(app.get('port'),()=>{
    console.log(app.get('port'),'번 포트에서 서버 연결 기다리는 중...');
})