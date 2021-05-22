const { MessageEmbed } = require("discord.js");

module.exports = {
    name: 'queue',
    aliases: [`mq`],
    category: 'music',
    description: "Wyświetla kolejkę",
    utilisation: '{prefix}queue',

    async execute(client, message) {        
        reaction = await message.react(client.emotes.google)
        const embed = new MessageEmbed()
        .setColor(`RED`)
        .setThumbnail(`https://cdn.discordapp.com/attachments/837601267827998770/845348622694613019/error-img-small.gif`)
        .setDescription(`${client.emotes.system}  Użyto komendy **${message.content}**`)
        .setFooter(`💡 ${message.author.tag}\n🛠️ v${client.version}`, message.author.displayAvatarURL())
        .setTimestamp()

        
        if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) {
            embed.setTitle(`${client.emotes.rverify}  Jesteś na innym kanale głosowym`)
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
        } else {
            queue = await client.player.getQueue(message)
            embed.setDescription(`${client.emotes.world}  **Kolejka kanału ${message.member.voice.channel}**\n\n${client.emotes.system}  Użyto komendy **${message.content}**\n🔁  Powtarzanie **kolejki**: ${client.player.getQueue(message).loopMode ? `${client.emotes.grverify}` : `${client.emotes.rverify}`}\n🔂  Powtarzanie **utworu**: ${client.player.getQueue(message).repeatMode ? `${client.emotes.grverify}` : `${client.emotes.rverify}`}`)
            .addField(`${client.emotes.siri}  Teraz gram:  ${client.emotes.yellowDot}  *użyj ${client.prefix}mnp aby wyświetlić szczegóły*`, `${client.emotes.boombox} \`${queue.playing.title}\` | \`${queue.playing.duration}\``)
            if (queue.tracks.length !== 1) {
                embed.addField(`Następne w kolejce:`, queue.tracks.map((track, i) => {
                return `${client.emotes.yellowDot} **${i}.** \`${track.title}\` | \`${track.duration}\`\n${client.emotes.magentaDot} Dodane przez ${track.requestedBy}\n`
            }).slice(1,6).join(``))
            } else embed.addField(`Playlista jest pusta!`, `${client.emotes.siren} Użyj \`${client.prefix}mp [nazwa/URL]\` aby dodać muzykę! \n${client.emotes.warn} Użyj \`${client.prefix}ml queue\` aby włączyć powtarzanie kolejki!`)
            
            if (queue.tracks.length > 11) embed.addField(`${client.emotes.boombox}  I **${queue.tracks.length - 6}** innych utworów...`, `▶️ - reszta listy`)
            
            embed.setThumbnail(`https://cdn.discordapp.com/attachments/837601267827998770/845348342439608380/nutka.gif`)
            await message.lineReplyNoMention(embed)
            await reaction.remove()
            }
        }
};