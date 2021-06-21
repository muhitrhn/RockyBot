require('discord-reply');
const { MessageEmbed } = require('discord.js');
const chalk = require(`chalk`)
const prefixSchema = require('../../models/prefix');

module.exports = async (client, message) => {

	if (!message.guild || message.author.bot) return;

	//MENTION
	const data = await prefixSchema.findOne({
    GuildID: message.guild.id
  });

	if(data) prefix = data.Prefix; else if (!data) prefix = client.defaultPrefix;

	if ((message.content === `<@!${client.myID}>` || message.content === `<@${client.myID}>`) && (!message.content.includes("@here") && !message.content.includes("@everyone"))) {
		const embed = new MessageEmbed()
		.setColor("YELLOW")
		.setTitle(`${client.emotes.lightSabers} Cześć, tu RockyBot `)
		.setDescription(`${client.emotes.grverify} Mój prefix na tym serwerze to \`${prefix}\`\n${client.emotes.world} Użyj \`${prefix}help\` aby wyświetlić listę komend\n\n*${client.emotes.staff} Tak w ogóle to **jestem [open source](${client.config.github})***\n\n**${client.emotes.gearspin} Made by [ME](https://discord.com/users/${client.config.author})**`)
		.setThumbnail(client.cmds.pingImg)
    .setFooter(`💡 ${message.author.tag}\n🛠️ v${client.version} ┇ ⚡ RockyBot® 2021`, message.author.avatarURL({dynamic: true}));    
		message.lineReply({embed: embed})
	}

  if (!message.content.startsWith(prefix)) return;

	const args = message.content.slice(prefix.length).trim().split(" ");
	const command = args.shift().toLowerCase();

	const cmd = client.commands.get(command) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(command));

	if (!cmd)  return;
  if (message.guild.me.permissionsIn(message.channel).has('SEND_MESSAGES')) cmd.execute(client, message, args, prefix, cmd.name);
  else message.react(`🔇`)
}
