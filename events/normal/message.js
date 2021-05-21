require('discord-reply');
const { MessageEmbed } = require('discord.js');
const chalk = require(`chalk`)

module.exports = (client, message) => {

	if (!message.guild || message.author.bot) return;

	//MENTION
	if ((message.content === `<@!${client.myID}>` || message.content === `<@${client.myID}>`) && (!message.content.includes("@here") && !message.content.includes("@everyone"))) {
		const embed = new MessageEmbed()
		.setColor("RANDOM")
		.setTitle(`${client.emotes.world} Mój prefix to \`${client.prefix}\``)
		.setDescription(`${client.emotes.grverify} Użyj \`${client.prefix}help\` aby wyświetlić listę komend`)
		.setThumbnail(client.user.avatarURL())
		.setFooter(`💡 ${message.author.tag}\n🛠️ v${client.version}`, message.author.displayAvatarURL())
		.setTimestamp()
		message.lineReply(embed)
	}


  if (!message.content.startsWith(client.prefix)) return;

	const args = message.content.slice(client.prefix.length).trim().split(/ +/g);
	const command = args.shift().toLowerCase();

	const cmd = client.commands.get(command) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(command));

	if (cmd) cmd.execute(client, message, args)

}
