const { MessageEmbed } = require('discord.js');

module.exports = {
  name: "avatar",
  aliases: ["aa", "awatar"],
  description: 'Wyświetla avatar',
  category: 'avatar',
  utilisation: '{prefix}aa <wzmianka>',
  async execute(client, message, args, pf, cmd) {

    //Start; 1/3
    const reactionEmbed = new MessageEmbed()
    .setTitle(`${client.emotes.winLoad} Praca w toku... 1/3`)
    .setDescription(`${client.emotes.arrr} Tworzenie wiadomości...`)
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

      //CreateMsg
      let embed
      try { 
        embed = new MessageEmbed()
        .setColor('RANDOM')
        .setFooter(`💡 ${message.author.tag}\n🛠️ v${client.version} ┇ ⚡ RockyBot® 2021`, message.author.avatarURL({dynamic: true}))
      } catch (err) {
        errEmbed.setDescription(`${client.emotes.x} Tworzenie wiadomości`)
        reaction.edit(errEmbed)
        return;
      }

      //2/3
      reactionEmbed.setTitle(`${client.emotes.winLoad} Praca w toku... 2/3`)
      .setDescription(`${client.emotes.grverify} Tworzenie wiadomości\n${client.emotes.arrr} Sprawdzanie wzmianek...`)
      await reaction.edit(reactionEmbed)


      //NO MENTIONS
      if (!message.mentions.members.size) {
        
        //3/3
        reactionEmbed.setTitle(`${client.emotes.winLoad} Praca w toku... 3/3`)
        .setDescription(`${client.emotes.grverify} Tworzenie wiadomości\n${client.emotes.grverify} Nie znaleziono wzmianek: wybieranie ${message.author}\n${client.emotes.arrr} Załączanie avataru...`)
        await reaction.edit(reactionEmbed)

      //ADD AV TO MESSAGE
        try {
          await embed.setDescription(`${client.emotes.dwnld} Pobierz avatar: [MAŁY](${message.author.avatarURL({ dynamic: true})}) | [DUŻY](${message.author.avatarURL({ dynamic: true})}?size=4096)`)
          await message.lineReplyNoMention({embed, files: [`${message.author.avatarURL({ dynamic: true })}?size=4096`]})
        } catch (err) {
          errEmbed.setDescription(`${client.emotes.grverify} Tworzenie wiadomości\n${client.emotes.grverify} Nie znaleziono wzmianek: wybieranie ${message.author}\n${client.emotes.x} Załączanie avataru\n\n${client.emotes.warn} Prawdopodobnie nie masz avataru`)
          reaction.edit(errEmbed)
          return;
        }
    
      //SOMEONE MENTIONED
      } else {
        const mentioned = message.mentions.users.first()
        //3/3
        reactionEmbed.setTitle(`${client.emotes.winLoad} Praca w toku... 3/3`)
        .setDescription(`${client.emotes.grverify} Tworzenie wiadomości\n${client.emotes.grverify} Wzmianka: ${mentioned}\n${client.emotes.arrr} Załączanie avataru...`)
        await reaction.edit(reactionEmbed)

        //ADD AV TO MESSAGE
        try {
          embed.setDescription(`${client.emotes.dwnld} Pobierz avatar: [MAŁY](${mentioned.avatarURL({ dynamic: true})}) | [DUŻY](${mentioned.avatarURL({ dynamic: true})}?size=4096)`)
          await message.lineReplyNoMention({embed, files: [`${mentioned.avatarURL({ dynamic: true})}?size=4096`]})
        } catch (err) {
          errEmbed.setDescription(`${client.emotes.grverify} Tworzenie wiadomości\n${client.emotes.grverify} Wzmianka: ${mentioned}\n${client.emotes.x} Załączanie avataru\n\n${client.emotes.warn} Prawdopodobnie ${mentioned} nie ma avataru`)
          reaction.edit(errEmbed)
          return;
        }
        
      }

      //Ready
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