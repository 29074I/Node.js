const socketIO = require('socket.io')

                //express에서 만든 server객체
module.exports = (server) =>{
    //express server관련된 것들을 socketIO와 연결하고
    //클라이언트가 접속한 경로 지정
    const io = socketIO(server, {path : '/socket.io'})

    //클라이언트가 접속하면(connection) 해당 클라이언트와 통신할 수 있는 소켓 객체 생성
    io.on('connection', (socket)=>{
        console.log('새로운 클라이언트 접속!', socket.id)
        //연결 해제
        socket.on('disconnect',()=>{
            console.log('클라이언트 접속 해제', socket.id)
        })
        //오류 발생
        socket.on('error', (error)=>{
            console.log(error);
        })
        //클라이언트 메세지 받을 때
        socket.on('reply', (data)=>{
            console.log(data) //data : 클라이언트가 보낸 메세지
        })
        //서버가 메세지 보낼 때(3초마다 메세지 보내기)
        socket.interval = setInterval(()=>{
            socket.emit('news', 'Hello Socket.io' ) //emit : 이벤트{키-벨류} 발생
        }, 3000)
    })
}