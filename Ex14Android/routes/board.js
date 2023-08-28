const express = require('express')
const db_config = require('../config/database')
const router = express.Router()

let conn = db_config.init()
db_config.connect(conn)

router.get('/', (req,res)=>{
    let sql = "select * from andboard"
    conn.query(sql, (err, rows)=>{
        if(err){
            console.log(err)
        }else{
            res.send(rows)
        }
    })
   
})
module.exports = router