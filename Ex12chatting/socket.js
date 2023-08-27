const socketIO = require('socket.io')

                // express server
module.exports = (server, app)=>{
    // socketIO 객체 생성
    const io = socketIO(server, {path : '/socket.io'})

    app.set('io', io) //io를 라우터에서 사용할 수 있게 해줌

    //현재는 채팅만 하면 됨 -> /chat
    //그러나 실시간 알림도 띄워주고 싶으면 둘은 다른 기능으로 분리해주는 게 좋음-> /alarm
    // 즉 라우팅의 개념과 같은 네임스페이스를 만듦
    const chat = io.of('/chat') //채팅관련 처리 네임스페이스

    chat.on('connection', (socket)=>{
        console.log('chat 네임스페이스 접속 성공');

        //room설정 -> 방이름(roomid를 활용하도록) ->클라이언트 요청경로(req활용하면 알 수 있음)
        const ref = socket.request.headers.referer
        const roomId = ref.split('/')[ref.split('/').length-1] // '/'를 기준으로 자름
        console.log(roomId)

        socket.join(roomId)

        socket.on('disconnect', ()=>{
            console.log('chat 네임스페이스에서 접속 해제')
        })

        socket.on('chat', (data)=>{
            // data : 채팅관련 데이터
            socket.to(roomid).emit(data)
        })
    })
}
