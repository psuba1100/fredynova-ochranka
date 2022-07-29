const mongoose = require('mongoose');

const antispamSchema = new mongoose.Schema({
    idd: {type: String},
    timeoutTime: {type: Number},
    checkTime: {type: Number}
});

const model = mongoose.model('antispamModel', antispamSchema);
module.exports = model;