const express = require('express')
const app = express()
const env = require('dotenv')
const mongoose  = require('mongoose')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const expressValidator = require ('express-validator')

// This method is used to invoke the dotenv variables and we can use it after invoking
env.config();

const morgan = require("morgan") 

//bring in routes
const postRoutes = require('./routes/post')
const authRoutes = require('./routes/auth')
//db connect
mongoose.connect(process.env.URI, {useNewUrlParser: true, useUnifiedTopology: true }).then(() => console.log('db connected'))
mongoose.connection.on('error', err => {
  console.log(`DB Connection error ${err.msg}`)
})

//Middleware
app.use(morgan("dev"))
//Middleware to parse the response
app.use(bodyParser.json())
//Middleware to parse the cookie
app.use(cookieParser())
//Middleware to validate
app.use(expressValidator())
app.use("/", postRoutes)
app.use("/", authRoutes)



const port = process.env.PORT || 8080;
app.listen(port, () => {console.log(`A node JS API is listining on port ${port}`)});