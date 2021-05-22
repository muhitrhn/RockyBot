const { MessageEmbed } = require("discord.js");

module.exports = (client, message, queue, track) => {
    const embed = new MessageEmbed()
    .setColor(`GREEN`)
    .setTitle(`${client.emotes.siri}  Dodałem \`${track.title}\`...`)
    .setFooter(`💡 ${message.author.tag}\n🛠️ v${client.version}`, message.author.displayAvatarURL())
    .setThumbnail(`https://cdn.discordapp.com/attachments/837601267827998770/845348342439608380/nutka.gif`)
    .setDescription(`${client.emotes.rbverify} **...do playlisty kanału ${message.member.voice.channel}**`)
    message.channel.send(embed)
};