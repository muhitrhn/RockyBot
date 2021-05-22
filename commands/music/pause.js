const { MessageEmbed } = require("discord.js");

module.exports = {
    name: 'pause',
    aliases: ['mpa'],
    description: "Pauzuje muzykę",
    category: 'music',
    utilisation: '{prefix}pause',

    async execute(client, message) {
        reaction = await message.react(client.emotes.google)
       
        const embed = new MessageEmbed()
        .setColor(`RED`)
        .setThumbnail(`https://cdn.discordapp.com/attachments/837601267827998770/845348622694613019/error-img-small.gif`)
        .setDescription(`${client.emotes.system}  Użyto komendy **${message.content}**`)
        .setFooter(`💡 ${message.author.tag}\n🛠️ v${client.version}`, message.author.displayAvatarURL())
        .setTimestamp()

        if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) {
            embed.setTitle(`${client.emotes.rverify}  Już gram na tym serwerze, na innym kanale`)
            await message.lineReplyNoMention(embed)
            await reaction.remove()

        } else if (!message.member.voice.channel) {
            embed.setTitle(`${client.emotes.rverify}  Nie jesteś na kanale głosowym`)
            await message.lineReplyNoMention(embed)
            await reaction.remove()

        } else if (!client.player.getQueue(message)) {
            embed.setTitle(`${client.emotes.rverify}  Nic nie gra xD`)
            await message.lineReplyNoMention(embed)
            await reaction.remove()
        }

        else if (client.player.getQueue(message).paused) {
            embed.setTitle(`${client.emotes.rverify}  Muzyka na tym kanale już jest spauzowana`)
            await message.lineReplyNoMention(embed)
            await reaction.remove()
        } else {
            const success = client.player.pause(message);
        
            if (success) {
                const embed = new MessageEmbed()
                .setColor(`GREEN`)
                .setFooter(`💡 ${message.author.tag}\n🛠️ v${client.version}`, message.author.displayAvatarURL())
                .setTitle(`⏸️  Pauzuję utwór...`)
                .setThumbnail(`https://cdn.discordapp.com/attachments/837601267827998770/845352644296966184/pause.gif`)
                .setDescription(`${client.emotes.rverify} **...na kanale ${message.member.voice.channel}**\n${client.emotes.siri} *Użyj ${client.prefix}mr aby wznowić*\n\n${client.emotes.system}  Użyto komendy **${message.content}**`)
                .setTimestamp()
                await message.lineReplyNoMention(embed)
                await reaction.remove() 
            }
        }
    },
}