const mongoose = require('mongoose')

const mutedRoleSchema = new mongoose.Schema({
    Role: String,
    GuildID: String
})

module.exports = mongoose.model('mutedroles', mutedRoleSchema)
