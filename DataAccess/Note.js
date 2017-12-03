const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const NoteSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        minlength: 1
    },
    content: {
        type: String,
        required: true,
        trim: true,
        minlength: 1
    },
    tags: {
        type: Array,
        default: []
    },
    created_date: {
        type: Date,
        required: true
    },
    updated_date: {
        type: Date,
        required: true
    }
});

const Note = mongoose.model('Note', NoteSchema);

module.exports = Note;