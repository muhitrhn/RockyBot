const mongoose = require('mongoose')

const SettingsSchema = new mongoose.Schema({
    Prefix: {type: String, default: '.' },
    MutedRole: {type: String, default: '' },
    GuildID: String
})

module.exports = mongoose.model('settings', SettingsSchema)
