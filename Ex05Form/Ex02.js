const { readFile } = require('fs')
const http = require('http')
const fs = require('fs').promises
const url = require('url')

const server = http.createServer(async(req,res)=>{

    let reqUrl = req.url
    let pathname = url.parse(reqUrl, true).pathname

    if(pathname === '/api/form'){
        const f = await fs.readFile('./Ex02.html')
        res.writeHead(200, {'Content-Type': 'text/html; charset=UTF-8'})
        res.write(f)
        res.end()
    }else if(pathname === '/api/ope'){
        let queryData = url.parse(reqUrl, true).query

        res.writeHead(200, {'Content-Type': 'text/html; charset=UTF-8'})

        let nNum1 = parseInt(queryData.num1)
        let nNum2 = parseInt(queryData.num2)
        let ope = queryData.ope
        let html = '<html>'
            html += '<body>'
                if(ope ==='+'){
                html += '<span>'+queryData.num1+'+'+queryData.num2+'='+(nNum1+nNum2)+'</span>'
                }else if(ope === '-'){
                    html += '<span>'+queryData.num1+'-'+queryData.num2+'='+(nNum1-nNum2)+'</span>'
                }else if(ope === '*'){
                    html += '<span>'+queryData.num1+'*'+queryData.num2+'='+(nNum1*nNum2)+'</span>'
                }else{
                    html += '<span>'+queryData.num1+'/'+queryData.num2+'='+(nNum1/nNum2)+'</span>'
                }
        // html += '<span>+</span>'
        // html += '<span>'+queryData.num2+'</span>'
        // html += '<span>=</span>'
        // html += '<span>'+(nNum1+nNum2)+'</span>'
            html += '</body>'
        html += '</html>'

        res.write(html)
        res.end()

    }

})
server.listen(8888)
server.on('listening',()=>{
        console.log('8888포트에서 서버연결 기다리는 중...');
})