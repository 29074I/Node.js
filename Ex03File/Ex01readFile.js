// 파일 다루는 모듈
// fs : file system
const fs = require('fs')

// fs 을 활용하여 콜백함수 이용
fs.readFile('./file1.txt',(err, data)=>{
    //err : 파일 경로가 잘못되면 에러 발생!
    //data : 파일을 제대로 읽어왔을 때 파일 안에 데이터

    if(err){
        console.log(err);
    }else{
        //data만 적으면 16진수로 변환하여 Buffer에 저장하기 때문에 뒤에 toString()을 붙여줌
        console.log(data.toString()); 
    }
})
