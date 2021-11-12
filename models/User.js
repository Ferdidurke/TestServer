const {Schema, model, Types} = require('mongoose')


const schema = new Schema ({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, unique: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },


})

module.exports = User = model('User', schema)