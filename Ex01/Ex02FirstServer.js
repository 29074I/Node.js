//서버를 구축하기 위해서 http모듈울 사용할 것
//http 모듈
const http = require('http')

//서버가 생성되고 나면 요청,응답 객체가 만들어짐 req(요청) , res(응답)
http.createServer((req,res)=>{
    //요청,응답에 대한 로직 작성
}).listen(8888 , ()=>{
    console.log('8888 포트에서 서버연결 기다리는 중...');
}) //listen 은 port번호 지정
