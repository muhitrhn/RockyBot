const { MessageEmbed } = require("discord.js");

module.exports = {
    name: 'loop',
    aliases: ['ml', 'repeat'],
    category: 'music',
    description: "Zapętla utwór/kolejkę",
    utilisation: '{prefix}loop <queue>',

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
            embed.setTitle(`${client.emotes.rverify}  Już gram na tym serwerze, na innym kanale`)
            await message.lineReplyNoMention(embed)
            await reaction.remove()

        } else if (!client.player.getQueue(message)) {
            embed.setTitle(`${client.emotes.rverify}  Nic nie gra xD`)
            await message.lineReplyNoMention(embed)
            await reaction.remove()
        } else {
            if (args.join(" ").toLowerCase() === 'queue') {
                if (client.player.getQueue(message).loopMode) {
                    client.player.setLoopMode(message, false);
                    embed.setTitle(`🔁  Powtarzanie kolejki wyłączone`)
                    .setThumbnail(`https://cdn.discordapp.com/attachments/837601267827998770/845388635368849428/vega_x.gif`)
                    await message.lineReplyNoMention(embed)
                    await reaction.remove()

                } else {
                    client.player.setLoopMode(message, true);
                    client.player.setRepeatMode(message, false);
                    embed.setTitle(`🔁  Powtarzanie kolejki włączone`)
                    .setThumbnail(`https://cdn.discordapp.com/attachments/837601267827998770/845348342439608380/nutka.gif`)
                    await message.lineReplyNoMention(embed)
                    await reaction.remove()
                };
            } else {
                if (client.player.getQueue(message).repeatMode) {
                    client.player.setRepeatMode(message, false);
                    embed.setTitle(`🔂  Powtarzanie utworu wyłączone`)
                    .setThumbnail(`https://cdn.discordapp.com/attachments/837601267827998770/845388635368849428/vega_x.gif`)
                    await message.lineReplyNoMention(embed)
                    await reaction.remove()
                } else {
                    client.player.setRepeatMode(message, true);
                    client.player.setLoopMode(message, false);
                    embed.setTitle(`🔂  Powtarzanie utworu włączone`)
                    .setThumbnail(`https://cdn.discordapp.com/attachments/837601267827998770/845348342439608380/nutka.gif`)
                    await message.lineReplyNoMention(embed)
                    await reaction.remove()
                    
                };
            };
        }
    },
};