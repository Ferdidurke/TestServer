const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
    id: {
        type: Number,
        required: true,
        unique: true
    },
    text: {
        type: String,
        required: true
    },
    deadline: {
        type: Date,
        required: true
    },
    isChecked: {
        type: Boolean,
    },
    color: {
        type: String,
        default: ''
    },
    isMarkToDelete: {
        type: Boolean,
    },
    userId: {
        type: Types.ObjectId, ref: 'User',
        required: true
    },
    deletedDate: {
        type: string
    }

})

module.exports = Task = model('Task', schema)