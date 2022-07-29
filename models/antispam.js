const mongoose = require('mongoose');

const antispamSchema = new mongoose.Schema({
    timeoutTime: {type: Number},
    checkTime: {type: Number}
});

const model = mongoose.model('antispamModel', antispamSchema);
module.exports = model;