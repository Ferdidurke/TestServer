const {Schema, model, Types} = require('mongoose')

const logSchema = new Schema({
    body: {type: String, required: true},
    userId: {type: Types.ObjectId, ref: 'User'},
    date: {type: Date, default: Date.now},

})

module.exports = Log = model('Log', logSchema)