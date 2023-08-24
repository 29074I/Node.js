const http = require('http')

http.createServer((req, res)=>{
    // 요청 : 클라이언트에서 localhost:8888로 요청이 들어오면 !
    // 응답 : html문서를 만들어서 응답
    // (응답 데이터 형식 지정, 인코딩 방식)

    // HTTP 상태코드란 ? 요청과 응답이 정상적(200)으로 됐는 지 또는 요청이 잘못왔다(404)
    // 라든지,서버로직 오류(500)..등을 숫자로 표기

    res.writeHead(200, {'Content-Type' : 'text/html; charset=UTF-8'})

    let data = '<html>'
        data += '<body>'
            data += '<h1>Hello Node!</h1>'
        data += '</body>'
    data += '</html>'

    res.write(data)
    res.end()// 응답 완료
    
}).listen(8888, ()=>{
    console.log('8888번 포트에서 서버연결 기다리는 중');
})