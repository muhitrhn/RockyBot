const { MessageEmbed } = require("discord.js");

module.exports = {
    name: 'volume',
    aliases: ['vol', `mv`],
    category: 'music',
    description: "Zmienia/pokazuje głośność",
    utilisation: '{prefix}volume <1-100>',

    async execute(client, message) {
            reaction = await message.react(client.emotes.google)
            const embed = new MessageEmbed()
            .setTitle(`${client.emotes.siri}  Komenda niedostępna`)
            .setColor(`RED`)
            .setThumbnail(`https://cdn.discordapp.com/attachments/837601267827998770/845616959952257104/loading.gif`)
            .setDescription(`${client.emotes.staff}  **Komenda niegotowa, wyczekuj wersji 0.15.1**`)
            .setFooter(`💡 ${message.author.tag}\n🛠️ v${client.version}`, message.author.displayAvatarURL())
            .setTimestamp()
            message.lineReplyNoMention(embed)
            reaction.remove()
    },
};