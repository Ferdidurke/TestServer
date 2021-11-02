const {Schema, model, Types} = require('mongoose')

const PostSchema = new Schema({
    //id: {type: Number, default: 0},
    title: {type: String, required: true},
    date: {type: Date, default: Date.now},
    body: {type: String, required: true},
    //userId: {type: Types.ObjectId, ref: 'User'},
    comments: {type: Array, default: []}

})

module.exports = Post = model('Post', PostSchema)