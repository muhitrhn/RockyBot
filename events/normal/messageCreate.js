const { MessageEmbed } = require('discord.js')

module.exports = async (client, message) => {

	if (!message.guild || message.author.bot) return

	if ((message.content === `<@!${client.myID}>` || message.content === `<@${client.myID}>`) && (!message.content.includes('@here') && !message.content.includes('@everyone'))) {
		const embed = new MessageEmbed()
		.setColor('YELLOW')
		.setTitle(`${client.emotes.lightSabers} Cześć, tu RockyBot `)
		.setDescription(`${client.emotes.world} Użyj \`/help\` aby wyświetlić listę komend\n\n*${client.emotes.staff} Moja strona dostępna **[TUTAJ](https://rockybot.cf/)***\n*${client.emotes.gearspin} Made by **[${client.users.cache.get(client.config.author).tag}](https://discord.com/users/${client.config.author})***`)
		.setThumbnail(client.cmds.pingImg)
    .setFooter(`💡 ${message.author.tag}\n🛠️ v${client.version} ┇ ⚡ RockyBot® 2021`, message.author.displayAvatarURL({dynamic: true}))
		await message.channel.send({embeds: [embed], reply: {failIfNotExists: false, messageReference: message}})
	}
}
