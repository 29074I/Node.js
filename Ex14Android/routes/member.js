const express = require('express')
const db_config = require('../config/database')
const router = express.Router()

//mysql DB사용
const conn = db_config.init() // 연결 객체 생성 후 반환
db_config.connect(conn) // 연결

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
                res.send(rows)
            
            }else{//DB에 없는 값을 입력하면 빈 배열이 넘어옴
                res.send('Fail')
            }
        }
    })
    
})





module.exports = router