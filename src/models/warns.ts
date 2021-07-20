import { Schema, model } from 'mongoose'

const warnsSchema = new Schema({
    User: String,
    Reason: String,
    ModID: String,
    GuildID: String
})

export = model('warns', warnsSchema)
