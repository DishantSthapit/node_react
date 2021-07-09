const { sum } = require('./helper')
const http = require('http') //Inbuilt core node js module


// Creating a server using http server
const server =  http.createServer((req,res) => { 
    res.end("Hello world from node js")
})

// Listen to that server in port 3000
server.listen(3000);


const total = sum(2,3)
console.log(total)
