require('discord-reply');
const { version } = require('../package.json');
const { MessageEmbed } = require("discord.js");

try {
module.exports = {
  name: "ping",
  description: 'Sprawdza ping bota', // Required for slash commands
  execute(message) {
    const embed = new MessageEmbed()
    .setColor("RANDOM")
    .setTitle(`🏓  Ping: \`${message.client.ws.ping}\`ms`)
    .setThumbnail(message.client.user.displayAvatarURL())
    embed.setDescription(`<:systemmessageuser:838387012230053917>  Użyto komendy **${message}**\n\n<a:Staff:843734135972691968> *Powered by **client.ws.ping***\n<:ubuntu:837617906971181057> XDDD`)
    .setFooter(`💡 ${message.author.tag}\n🛠️ v${version}`, message.author.displayAvatarURL())
    embed.setTimestamp()
    message.lineReplyNoMention(embed)
  }
}} catch (error) {
  console.log(error)
}
