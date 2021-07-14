require('dotenv').config()
const fs = require('fs')
const discord = require('discord.js')
const chalk = require('chalk')
const mongoose = require('mongoose')

const client = new discord.Client({ intents: 
  ['GUILDS',
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
  ws: {properties: {$browser: 'Discord Android'}}})

client.base = new discord.Collection()
client.config = require('./config/main')
client.emotes = client.config.emotes
client.commands = new discord.Collection()
client.handlers = new discord.Collection()
client.releasedate = client.config.releasedate
client.version = client.config.version
client.news = client.config.news
client.ownerID = client.config.discord.ownerID
client.testerID = client.config.discord.testerID

client.cmds = client.config.cmds

let mongoURI

if (client.config.beta === true) {
  client.defaultPrefix = client.config.discord.betaprefix
  client.myID = client.config.discord.myBetaID
  mongoURI = process.env.MONGODB_URI_BETA
} else {
  client.defaultPrefix = client.config.discord.prefix
  client.myID = client.config.discord.myID
  mongoURI = process.env.MONGODB_URI
}

mongoose.connect(mongoURI, {
  useCreateIndex: true,
  useFindAndModify: false,
  useNewUrlParser: true,
  useUnifiedTopology: true
})

const events = fs.readdirSync('./events/normal').filter(file => file.endsWith('.js'))

for (const file of events) {
  console.log(chalk.magentaBright(`Załadowano event ${file} paczki discord.js `))
  const event = require(`./events/normal/${file}`)
  client.on(file.split('.')[0], event.bind(null, client))
}

const modules = fs.readdirSync('./commands/base').filter(file => file.endsWith('.js'))

for (const file of modules) {
  console.log(chalk.blueBright(`Załadowano bazowy moduł ${file}`))
  const module = require(`./commands/base/${file}`)
  client.base.set(module.name, module)
}

if (client.config.beta === true) {
  client.login(client.config.discord.betatoken)
}
else {
  client.login(client.config.discord.token)
}

