const mongoose = require('mongoose');

const suggestionSchema = new mongoose.Schema({
    idd: {type: String, require: true},
    suggestion: {type: String},
    plus: {type: Array},
    minus: {type: Array},
    voted: {type: Array},
    result: {type: String}
});

const model = mongoose.model('suggestionModels', suggestionSchema);
module.exports = model;