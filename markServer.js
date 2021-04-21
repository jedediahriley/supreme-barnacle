const express = require('express')
const APP = express()
const articleRouter = require('./routes/articles')
const Article = require('./models/articleSchema')
const methodOverride = require('method-override')
const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/sup_bar', { useNewUrlParser: true ,useUnifiedTopology: true, useCreateIndex: true})

APP.set('view engine', 'ejs')
APP.use(express.urlencoded({ extended:false }))
APP.use('/articles', articleRouter)
APP.use(methodOverride('_method'))

APP.get('/', async (req, res) => {
    const articles = await Article.find().sort({ createdAt: 'desc'})
    res.render('articles/index', {articles: articles})
});




APP.listen(3000)