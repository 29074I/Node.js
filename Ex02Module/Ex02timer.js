// ~초(ms 따라서 1s -> 1000) 후 실행
setTimeout(()=>{
    console.log('3초후 실행');
}, 3000)

// ~초마다 계속 실행
const interval = setInterval(()=>{
    console.log('2초마다 실행');
}, 2000)

// 5초후에  interval멈추기(==> interval을 멈추는 건 함수로 정의가 되어 있음)
setTimeout(()=>{
    clearInterval(interval)
},5000)

// 무조건 즉시실행
setImmediate(()=>{
    console.log('즉시 실행');
})
