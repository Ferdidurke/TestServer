const {Schema, model, Types} = require('mongoose')


const schema = new Schema ({
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true, unique: true},
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    todos: [{type: Types.ObjectId, ref: 'Todos'}],
    posts: [{type: Types.ObjectId, ref: 'Posts'}]


})

module.exports = model('User', schema)