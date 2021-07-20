import { MessageEmbed } from 'discord.js'
import { config } from '../..'

module.exports = async (client: { user: { id: any }; users: { cache: { get: (arg0: string) => { (): any; new(): any; tag: any } } } }, message: { guild: { id: any }; author: { bot: any; tag: any; displayAvatarURL: (arg0: { dynamic: boolean }) => string }; content: string | string[]; channel: { send: (arg0: { embeds: MessageEmbed[]; reply: { failIfNotExists: boolean; messageReference: any } }) => any } }) => {

	if (!message.guild || message.author.bot) return

	if ((message.content === `<@!${client.user.id}>` || message.content === `<@${client.user.id}>`) && (!message.content.includes('@here') && !message.content.includes('@everyone'))) {
		const embed = new MessageEmbed()
		.setColor('YELLOW')
		.setTitle(`${config.emotes.lightSabers} Cześć, tu RockyBot `)
		.setDescription(`${config.emotes.world} Użyj \`/help\` aby wyświetlić listę komend\n${config.emotes.gearspin} *Jeśli nie widzisz komend, wyrzuć bota i [dodaj go ponownie](https://discordapp.com/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=bot%20applications.commands&guild_id=${message.guild.id})*\n\n*${config.emotes.staff} Moja strona dostępna **[TUTAJ](https://rockybot.cf/)***\n*${config.emotes.arrr} Made by **[${client.users.cache.get(config.author).tag}](https://discord.com/users/${config.author})***`)
		.setThumbnail(config.cmds.pingImg)
    .setFooter(`💡 ${message.author.tag}\n🛠️ v${config.version} ┇ ⚡ RockyBot® 2021`, message.author.displayAvatarURL({dynamic: true}))
		await message.channel.send({embeds: [embed], reply: {failIfNotExists: false, messageReference: message}})
	}
}
