const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//create student schema
const StudentSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name field is required']
    },
    s_id: {
        type: Number,
        unique: true
    },
    class: {
        type: String,
        required: [true, 'Students\'s class is required']
    },
    pic: String
});

const Student = mongoose.model('student', StudentSchema);

module.exports = Student;
