const { MessageEmbed } = require("discord.js");

module.exports = (client, message, query) => {
    const embed = new MessageEmbed()
    .setColor(`YELLOW`)
    .setFooter(`💡 ${message.author.tag}\n🛠️ v${client.version}`, message.author.displayAvatarURL())
    .setTitle(`${client.emotes.siri}  Nie znalazłem nic na youtubie dla zapytania: \`${query}\`...`)
    .setThumbnail(`https://cdn.discordapp.com/attachments/837601267827998770/845388635368849428/vega_x.gif`)
    .setDescription(`${client.emotes.rbverify} **...kanału ${message.member.voice.channel}**\n**${client.emotes.grverify} *Możesz spróbować ponownie, czasem wyszukiwanie się buguje 😉*\n\n${client.emotes.system}  Użyto komendy **${message.content}**`)
    .setTimestamp()
    message.channel.send(embed)
};