
const http = require('http')
const fs = require('fs').promises
const url = require('url')
const qs = require('querystring')

const server = http.createServer(async(req,res)=>{
    //url 다루기 ==> url모듈 사용
    let reqUrl = req.url
    let pathname = url.parse(reqUrl, true).pathname

    console.log(req.method);

    if(req.method === 'GET'){
        if(pathname === '/api/form'){
            const f = await fs.readFile('./Ex03getpost.html')
            res.writeHead(200, {'Content-type': 'text/html; charset=UTF-8'})
            res.write(f)
            res.end()
    
        }else if(pathname === '/api/login'){
            let queryData = url.parse(reqUrl, true).query
    
            res.writeHead(200, {'Content-Type': 'text/html; charset=UTF-8'})
    
            let html = '<html>'
                html += '<body>'
                    html += '<h3>'+queryData.id+'<h3>'
                    html += '<h3>'+queryData.pw+'<h3>'
                html += '</body>'
            html += '</html>'
            res.write(html)
            res.end()
           
        }
    }else if(req.method === 'POST'){
        if(pathname === '/api/login'){
            // post방식으로 요청을 하면 패킷의 바디부분에 실어져서 오는데
            // 그 패킷이 하나일수도 여러 개일 수도 있음
            // 따라서 body라는 변수에 넘어오는 data를 붙여줄 것
            let body = ''

            // data 이벤트(data가 들어오는 것)가 발생하면 함수 호출
            // 따라서 이 함수 안에선 들어오는 데이터들을 하나로 묶어주는 작업을 할 것
            req.on('data', function(data){
                body += data
            })
            // 데이터가 더이상 들어오지 않을 때 함수 호출
            req.on('end', function(){
                let data = qs.parse(body)
                res.writeHead(200, {'Content-Type': 'text/html; charset=UTF-8'})
            let html = '<html>'
                html += '<body>'
                    html += '<h3>'+data.id+'<h3>'
                    html += '<h3>'+data.pw+'<h3>'
                html += '</body>'
            html += '</html>'

            res.write(html)
            res.end()
            })
            
        }
    }

    
})
server.listen(8888)
server.on('listening',()=>{
    console.log('8888번 포트에서 서버연결 기다리는 중...');
})