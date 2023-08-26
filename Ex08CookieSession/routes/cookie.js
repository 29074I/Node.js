const express = require('express')
const router = express.Router()

// 쿠키 생성
router.get('/setcookie', (req,res)=>{
    let nick = 'nickname1'
    // 서버에서 생성 -> 클라이언트로 응답 시 쿠키정보 포함 
    res.cookie('nickname', nick, {
        maxAge : 100000000, // maxAge는 만료기간으로 1000 ms == 1s
        signed : true // 쿠키 서명 즉 암호화 시켜줌
    }) 
    res.cookie('lunch', '닭가슴살', {
        expires : new Date(Date.now() + 1000*60*60*24) // 오늘 날짜를 기준으로 하루 후 만료

    })
    res.send('쿠키 생성')
})

// 쿠키 값 확인하기
router.get('/getcookies', (req,res)=>{
    console.log(req.cookies.lunch); // 서명이 안된 쿠키만 가지고 옴
    console.log(req.signedCookies.nickname); // 서명 된 쿠키만 가져옴

    res.send('쿠키 확인')
})

// 쿠키 삭제
router.get('/deletecookie', (req,res)=>{
    res.clearCookie('lunch')
    res.send('쿠키 삭제')
})


module.exports = router