const { MessageEmbed } = require("discord.js");

module.exports = {
    name: 'resume',
    aliases: [`mr`],
    description: "Wznawia muzykę",
    category: 'music',
    utilisation: '{prefix}resume',

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
        

        } else if (!client.player.getQueue(message).paused) {
            embed.setTitle(`${client.emotes.rverify}  Już gram tym kanale XD`)
            await message.lineReplyNoMention(embed)
            await reaction.remove()
        } else {
            const success = client.player.resume(message); client.player.pause(message); client.player.resume(message);
        
            if (success) {
                const embed = new MessageEmbed()
                .setColor(`GREEN`)
                .setFooter(`💡 ${message.author.tag}\n🛠️ v${client.version}`, message.author.displayAvatarURL())
                .setTitle(`${client.emotes.boombox}  Wznawiam utwór...`)
                .setThumbnail(`https://cdn.discordapp.com/attachments/837601267827998770/845355528170897459/play.gif`)
                .setDescription(`${client.emotes.grverify} **...na kanale ${message.member.voice.channel}**\n${client.emotes.siri} *Użyj ${client.prefix}mpa aby zatrzymać*\n\n${client.emotes.system}  Użyto komendy **${message.content}**`)
                .setTimestamp()
                await message.lineReplyNoMention(embed)
                await reaction.remove() 
            }
        }
    },
};