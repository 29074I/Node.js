setImmediate(()=>{ //check
    console.log('setImmediate 실행');
})

setTimeout(()=>{ //timer
    console.log('setTimeOut 실행');
}, 0)

// event loop 스케줄링 : timer -> pending -> poll -> ... -> check

// event loop 와는 별개로 현재 실행 중인 동작이 완료되면 바로 실행
process.nextTick(()=>{
    console.log('nexttick 실행');
})