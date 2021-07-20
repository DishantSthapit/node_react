const express = require('express')
const app = express()

const morgan = require("morgan")

//bring in routes
const { getPosts } = require('./routes/post')


const myOwnMiddleWare = (req,res, next) => {
  setTimeout(()=>{
    console.log("Middleware applied")
  },1000)
  next();
}

//Middleware
app.use(myOwnMiddleWare)
app.use(morgan("dev"))

app.get("/", getPosts)


const port = 8080;
app.listen(port, () => {console.log(`A node JS API is listining on port ${port}`)});