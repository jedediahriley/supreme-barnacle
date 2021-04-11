const mongoose = require('mongoose')

const blogSchema = mongoose.Schema({
    author: {
        type: String,
        required: true
    },

    post: {
        type: String,
        required: true
    },

    timestamp: { 
        type: Date, 
        default: Date.now 

    }

})

const Blog = mongoose.model('Blog', blogSchema);
module.exports = Blog;