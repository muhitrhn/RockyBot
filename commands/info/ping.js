const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "ping",
  aliases: ["ip"],
  description: "Sprawdza ping bota",
  category: 'info',
  utilisation: '{prefix}ping',

  async execute(client, message) {
    reaction = await message.react(client.emotes.google)
    const embed = new MessageEmbed()
    .setColor("RANDOM")
    .setTitle(`🏓  Ping: \`${client.ws.ping}\`ms`)
    .setThumbnail(client.user.displayAvatarURL())
    embed.setDescription(`${client.emotes.system}  Użyto komendy **${message.content}**\n\n${client.emotes.staff} *Powered by **client.ws.ping***\n${client.emotes.ubuntu} XDDD`)
    .setFooter(`💡 ${message.author.tag}\n🛠️ v${client.version}`, message.author.displayAvatarURL())
    embed.setTimestamp()
    message.lineReplyNoMention(embed)
    if(reaction) await reaction.remove()
  }
}