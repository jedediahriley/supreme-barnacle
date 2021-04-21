const express = require('express')
const Article = require('./../models/articleSchema')
const router = express.Router()


router.get('/new', (req, res) => {
    res.render('articles/new', { article: new Article()})
})

router.get('/new/:id', async (req, res) => {
    const article = await Article.findById(req.params.id)
    res.render('articles/new', { article: article})
})

router.get('/:slug', async (req, res) => {
    const article = await Article.findOne({ slug: req.params.slug})
    if (article == null) res.redirect('/')
    res.render('articles/show', { article: article})
})

router.post('/', async (req, res) => {
    let article = new Article({
        title: req.body.title,
        description: req.body.description,
        markdown: req.body.markdown

    })
    try {
        article = await article.save()
        res.redirect(`/articles/${article.slug}`)
    } catch (err) {
        console.log(err)
        res.render('articles/new', {article: article })
        res.redirect('/')
    }

   
})

router.delete('/:id', async (req, res) => {
    console.log('test')
    await Article.findByIdAndDelete(req.params.id)
    res.redirect('/')
})

router.post('/:id/delete', async (req,res) => {
    await Article.findByIdAndDelete(req.params.id)
    res.redirect('/')
})

module.exports = router