require('dotenv').config()
const fs = require('fs')
const discord = require('discord.js')
const chalk = require('chalk')
const mongoose = require('mongoose')

// WebUI
// require(./app)

require('discord-reply')
const client = new discord.Client({ disableMentions: 'everyone' })
const disbut = require('discord-buttons')
disbut(client)

discord.Constants.DefaultOptions.ws.properties.$browser = 'Discord Android'

client.base = new discord.Collection()
client.config = require('./config/main')
client.emotes = client.config.emotes
client.commands = new discord.Collection()
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
  useFindAndModify: true,
  useNewUrlParser: true,
  useUnifiedTopology: true
})

//Commands handler
fs.readdirSync('./commands').filter(async dirs => {
  const commands = fs.readdirSync(`./commands/${dirs}`).filter(files => files.endsWith('.js'))

  for (const file of commands) {
    const command = require(`./commands/${dirs}/${file}`)
    if (dirs === 'base') return
    if (!command.name) {
      console.log(chalk.red(`Komenda ${file} niezaładowana`))
    } else {
      console.log(chalk.yellowBright(`Załadowano komendę ${file}`))
      client.commands.set(command.name.toLowerCase(), command)
    }
  }
})

const events = fs.readdirSync('./events/normal').filter(file => file.endsWith('.js'))

for (const file of events) {
  console.log(chalk.magentaBright(`Załadowano event ${file} paczki discord.js `))
  const event = require(`./events/normal/${file}`)
  client.on(file.split('.')[0], event.bind(null, client))
}

const modules = fs.readdirSync('./commands/base').filter(file => file.endsWith('.js'))

for (const file of modules) {
  console.log(chalk.greenBright(`Załadowano bazowy moduł ${file}`))
  const module = require(`./commands/base/${file}`)
  client.base.set(module.name, module)
}

if (client.config.beta === true) client.login(client.config.discord.betatoken)

else client.login(client.config.discord.token)
