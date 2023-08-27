const express = require('express')
const Chat = require('../models/chat')
const router = express.Router()

router.get('/:roomid', async(req,res,next)=>{
    console.log(req.params.roomid)

    try{
        const chats = await Chat.findAll({
            where : {roomid : req.params.roomid}
        })
        
    res.render('chat', {roomid : req.params.roomid, 
        userid : req.session.member.id, chats : chats})

    }catch(err){
        next(err)
    }
})

router.post('/:roomid/insert', async(req,res,next)=>{

    let roomid =req.params.roomid
    let chat = req.body.chat
    let userid = req.session.member.id

    try{
        //DB에 저장 -> 다른 클라이언트 화면엔 보이지 않음
        const chats = await Chat.create({ 
            roomid : roomid,
            chat : chat,
            userid : userid
        })

        //socket을 사용해서 채팅을 입력한 클라이언트와 
        //같은 룸에 있는 모든 클라이언트에게 대화내용 보이게(실시간으로)
        req.app.get('io').of('/chat').to(roomid).emit('chat', {userid:userid, chat:chat})
        // res.send('OK')

    }catch(err){
        next(err)
    }finally{
        res.send('OK')
    }
})
module.exports = router