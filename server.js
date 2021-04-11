const express = require('express');
const app = express();
const mongoose = require('mongoose')
const url = 'mongodb://localhost:27017/sup_bar'
const Blog = require('./blogSchema')

const db = mongoose.connection
db.once('open', _ => {
  console.log('Database connected:', url)
})

db.on('error', err => {
  console.error('connection error:', err)
})



// middleware
app.use(express.urlencoded({ extended: true }));
mongoose.connect(url, { useNewUrlParser: true , useUnifiedTopology: true
})


app.get("/", (req, res) => {
    res.sendFile(__dirname + '/index.html')
})

app.post('/quotes', (req, res) => {
    console.log(req.body)
  })




app.listen(3000, function() {
    console.log('listening on 3000')
  })

console.log('Hello World')