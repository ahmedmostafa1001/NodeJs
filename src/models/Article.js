// Article Schema and Model

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const articleSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    numberOfViews: {
        type: Number,
        default: 0
    }
});

const Article = mongoose.model('Article', articleSchema);

module.exports = Article;