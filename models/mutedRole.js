const mongoose = require('mongoose');

const mutedRoleSchema = new mongoose.Schema({
    Role: {
        type: String
    },
    GuildID: String
});

const MessageModel = module.exports = mongoose.model('mutedRole', mutedRoleSchema);