require('discord-reply');
const { MessageEmbed } = require('discord.js');

module.exports = {
    name: "avatar",
    aliases: ["aa"],
    description: 'Wyświetla avatar',
    category: 'avatar',
    utilisation: '{prefix}avatar <wzmianka>',
    async execute(client, message) {

    reaction = await message.react(client.emotes.google)
    embed = new MessageEmbed()
    .setColor('RANDOM')
    .setTimestamp()
    .setFooter(`💡 ${message.author.tag}\n🛠️ v${client.version}\n`, message.author.avatarURL())
    .setImage("https://cdn.discordapp.com/attachments/783091756593053726/810591417838731315/1JOZT-rbar.gif")


//NO MENTIONS
if (!message.mentions.members.size) {
    //NO AVATAR
    if (!message.author.avatarURL()) {
      embed.setTitle(`${client.emotes.warn}  ${message.author.tag} nie ma avataru ¯\\_(ツ)_/¯`)
      await message.lineReplyNoMention(embed)
      if (reaction) await reaction.remove()
    //AVATAR
    } else {
      embed.setDescription(`${client.emotes.system}  Użyto komendy: **${message.content}**\n\n*${client.emotes.grverify} Pobierz avatar: [MAŁY](${message.author.displayAvatarURL()}) | [DUŻY](${message.author.displayAvatarURL()}?size=4096)*`)
      await message.lineReplyNoMention({embed, files: [`${message.author.displayAvatarURL()}?size=4096`]})
      if (reaction) await reaction.remove() 
        }
//SOMEONE MENTIONED
  } else {
      const mentioned = message.mentions.users.first()
     //NO AVATAR
     if (!mentioned.avatarURL()) {
        embed.setTitle(`${client.emotes.warn}  ${message.author.tag} nie ma avataru ¯\\_(ツ)_/¯`)
        await message.lineReplyNoMention(embed)
        if (reaction) await reaction.remove()
       //AVATAR
    } else {
      embed.setDescription(`${client.emotes.system}  Użyto komendy: **${message.content}**\n\n*${client.emotes.grverify} Pobierz avatar: [MAŁY](${mentioned.displayAvatarURL()}) | [DUŻY](${mentioned.displayAvatarURL()}?size=4096)*`)
      await message.lineReplyNoMention({embed, files: [`${mentioned.displayAvatarURL()}?size=4096`]})
      if (reaction) await reaction.remove()
      }
    }
  }
}