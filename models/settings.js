const mongoose = require('mongoose');

const settingsSchema = new mongoose.Schema({
    serverID: {type: String, require: true},
    outcome: {type: String},
    suggestionTime: {type: Number},
    suggestionId: {type: Number}
});

const model = mongoose.model('SettingsModels', settingsSchema);
module.exports = model;