
require('dotenv').config()
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const Routes = require('./routes/todo.js')

const app = express();

app.use(cors())


app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }))

const PORT = 7000;


// middleware
app.use(express.json())

app.use((req, res, next) => {
  console.log(req.path, req.method)
  next()
})

// routes
app.use('/', Routes);
//need to understand this better

// connect to db
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('connected to database')
    // listen to port
    app.listen(process.env.PORT, () => {
      console.log('listening for requests on port', process.env.PORT)
    })
  })
  .catch((err) => {
    console.log(err)
}) 
