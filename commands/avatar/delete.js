const { MessageEmbed,MessageAttachment } = require('discord.js');
const DIG = require("discord-image-generation");

module.exports = {
  name: "delete",
  aliases: ["ad"],
  description: 'Wrzuć kogoś do kosza',
  category: 'avatar',
  utilisation: '{prefix}ad <wzmianka>',
  async execute(client, message, args, pf, cmd) {
    
    //Start
    const reactionEmbed = new MessageEmbed()
    .setTitle(`${client.emotes.winLoad} Praca w toku... 1/3`)
    .setDescription(`${client.emotes.arrr} Sprawdzanie wzmianek...`)
    .setThumbnail(`https://cdn.discordapp.com/attachments/850848194929492009/852901674997252106/1275442.png`)
    .setFooter(`💡 ${message.author.tag}\n🛠️ v${client.version} ┇ ⚡ RockyBot® 2021`, message.author.avatarURL({dynamic: true}))
    .setColor(`BLUE`)

    const reaction = await message.lineReplyNoMention(reactionEmbed)

    try {
      const errEmbed = new MessageEmbed()
      .setTitle(`${client.emotes.warn}  Wystąpił problem z komendą \`${pf}${cmd}\``)
      .setThumbnail(`https://cdn.discordapp.com/attachments/852928154691567669/852928290045427733/753345.png`)
      .setColor('RED')
      .setFooter(`💡 ${message.author.tag}\n🛠️ v${client.version} ┇ ⚡ RockyBot® 2021`, message.author.avatarURL({dynamic: true}));
        
      //NO MENTIONS
      if (!message.mentions.members.size) {
        
        reactionEmbed.setTitle(`${client.emotes.winLoad} Praca w toku... 2/3`)
        .setDescription(`${client.emotes.grverify} Nie znaleziono wzmianek: wybieranie ${message.author}\n${client.emotes.arrr} Przerabianie avataru...`)
        await reaction.edit(reactionEmbed)
    
        //CREATE IMAGE
        let doneAv
        try {
          doneAv = await new DIG.Delete().getImage(`${message.author.avatarURL({ dynamic: false, format: "png" })}?size=4096`)
        } catch (err) {
          errEmbed.setDescription(`${client.emotes.grverify} Nie znaleziono wzmianek: wybieranie ${message.author}\n${client.emotes.x} Przerabianie avataru`)
          reaction.edit(errEmbed)
          return;
        }

        reactionEmbed.setTitle(`${client.emotes.winLoad} Praca w toku... 3/3`)
        .setDescription(`${client.emotes.grverify} Nie znaleziono wzmianek: wybieranie ${message.author}\n${client.emotes.grverify} Przerabianie avataru\n${client.emotes.arrr} Załączanie avataru...`)
        await reaction.edit(reactionEmbed)

        //ATTACH AV
        try {
          const embed = new MessageEmbed()
          .setColor('RANDOM')
          .setFooter(`💡 ${message.author.tag}\n🛠️ v${client.version} ┇ ⚡ RockyBot® 2021`, message.author.avatarURL({dynamic: true}))
          const attachment = new MessageAttachment(doneAv, "xD.png")
          await message.lineReplyNoMention({embed, files: [attachment]})
        } catch (err) {
          errEmbed.setDescription(`${client.emotes.grverify} Nie znaleziono wzmianek: wybieranie ${message.author}\n${client.emotes.grverify} Przerabianie avataru\n${client.emotes.x} Załączanie avataru`)
          reaction.edit(errEmbed)
          return;
        }
      //SOMEONE MENTIONED
      } else {
        const mentioned = message.mentions.users.first()
        //3/4
        reactionEmbed.setTitle(`${client.emotes.winLoad} Praca w toku... 3/3`)
        .setDescription(`${client.emotes.grverify} Wzmianka: ${mentioned}\n${client.emotes.arrr} Przerabianie avataru...`)
        await reaction.edit(reactionEmbed)
    
        //CREATE IMAGE
        let doneAv
        try {
          doneAv = await new DIG.Delete().getImage(`${mentioned.avatarURL({ dynamic: false, format: "png" })}?size=4096`)
        } catch (err) {
          errEmbed.setDescription(`${client.emotes.grverify} Wzmianka: ${mentioned}\n${client.emotes.x} Przerabianie avataru`)
          reaction.edit(errEmbed)
          return;
        }

        reactionEmbed.setTitle(`${client.emotes.winLoad} Praca w toku... 3/3`)
        .setDescription(`${client.emotes.grverify} Wzmianka: ${mentioned}\n${client.emotes.grverify} Przerabianie avataru\n${client.emotes.arrr} Załączanie avataru...`)
        await reaction.edit(reactionEmbed)

        //ATTACH AV
        try {
          const attachment = new MessageAttachment(doneAv, "xD.png")
          await message.lineReplyNoMention({embed, files: [attachment]})
        } catch (err) {
          errEmbed.setDescription(`${client.emotes.grverify} Wzmianka: ${mentioned}\n${client.emotes.grverify} Przerabianie avataru\n${client.emotes.x} Załączanie avataru`)
          reaction.edit(errEmbed)
          return;
        }
          
      }
      //READY
      await reaction.delete() 
    } catch (err) {
      const embed = new MessageEmbed()
      .setTitle(`${client.emotes.warn}  Zatrzymano komendę \`${cmd}\` z powodu wycieku błędu`)
      .setThumbnail(`https://cdn.discordapp.com/attachments/850848194929492009/854001906962530334/1810746.png`)
      .setFooter(`💡 ${message.author.tag}\n🛠️ v${client.version} ┇ ⚡ RockyBot® 2021`, message.author.avatarURL({dynamic: true}))
      .setColor('RED')
      try {await reaction.delete()} catch (err) {}
      await message.channel.send(embed)
      return;
    }
  }
}