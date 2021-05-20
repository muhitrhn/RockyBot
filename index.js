require('discord-reply');
const fs = require('fs');
const Discord = require('discord.js');
const client = new Discord.Client();
const chalk = require("chalk");
require('dotenv').config();
Discord.Constants.DefaultOptions.ws.properties.$browser = 'Discord Android'
client.commands = new Discord.Collection();
const { releasedate,version,news,beta } = require("./package.json")
const express = require('express')
const app = express()

process.on('unhandledRejection', error => {});

app.get('/', (req, res) => res.send('Dziołam (chyba) XDD'))

app.listen(8080)


const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	// set a new item in the Collection
	// with the key as the command name and the value as the exported module
	client.commands.set(command.name, command);
}

if(beta === "true") {
client.login(process.env.BETATOKEN); var prefix = process.env.BETAPREFIX;
} else {
client.login(process.env.TOKEN); var prefix = process.env.PREFIX;
}

const activities = [
	//Development
	`🛠️ v${version}`,
	"🛠️ Made by BAYOJAYO xD#4798",
	`🛠️ Nowości w skrócie: ${news}`,
	`🛠️ Data wydania najnowszej wersji: ${releasedate}`,

	//Podpowiedzi
	"💡 Pingnij bota, aby wyświetlić podstawowe informacje",
	"💡 Komenda wideo wysyła śmiszne filmy",
	"💡 Słyszałeś/aś o komendzie tuskotronic? Albo kamien? xD",
	"💡 Użyj komendy stonoga, aby go usłyszeć XD",

	//Inne XD
	"🤠 #ZmienićRząd ",
	"🤠 Ile to 2+2*2?", 
	"🤠 ¯\\_(ツ)_/¯" 
  ];

client.on('ready', () => {
	
	console.log(chalk.greenBright(`Logged in as ${client.user.tag}\nBot is ready :)`));
	setInterval(() => {
		  const randomIndex = Math.floor(Math.random() * (activities.length - 1) + 1);
		  const newActivity = activities[randomIndex];
	  
		  client.user.setActivity(newActivity);
 
		}, 15 * 1000);

})




client.on("message", message => {
	if (!message.guild) return;
	if (message.content.includes("@here") || message.content.includes("@everyone")) return false;
	if (message.content === "<@!838363732631486494>" || message.content === "<@838363732631486494>") {
		const embed = new Discord.MessageEmbed()
		.setColor("RANDOM")
		.setTitle("<a:Black_World:838382299166801921> Mój prefix to `.`")
		.setDescription("<a:greenverify:837704119086612502> Użyj `.help` aby wyświetlić listę komend")
		.setThumbnail(client.user.avatarURL())
		.setFooter(`💡 ${message.author.tag}\n🛠️ v${version}`, message.author.displayAvatarURL())
		.setTimestamp()
		message.lineReply(embed)
	}
  if (!message.content.startsWith(prefix) || message.author.bot) return;
	const args = message.content.slice(prefix.length).trim().split(/ +/);
	const command = args.shift().toLowerCase();

	if (!client.commands.has(command)) return;

	try {
		client.commands.get(command).execute(message, args, command);
	} catch (error) {
		console.error(error);
		message.lineReplyNoMention('<a:Siri_Loading:826383904729989160> Wystąpił problem');
	} 
})

