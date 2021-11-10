const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
    userId: {type: Types.ObjectId, ref: 'User', required: true},
    taskText: {type: String, required: true},
    createDate: {type: Date, default: Date.now},
    deadlineDate: {type: Date, required: true},
    isChecked: {type: Boolean, required: true},
    isMarkToDelete: {type: Boolean},
    deletedDate: {type: Date},
    deadlineColor: {type: String}

})

module.exports = Task = model('Task', schema)