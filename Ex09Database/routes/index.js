const express = require('express')
const db = require('../config/database')
const router = express.Router()

const conn = db.init() // 연결 객체 생성 후 반환
db.connect(conn) // 연결


// member 테이블 전체 정보 가져오기
router.get('/select', (req,res)=>{

    // res.sendFile()은 정적 파일만 가지고 올 수 있어 만약 delete,insert를 하더라도
    // 값이 바뀌지 않음 즉 바뀐 데이터 화면 렌더링x

    // 템플릿 엔진 : html을 미리 만들어두고 여기에 데이터를 추가하는 방식으로
    // 이 결과 문서를 nunjucks를 이용할 것임
    // 따라서 가지고 온 데이터를 활용하여 렌더링이 필요

    let sql = 'select * from member'
   
    conn.query(sql, function(err, rows, fields){// 결과처리(오류, 데이터 결과, 결과외 메타데이터)
        // console.log(err);
        // console.log(rows);
        // console.log(fields);
            //                {키 : 벨류}
        res.render('index', { list : rows })
    })


})
// memeber 1명의 정보 가져오기
router.get('/select/:id',(req,res)=>{
    let id = req.params.id

    let sql = 'select * from member where id=?'
    //[]안에 ?에 들어갈 값 적어줌
    conn.query(sql,[id], function(err,rows,fields){
        // console.log(rows);
        //json형태로 데이터를 응답{key : value}
        res.json({member : rows})
        
    })
})
// 회원 추가하기
router.post('/insert', (req,res)=>{
    //사용자가 입력한 id,pw,nick을 받을 건데 POST방식으므로 
    //body에 실어진 데이터 가지고 와야 함 (따라서 body parsing할 수 있도록 app.js에 설정)
    let {id, pw, nick} = req.body

    let sql = 'insert into member values (?,?,?)'

    conn.query(sql, [id,pw,nick], function(err,rows,fields){
        // console.log(rows)

        // select 로 다시 요청하게 만들기(redirect)
        res.redirect('/select')
    })
    
})
// 회원 정보 수정하기
router.post('/update', (req,res)=>{
    let {id, pw, nick} = req.body

    let sql = 'update member set pw=?, nick=? where id=?'

    conn.query(sql, [pw,nick,id], function(err,rows,fields){
        // console.log(rows);

        res.redirect('/select')
    })
})
// 회원 정보 삭제하기
router.get('/delete/:id', (req,res)=>{
    let id = req.params.id

    let sql = 'delete from member where id=?'
    console.log("id : ",id);

    conn.query(sql, [id], function(err,rows,fields){
        // res.json({member : rows})

        res.redirect('/select')
    })
})



module.exports = router