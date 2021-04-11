const express = require('express')
const APP = express()
const articleRouter = require('./routes/articles')

APP.set('view engine', 'ejs')
APP.use('/articles', articleRouter)


APP.get('/', (req, res) => {
    const articles =[{
        title: 'Test Article',
        createdAt: new Date(),
        description: 'TEst description'
    }]
    res.render('index', {articles: articles})
});


APP.listen(3000)