const { MessageEmbed } = require("discord.js");

module.exports = {
    name: 'reconnect',
    aliases: ['mdc'],
    description: "Ponownie łączy bota (USUWA KOLEJKĘ!)",
    category: 'muzyka',
    utilisation: '{prefix}reconnect',

    async execute(client, message, args) {
        reaction = await message.react(client.emotes.google)
        const embed = new MessageEmbed()
        .setColor(`RED`)
        .setThumbnail(`https://cdn.discordapp.com/attachments/837601267827998770/845348622694613019/error-img-small.gif`)
        .setDescription(`${client.emotes.system}  Użyto komendy **${message.content}**`)
        .setFooter(`💡 ${message.author.tag}\n🛠️ v${client.version}`, message.author.displayAvatarURL())
        .setTimestamp()
        
        if (!message.member.voice.channel) {
            embed.setTitle(`${client.emotes.rverify}  Nie jesteś na kanale głosowym`)
            await message.lineReplyNoMention(embed)
            await reaction.remove()
        
        } else if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) {
            embed.setTitle(`${client.emotes.rverify}  Gram na innym kanale`)
            await message.lineReplyNoMention(embed)
            await reaction.remove()
        } else {
        await message.guild.me.voice.channel.leave()
        setTimeout(async () => {
            await message.member.voice.channel.join()
            embed.setTitle(`Połączono ponownie, usunięto kolejkę`)
            .setThumbnail(``)
            .setColor(`GREEN`)
            await message.lineReplyNoMention(embed)
            await reaction.remove()
        }, 1000); 
        
        }
    },
};