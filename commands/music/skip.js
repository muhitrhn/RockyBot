const { MessageEmbed } = require("discord.js")

module.exports = {
    name: 'skip',
    aliases: ['ms', 'msk'],
    category: 'music',
    description: "Pomija utwór",
    utilisation: '{prefix}skip',

    async execute(client, message) {
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
        await reaction.remove() 
        const success = client.player.skip(message);
        }
    }
}
