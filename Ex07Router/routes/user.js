// router 사용 가능 하도록 만들어줘야 함
const express = require('express')
const router = express.Router() // 라우터 인스턴스 생성

// /user/text로 요청 시
router.get('/test', (req,res)=>{
    res.send('user 요청!')
})

module.exports = router
