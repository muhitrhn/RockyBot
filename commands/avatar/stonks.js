const { MessageEmbed,MessageAttachment } = require('discord.js');
const DIG = require("discord-image-generation");

module.exports = {
    name: "stonks",
    aliases: ["as"],
    description: 'STONKS!',
    category: 'avatar',
    utilisation: '{prefix}stonks <wzmianka>',
    async execute(client, message) {

        reaction = await message.react(client.emotes.google)
        embed = new MessageEmbed()
        .setColor('RANDOM')
        .setTimestamp()
        .setFooter(`💡 ${message.author.tag}\n🛠️ v${client.version}\n`, message.author.displayAvatarURL({dynamic: true}))
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
          embed.setDescription(`${client.emotes.system}  Użyto komendy: **${message.content}**`)
          new DIG.Stonk().getImage(`${message.author.displayAvatarURL({ dynamic: false, format: "png" })}?size=4096`).then(async image => {
            let attachment = new MessageAttachment(image, "stonks.png")
            await message.lineReplyNoMention({embed, files: [attachment]})
            if (reaction) await reaction.remove()
          })
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
            embed.setDescription(`${client.emotes.system}  Użyto komendy: **${message.content}**`)
            new DIG.Stonk().getImage(`${mentioned.displayAvatarURL({ dynamic: false, format: "png" })}?size=4096`).then(async image => {
              let attachment = new MessageAttachment(image, "stonks.png")
              await message.lineReplyNoMention({embed, files: [attachment]})
              if (reaction) await reaction.remove()
            })
          }
        }
      }
}