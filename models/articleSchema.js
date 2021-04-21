const mongoose = require('mongoose')
const marked = require('marked')
const slugify =require('slugify')
const createDomPurify = require('dompurify')
const { JSDOM } = require('jsdom')
const domPurify = createDomPurify(new JSDOM().window)


const articleSchema = new mongoose.Schema({
    title: {
        type: String,
        
    },
    description: {
        type: String,
        
    },
    markdown: {
        type: String,
        
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    slug: {
        type: String,
        require: true,
        unique: true
    },
    sanitizedHTML: {
        type: String,
        require: true
    }
})

articleSchema.pre('validate', function (next) {
    if (this.title) {
        this.slug = slugify(this.title, { lower: true, strict: true})
    }

    next()
})

if (this.markdown) {
    this.sanitizedHtml = domPurify.sanitize(marked(html.markdown))
}

module.exports = mongoose.model('Article', articleSchema)