const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
    title: {
        type: String,
        require: true,
        max: 80
    },
    description: {
        type: String,
        required: true,
        max: 250,
    }
}, { timestamps: true }
)

module.exports = mongoose.model('Todo', todoSchema)