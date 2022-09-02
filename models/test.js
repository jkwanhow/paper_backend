const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const TestSchema = new Schema(
    {
        name: {type: String, required: true, maxLength:50},
        age: {type: Number, required: true, max: 100},
        other_info: {type: String, required: false, maxLength:150},
        
    },
    {
        toObject: {virtuals: true},
        toJSON: {virtuals: true},
});

//Testing virtuals
TestSchema.virtual('birth_year').get(function () {
    var currentYear = new Date().getFullYear();
    return currentYear - this.age;
});

module.exports = mongoose.model('Test', TestSchema);