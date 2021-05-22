const { MessageEmbed } = require("discord.js");

module.exports = {
    name: 'play',
    aliases: ['mp'],
    description: "Włącza muzykę",
    category: 'music',
    utilisation: '{prefix}play [nazwa/URL]',

    async execute(client, message, args) {
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

        } else if (!args[0]) {
            embed.setTitle(`${client.emotes.question}  Co mam zagrać? Nic nie napisałeś xD`)
            await message.lineReplyNoMention(embed)
            await reaction.remove()

        } else {
        await client.player.play(message, args.join(" "),  { firstResult: true });
        await reaction.remove()
        }
    },
};