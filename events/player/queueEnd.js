const { MessageEmbed } = require("discord.js");

module.exports = (client, message, queue) => {
    const embed = new MessageEmbed()
    .setColor(`YELLOW`)
    .setTitle(`${client.emotes.siri}  Koniec playlisty, wychodzę`)
    .setThumbnail(`https://cdn.discordapp.com/attachments/837601267827998770/845416153756467200/Znak-ewakuacyjny-WYJSCIE-EWAKUACYJNE-P-Nowa-norma.jpg`)
    .setDescription(``)
    .setTimestamp()
    message.channel.send(embed)
};