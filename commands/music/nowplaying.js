const { MessageEmbed } = require("discord.js");

module.exports = {
    name: 'nowplaying',
    aliases: ['mnp'],
    category: 'music',
    description: `Informacje o grającej muzyce`,
    utilisation: '{prefix}nowplaying',

    async execute(client, message, args) {
        reaction = await message.react(client.emotes.google)
        const embed = new MessageEmbed()
        .setColor(`RED`)
        .setThumbnail(`https://cdn.discordapp.com/attachments/837601267827998770/845348622694613019/error-img-small.gif`)
        .setDescription(`${client.emotes.system}  Użyto komendy **${message.content}**`)
        .setFooter(`💡 ${message.author.tag}\n🛠️ v${client.version}`, message.author.displayAvatarURL())
        .setTimestamp()
        if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) {
            embed.setTitle(`${client.emotes.rverify}  Gram na innym kanale`)
            await message.lineReplyNoMention(embed)
            await reaction.remove()

        } else if (!client.player.getQueue(message)) {
            embed.setTitle(`${client.emotes.rverify}  Nic nie gra`)
            await message.lineReplyNoMention(embed)
            await reaction.remove()

        } else {
            const track = client.player.nowPlaying(message);

            embed.setColor(`GREEN`),
            embed.setTitle(client.emotes.boombox + `  ` + track.title)

            embed.addField(`Autor`, track.author, true)
            embed.addField(`Dodał`, track.requestedBy, true)
            embed.addField(`Z playlisty`, track.fromPlaylist ? `Tak` : `Nie`, true)
            
            embed.addField(`Wyświetlenia`, track.views, true)
            embed.addField(`Długość`, track.duration, true)
            embed.addField(`** **`, `** **`, true)

            embed.addField(`** **`, `** **`, true)
            embed.addField(`** **`, `** **`, true)
            embed.addField(`** **`, `** **`, true)

            embed.addField(`Głośność`, `${client.player.getQueue(message).volume}% | *użyj ${client.prefix}mv*`, true)
            embed.addField(`Pętla`, client.player.getQueue(message).repeatMode ? `Tak | *użyj ${client.prefix}ml*` : `Nie | *użyj ${client.prefix}ml*`, true)
            embed.addField(`Zatrzymane`, client.player.getQueue(message).paused ? `Tak | *użyj ${client.prefix}mpa*` : `Nie | *użyj ${client.prefix}mpa/${client.prefix}mr*`, true)

            embed.addField(`Postęp`, client.player.createProgressBar(message, { timecodes: true }))

            embed.setThumbnail(track.thumbnail)

            await message.lineReplyNoMention(embed)
            await reaction.remove()
        }
    },
};