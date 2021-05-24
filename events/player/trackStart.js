const { MessageEmbed } = require("discord.js");

module.exports = (client, message, track) => {
    const embed = new MessageEmbed()
    .setColor(`GREEN`)
    .setTitle(`  Teraz odtwarzam \`${track.title}\`...`)
    .setThumbnail(`https://cdn.discordapp.com/attachments/837601267827998770/845348342439608380/nutka.gif`)
    .setDescription(`${client.emotes.rbverify} **...na kanale ${message.guild.me.voice.channel}**`)
    message.channel.send(embed)
};