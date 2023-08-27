// mysql2 : promise 사용이 가능한 형태
const mysql = require('mysql2')

const db_info ={
    host : 'localhost',
    port : '3306', // mysql port 번호
    user : 'fullstack', // 계정이름
    password : '12345',
    database : 'boot' // 스키마 이름
}

// db 연결을 도와줘야 하는데 그건 함수로 정의할 것
// 함수1. 초기화 시켜주고 연결객체 리턴해주는 함수
// 함수2. 연결을 도와주는 함수
module.exports = {
    init : function(){ // 작성한 db연결정보로 연결 객체 생성 후 반환해주는 함수
        return mysql.createConnection(db_info) // 연결 객체 생성
    },
    connect : function(conn){ // mysql 서버 연결 , conn => 연결 객체
        conn.connect(function(err){
            if(err) console.log('연결 실패!'+ err);
            else console.log('연결 성공');
        })
    }
}
