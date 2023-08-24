const http = require('http')
const fs = require('fs').promises
const url = require('url')
const qs = require('querystring')

const server = http.createServer(async(req,res)=>{
    //url 다루기 ==> url모듈 사용
    let reqUrl = req.url
    let pathname = url.parse(reqUrl, true).pathname

    // console.log(req.method);

    if(req.method === 'GET'){
        if(pathname === '/api/form'){
            const f = await fs.readFile('./Ex04join.html')
            res.writeHead(200, {'Content-type': 'text/html; charset=UTF-8'})
            res.write(f)
            res.end()
    
        }
           
    }else if(req.method === 'POST'){
        if(pathname === '/api/join'){
            let body = ''
            req.on('data', function(data){
                body += data
            })
            req.on('end', function(){
                let data = qs.parse(body)
                console.log(qs.parse(body));
                res.writeHead(200, {'Content-Type': 'text/html; charset=UTF-8'})
            let html = '<html>'
                html += '<body>'
                    html += '<h3> 아이디 : '+data.id+'<h3>'
                    if(data.pw === data.pwS){
                        html += '<h3>비밀번호가 일치합니다.</h3>'
                    }else{
                        html += '<h3>비밀번호가 일치하지 않습니다..</h3>'
                    }
                    // html += '<h3 비밀번호 : >'+data.pw+'<h3>'
                    html += '<h3> 성별 : '+data.gender+'<h3>'
                    html += '<h3 >혈액형 : '+data.bd+'<h3>'
                    html += '<h3 >생일 : '+data.birth+'<h3>'
                    html += '<h3 >취미 : '+data.hb+'<h3>'
                    html += '<h3 >좋아하는 색깔 : '+data.fc+'<h3>'
                    html += '<h3 >남기는 말 : '+data.write+'<h3>'
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