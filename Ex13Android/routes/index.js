const express = require('express')
const db_config = require('../config/database')
const router = express.Router()

//mysql DB사용
const conn = db_config.init() // 연결 객체 생성 후 반환
db_config.connect(conn) // 연결

//회원가입
//http://172.30.1.9:8888/join
router.post('/join', (req,res)=>{
    // console.log(req.body.AndMember)// 문자열로 넘어오기 때문에 사용하기 불편
    let {id,pw,tel,birth} = JSON.parse(req.body.AndMember) //JSON형태로 바꿔줌

    let sql = 'insert into andmember values (?,?,?,?)'

    conn.query(sql, [id,pw,tel,birth], function(err,rows,fields){
        if(err){
            console.log(err)
            res.send('Fail')
        }else{
            console.log(rows)
            if(rows.affectedRows > 0){
                res.send('Success')
                
            }else{
                res.send('Fail')
            }
        }  
    }) 
})

router.post('/login', (req,res)=>{
    console.log(req.body.AndMember)
    let {id,pw} = JSON.parse(req.body.AndMember)
    let andmember = JSON.parse(req.body.AndMember)
    console.log(andmember)

    let sql = 'select * from andmember where id=? and pw=?'
    
    conn.query(sql, [id,pw], function(err,rows,fields){
        console.log(rows)
        if(err){
            res.send('Fail')
        }else{ 
            if(rows.length > 0){
                res.send('로그인 Success')
            
            }else{//DB에 없는 값을 입력하면 빈 배열이 넘어옴
                res.send('로그인 Fail')
            }
        }
    })
})






module.exports = router