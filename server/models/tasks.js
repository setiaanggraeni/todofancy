const mongoose = require('mongoose')
const Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId

const TodoSchema = new Schema({
    userId : {type: Schema.Types.ObjectId, ref: 'Users'},
    task: {
        type: String,
        required: true
    },
    dueDate: {
        type: Date,
        required: true
    }, 
    status: {
        type: String,
        default: 'uncomplete',
        required: true
    }
}, {
    timestamps: true
})

const todo = mongoose.model('Todos', TodoSchema)

module.exports = todo