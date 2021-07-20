import { Schema, model } from 'mongoose'

const SettingsSchema = new Schema({
    MutedRole: {type: String, default: '' },
    GuildID: String
})

export = model('settings', SettingsSchema)
