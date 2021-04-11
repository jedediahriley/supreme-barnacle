const express = require('express')
const APP = express()
const articleRouter = require('./routes/articles')
const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/sup_bar', { useNewUrlParser: true ,useUnifiedTopology: true})

APP.set('view engine', 'ejs')
APP.use('/articles', articleRouter)


APP.get('/', (req, res) => {
    const articles =[{
        title: 'Test Article',
        createdAt: new Date(),
        description: 'TEst description'
    }]
    res.render('articles/index', {articles: articles})
});


APP.listen(3000)