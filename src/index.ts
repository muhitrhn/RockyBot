require('dotenv').config()
import fs from 'fs'
import chalk from 'chalk'
import mongoose from 'mongoose'
import { Client, Collection } from 'discord.js'
import config from './config/main'

const client = new Client({ 
  intents:
  [
    'GUILDS',
    'GUILD_MEMBERS',
    'GUILD_BANS',
    'GUILD_EMOJIS',
    'GUILD_INTEGRATIONS',
    'GUILD_WEBHOOKS',
    'GUILD_INVITES',
    'GUILD_VOICE_STATES',
    'GUILD_PRESENCES',
    'GUILD_MESSAGES',
    'GUILD_MESSAGE_REACTIONS',
    'GUILD_MESSAGE_TYPING'
  ],
  ws: {
    properties: {
      $browser: 'Discord Android'
    },
  }
})

const queue = new Map()
const emotes = config.emotes
const handlers: Collection<any, any> = new Collection()
const version = config.version
const ownerID = config.discord.ownerID
const testerID = config.discord.testerID
const cmds = config.cmds

let mongoURI

if (config.beta === true) {
  mongoURI = process.env.MONGODB_URI_BETA
} else {
  mongoURI = process.env.MONGODB_URI
}

mongoose.connect(mongoURI || '', {
  useCreateIndex: true,
  useFindAndModify: false,
  useNewUrlParser: true,
  useUnifiedTopology: true
})

const events = fs.readdirSync('./src/events/normal')

for (const file of events) {
  console.log(chalk.magentaBright(`Załadowano event ${file} paczki discord.js `))
  const event = require(`./events/normal/${file}`)
  client.on(file.split('.')[0], event.bind(null, client))
}

if (config.beta === true) {
  client.login(config.discord.betatoken)
}

else {
  client.login(config.discord.token)
}

export {
  queue, config, emotes, handlers, version, ownerID, testerID, cmds
}
