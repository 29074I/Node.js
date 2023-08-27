const express = require('express')
const Member = require('../models/member')
const router = express.Router()


    router.post('/login', async(req,res,next)=>{

        let {id, pw} = req.body
        console.log(req.body)
    
        try{
            const member = await Member.findOne({
                where : {id : id, pw : pw},
                // attibute : ['id', 'pw', 'nick']
            })
            // req.session.memberId = member.id
            // req.session.memberPw = member.pw
            // req.session.memberNick = member.nick
            req.session.member = member //session에 값 저장
           
            req.session.save(function(){
                if(member){
                    res.redirect('/rooms')
                }else{
                    res.redirect('/')
                }
            })
        
        }catch(err){
            next(err)
        }
       
    })



module.exports = router