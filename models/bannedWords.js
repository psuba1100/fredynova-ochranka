const mongoose = require('mongoose');

const bannedWordsSchema = new mongoose.Schema({
    idd: {type: String, require: true},
    word: {type: Array}
});

const model = mongoose.model('bannedWordsModels', bannedWordsSchema);
module.exports = model;