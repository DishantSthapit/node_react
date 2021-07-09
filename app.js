// Express is package used to build real web app 
const express = require("express")
const app = express()
 
app.get('/', (req, res) => {
  res.send('Hello World')
})
 
app.listen(3000)