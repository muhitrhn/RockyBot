const { MessageEmbed } = require("discord.js");

module.exports = {
    name: 'queueclear',
    aliases: ['mcq'],
    category: 'music',
    description: "Czyści kolejkę",
    utilisation: '{prefix}clearqueue',

    async execute(client, message) {
            reaction = await message.react(client.emotes.google)
            const embed = new MessageEmbed()
            .setColor(`RED`)
            .setThumbnail(`https://cdn.discordapp.com/attachments/837601267827998770/845348622694613019/error-img-small.gif`)
            .setDescription(`${client.emotes.system}  Użyto komendy **${message.content}**`)
            .setFooter(`💡 ${message.author.tag}\n🛠️ v${client.version}`, message.author.displayAvatarURL())
            .setTimestamp()
    
            
            if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) {
                embed.setTitle(`${client.emotes.x}  Już gram na tym serwerze, na innym kanale`)
                await message.lineReplyNoMention(embed)
                await reaction.remove()

            } else if (!message.member.voice.channel) {
                embed.setTitle(`${client.emotes.x}  Nie jesteś na kanale głosowym`)
                await message.lineReplyNoMention(embed)
                await reaction.remove()

            } else if (!client.player.getQueue(message)) {
                embed.setTitle(`${client.emotes.x}  Nic nie gra ¯\\_(ツ)_/¯`)
                await message.lineReplyNoMention(embed)
                await reaction.remove()
    
            }  else if (client.player.getQueue(message).tracks.length <= 1) {
                embed.setTitle(`${client.emotes.x}  W kolejce jest tylko 1 piosenka`)
                await message.lineReplyNoMention(embed)
                await reaction.remove()
            } else {
                client.player.clearQueue(message);
                embed.setColor(`GREEN`)
                .setThumbnail(`https://cdn.discordapp.com/attachments/837601267827998770/845370672967319562/trash.png`)
                .setTitle(`${client.emotes.rverify}  Wyczyszczono kolejkę`)
                message.lineReplyNoMention(embed)
                reaction.remove()
            }
    },
};