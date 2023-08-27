const express = require('express')
const router = express.Router()

// 세션 생성
router.get('/setsession', (req,res)=>{
    // 클라이언트에 저장된 고유아이디를 서버에 주고(req.session) 
    // nickname이라는 키값을 가진세션 생성 value는 newnick
    req.session.nickname = 'newnick' 
    req.session.lunch = '닭가슴살'

    res.send('세션 생성')
})

// 세션 확인
router.get('/getsession', (req,res)=>{
    res.send(req.session.nickname +","+req.session.lunch)
})

// 세션 삭제
router.get('/deletesessions', (req,res)=>{
    req.session.destroy() // 저장된 세션 전부 삭제
    res.send('세션 삭제')
})


module.exports = router