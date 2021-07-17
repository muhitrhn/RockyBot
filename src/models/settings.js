const mongoose = require('mongoose')

const SettingsSchema = new mongoose.Schema({
    MutedRole: {type: String, default: '' },
    GuildID: String
})

module.exports = mongoose.model('settings', SettingsSchema)
