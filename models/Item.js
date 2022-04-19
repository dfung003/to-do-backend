const { Schema, model } = require('./connection');
const itemSchema = Schema({
    entry: {
        required: true,
        type: String
    },
    status: {
        type: String,
        required: true,
        default: 'TO-DO',
        enum: ['TO-DO', 'COMPLETED'],
    }
})

module.exports = model('Item', itemSchema);