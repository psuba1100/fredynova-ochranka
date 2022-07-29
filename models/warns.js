const mongoose = require('mongoose');

const warnsSchema = new mongoose.Schema({
    user: {type: String, require: true},
    warns: {type: Number},
    spam: {type: Number},
});

const model = mongoose.model('warnsModels', warnsSchema);
module.exports = model;