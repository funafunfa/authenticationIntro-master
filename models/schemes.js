'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var lessonSchema = new Schema({
    name: String,
    teacher: String,
    auditory: String,
    notes: String
});

module.exports = mongoose.model('lessonSchema', lessonSchema);
