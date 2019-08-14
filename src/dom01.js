const fs = require('fs')

const ws = fs.createWriteStream('./test.txt')
const ti = setInterval(() => {
    const num = parseInt(Math.random()*10)
    if(num<8){
        ws.write(num+'')
    }else{
        ws.end()
        clearInterval(ti)
    }
}, 200);
ws.on('finish',()=>{
    console.log('done')
})