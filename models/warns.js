const mongoose = require('mongoose')

const warnsSchema = new mongoose.Schema({
    User: String,
    GlobID: Number,
    Reason: String,
    ModID: String,
    GuildID: String
})

module.exports = mongoose.model('warns', warnsSchema)
