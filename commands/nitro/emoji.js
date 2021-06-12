const { MessageEmbed } = require('discord.js');

module.exports = {
    name: "emoji",
    aliases: ["ne"],
    description: 'Wysyła emoji o podanej nazwie',
    category: 'nitro',
    utilisation: '{prefix}emoji <nazwa emoji>',
    async execute(client, message, args, pf, cmd) {

   //Start; 1/3
   reactionEmbed = new MessageEmbed()
   .setTitle(`${client.emotes.winLoad} Praca w toku... 1/3`)
   .setDescription(`${client.emotes.google} Sprawdzanie argumentów...`)
   .setThumbnail(`https://cdn.discordapp.com/attachments/850848194929492009/852901674997252106/1275442.png`)
   .setFooter(`💡 ${message.author.tag}\n🛠️ v${client.version} ┇ ⚡ RockyBot® 2021`, message.author.avatarURL({dynamic: true}))
   .setColor(`BLUE`)
   const reaction = await message.lineReplyNoMention(reactionEmbed)
   errorEmbed = new MessageEmbed()
   .setTitle(`${client.emotes.warn}  Wystąpił problem z komendą \`${pf}${cmd}\``)
   .setThumbnail(`https://cdn.discordapp.com/attachments/852928154691567669/852928290045427733/753345.png`)
   .setColor('RED')
   .setFooter(`💡 ${message.author.tag}\n🛠️ v${client.version} ┇ ⚡ RockyBot® 2021`, message.author.avatarURL({dynamic: true}));

    try { 
        if (!args[0]) {
            x = 0
        } else {
            x = 1
        }

    } catch (error) {
      errorEmbed.setDescription(`${client.emotes.x} Sprawdzanie argumentów`)
      reaction.edit(errorEmbed)
      return;
    }

    try {
        if(x === 0) {
        errorEmbed.setDescription(`${client.emotes.rverify} Sprawdzanie argumentów: **Nie napisałeś nazwy emoji**`)
        .setTitle(`${client.emotes.x}  Znaleziono problemy z argumentami`)
        .setColor('#FFC000')
        reaction.edit(errorEmbed)
        return;
        } } catch (err) {}

      //2/3
      reactionEmbed.setTitle(`${client.emotes.winLoad} Praca w toku... 2/3`)
      .setDescription(`${client.emotes.grverify} Sprawdzanie argumentów\n${client.emotes.google} Wyszukiwanie emoji...`)
      await reaction.edit(reactionEmbed)

      try {

        emoji = await client.emojis.cache.find(emojii => emojii.name.toLowerCase().includes(args[0].toLowerCase()))

       } catch (err) {
        errorEmbed.setDescription(`${client.emotes.grverify} Sprawdzanie argumentów\n${client.emotes.x} Wyszukiwanie emoji`)
        reaction.edit(errorEmbed)
        return;
       }

    if (!emoji) {
        errorEmbed.setDescription(`${client.emotes.grverify} Sprawdzanie argumentów\n${client.emotes.rverify} Wyszukiwanie emoji: **Nie znaleziono emoji**`)
        .setTitle(`${client.emotes.x}  Znaleziono problemy z emoji`)
        .setColor('#FFC000')
        reaction.edit(errorEmbed)
        return;
    }

    //3/3
    reactionEmbed.setTitle(`${client.emotes.winLoad} Praca w toku... 3/3`)
    .setDescription(`${client.emotes.grverify} Sprawdzanie argumentów\n${client.emotes.grverify} Wyszukiwanie emoji\n${client.emotes.google} Tworzenie wiadomości...`)
    await reaction.edit(reactionEmbed)

      try {
       const embed = new MessageEmbed()
       .setColor('RANDOM')
       .setFooter(`💡 ${message.author.tag}\n🛠️ v${client.version} ┇ ⚡ RockyBot® 2021`, message.author.avatarURL({dynamic: true}))
        embed.setImage(`https://cdn.discordapp.com/emojis/${emoji.id}.${emoji.animated ? `gif`: `png`}?size=128`)
       await message.lineReplyNoMention(embed)
      } catch (err) {
        errorEmbed.setDescription(`${client.emotes.grverify} Sprawdzanie argumentów\n${client.emotes.grverify} Wyszukiwanie emoji\n${client.emotes.x} Tworzenie wiadomości`)
        reaction.edit(errorEmbed)
        return;
      }

   //READY
   await reaction.delete() 

  }
}