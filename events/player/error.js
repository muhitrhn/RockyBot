const { MessageEmbed } = require("discord.js");

module.exports = async (client, error, message,  ...args) => {
    reaction = await message.react(client.emotes.google)
    const embed = new MessageEmbed()
    await embed.setColor(`RED`)
    await embed.setDescription(`${client.emotes.system}  Użyto komendy **${message.content}**`)
    await embed.setThumbnail(`https://cdn.discordapp.com/attachments/837601267827998770/845348622694613019/error-img-small.gif`)
    await embed.setFooter(`💡 ${message.author.tag}\n🛠️ v${client.version}`, message.author.displayAvatarURL())
    await embed.setTimestamp()
    switch (error) {
        case 'NotPlaying':
           embed.setTitle(`${client.emotes.rverify}  Nic nie gra na serwerze`)
            await message.lineReplyNoMention(embed)
            await reaction.remove()
            break;
        case 'NotConnected':
            embed.setTitle(`${client.emotes.rverify}  Nie jesteś na kanale głosowym`)
            await message.lineReplyNoMention(embed)
            await reaction.remove()
            break;
        case 'UnableToJoin':
            embed.setTitle(`${client.emotes.rverify}  Nie mogę dołączyć, sprawdź moje uprawnienia`)
            await message.lineReplyNoMention(embed)
            await reaction.remove()
            break;
        case 'VideoUnavailable':
            embed.setTitle(`${client.emotes.rverify}  ${args[0].title} prawdopodobnie nie jest dostępne w twoim kraju, pomijam...`)
            await message.lineReplyNoMention(embed)
            await reaction.remove()
            break;
        case 'MusicStarting':
            embed.setTitle(`${client.emotes.rverify}  Odtwarzacz startuje, spróbuj ponownie później...`)
            await message.lineReplyNoMention(embed)
            await reaction.remove()
           break;
        default:
            embed.setTitle(`${client.emotes.siren}  Coś poszło nie tak`)
            embed.addField(`Błąd:`, `\`\`\`${error}\`\`\`\n${client.emotes.warn} Jeśli komendy nie będą działać poprawnie, rozważ użycie komendy **${client.prefix}reconnect**.`)
            await message.channel.send(embed)
            await reaction.remove()
            console.log(error)
    };
};
