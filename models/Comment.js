const {Schema, model, Types} = require('mongoose')

const CommentSchema = new Schema({
    id: {type: Number, default: 0},
    author: {type: String, required: true},
    date: {type: Date, default: Date.now},
    body: {type: String, required: true},
    //userId: {type: Types.ObjectId, ref: 'User'},

})

module.exports = Comment = model('Comment', CommentSchema)