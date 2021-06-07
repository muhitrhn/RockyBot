require("dotenv").config()
const fs = require('fs');
require('discord-reply');
const discord = require('discord.js');
const chalk = require("chalk");
const express = require('express')

const client = new discord.Client({ disableMentions: 'everyone' });

discord.Constants.DefaultOptions.ws.properties.$browser = 'Discord Android'

client.config = require('./config/bot')
client.emotes = client.config.emojis;
client.commands = new discord.Collection();
client.releasedate = client.config.releasedate
client.version = client.config.version
client.news = client.config.news
client.ownerID = client.config.discord.ownerID
client.testerID = client.config.discord.testerID


if(client.config.beta === true) {
client.prefix = client.config.discord.betaprefix;
client.myID = client.config.discord.myBetaID
} else {
client.prefix = client.config.discord.prefix;
client.myID = client.config.discord.myID
}

/*//WebUI
const app = express()
app.get('/', (req, res) => res.send('Dziołam (chyba) XDD'))
app.listen(8080) */

//Commands handler
fs.readdirSync('./commands').filter(dirs => {
const commands = fs.readdirSync(`./commands/${dirs}`).filter(files => files.endsWith('.js'));

for (const file of commands) {
	const command = require(`./commands/${dirs}/${file}`);
	console.log(chalk.yellowBright(`Załadowano komendę ${file}`));
	client.commands.set(command.name.toLowerCase(), command);
	}
})

const events = fs.readdirSync('./events/normal').filter(file => file.endsWith('.js'));

for (const file of events) {
    console.log(chalk.magentaBright(`Załadowano event ${file} paczki discord.js `));
    const event = require(`./events/normal/${file}`);
    client.on(file.split(".")[0], event.bind(null, client));
};

//LOGIN
if(client.config.beta === true) {
client.login(client.config.discord.betatoken);
} else {
client.login(client.config.discord.token);
}