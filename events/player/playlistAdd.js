const { MessageEmbed } = require("discord.js");

module.exports = (client, message, queue, playlist) => {
    const embed = new MessageEmbed()
    .setColor(`GREEN`)
    .setFooter(`💡 ${message.author.tag}\n🛠️ v${client.version}`, message.author.displayAvatarURL())
    .setTitle(`🎵  Dodałem \`${playlist.tracks.length}\` utworów z playlisty ${playlist.title} do kolejki...`)
    .setThumbnail(`https://cdn.discordapp.com/attachments/837601267827998770/845348342439608380/nutka.gif`)
    .setDescription(`${client.emotes.rbverify} **...kanału ${message.member.voice.channel}**`)
    .setTimestamp()
    message.lineReplyNoMention(embed)
};
