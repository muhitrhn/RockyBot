const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "changelog",
  aliases: [`ic`],
  description: "Pokaż changelog",
  category: 'info',
  utilisation: '{prefix}changelog <wersja>',

  async execute(client, message, args) {

    reaction = await message.react(client.emotes.google)
    const embed = new MessageEmbed()
    .setFooter(`💡 ${message.author.tag}\n🛠️ v${client.version}`, message.author.displayAvatarURL())
    .setTimestamp()

    if(!args[0]) {

        embed.setColor("YELLOW")
        .setTitle(`${client.emotes.warn}  Lista wersji`)
        .setThumbnail(`https://cdn.discordapp.com/attachments/850848194929492009/850848259487957022/1205514.png`)
        .setDescription(`${client.emotes.system}  Użyto komendy **${message.content}**\n\n${client.config.changelog.avVersions}\n\n${client.emotes.siri} Dodaj wersję do komendy, aby wyświetlić changelog dla wybranej wersji`)
        await message.lineReplyNoMention(embed)
        if(reaction) await reaction.remove()
        
    } else if (args[0].toLowerCase() === "0.18") {

        embed.setColor("RED")
        .setTitle(`⚙️  Wersja 0.18`)
        .setThumbnail(`https://cdn.discordapp.com/attachments/850848194929492009/850848222787403836/4334039.png`)
        .setDescription(`${client.emotes.system}  Użyto komendy **${message.content}**\n${client.config.changelog.v018}`)
        await message.lineReplyNoMention(embed)
        if(reaction) await reaction.remove()

    } else if (args[0].toLowerCase() === "0.17") {

        embed.setColor("GREEN")
        .setTitle(`⚙️  Wersja 0.17~1`)
        .setThumbnail(`https://cdn.discordapp.com/attachments/850848194929492009/850848244078870568/1688988.png`)
        .setDescription(`${client.emotes.system}  Użyto komendy **${message.content}**\n${client.config.changelog.v0171}${client.config.changelog.v017}`)
        await message.lineReplyNoMention(embed)
        if(reaction) await reaction.remove()

    } else {
        msg = await message.lineReply(client.emotes.x)
        message.react(client.emotes.x)
        if(reaction) await reaction.remove()
        await msg.react("<a:timer6:844672772169138197>")
        setTimeout(() => {
            msg.delete()
        }, 5500);
    }
    } 
}