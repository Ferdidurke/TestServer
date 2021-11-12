const {Schema, model, Types} = require('mongoose')

const CommentSchema = new Schema({
    author: { type: String, required: true },
    date: { type: Date, default: Date.now },
    body: { type: String, required: true },
    userId: { type: Types.ObjectId, ref: 'User' },
    postId: { type: Types.ObjectId, ref: 'Post' }

})

module.exports = Comment = model('Comment', CommentSchema)