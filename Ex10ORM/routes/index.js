const express = require('express')
const User = require('../models/user')
const router = express.Router()

//회원 추가
router.post('/insert', async(req,res,next)=>{

    let {id, pw, age} = req.body

    try{
        //insert문 실행
        const result = await User.create({
            id : id, // 컬럼 이름 : 실제 value
            pw : pw,
            age : age
        })

        res.json(result)

    }catch(err){
        //에러처리 미들웨어
        next(err)
    }
   
})
//전체 회원
router.get('/select', async(req,res,next)=>{
    try{//전체 정보 가지고 오고 싶을 때

     const result = await User.findAll()

     res.json(result)

    }catch(err){
        next(err)
    }
})

router.get('/select/:id', async(req,res,next)=>{
    // 만약 한 회원이 작성한 여러 게시물을 출력하고 싶다면 findAll을 쓰고 거기에 where로 
    // 조건을 작성해주면 됨
    let reqId = req.params.id

    try{//특정 회원정보
       const result = await User.findOne({
        where : {id : reqId}, 
        attributes : ['id', 'age'] //id와 age만 가지고 올래

       })

       res.json(result)

    }catch(err){
        next(err)
    }
})
//수정 
// -UPDATE : 모두 업데이트 할 때, PATCH: 일부만 업데이트 할 때(data는 body에 실어져서 전송)
router.patch('/update/:id',async(req,res,next)=>{

    try{
        const result = await User.update({
            pw : req.body.pw,
            age : req.body.age
        }, {
            where : {id : req.params.id}
        })

        res.json(result)

    }catch(err){
        next(err)
    }
})
//삭제
router.delete('/delete/:id', async(req,res,next)=>{
    try{
        const result = await User.destroy({
            where : {id : req.params.id}
        })

        res.json(result)

    }catch(err){
        next(err)
    }
})



module.exports = router
