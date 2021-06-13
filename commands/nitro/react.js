const { MessageEmbed } = require('discord.js');

module.exports = {
    name: "react",
    aliases: ["nr"],
    description: 'Reaguje na podaną wiadomość',
    category: 'nitro',
    utilisation: '{prefix}react <numer wiadomosci, liczac od dolu, mniejszy niż 98> <nazwa emoji>',
    async execute(client, message, args, pf, cmd) {

   //Start; 1/4
   reactionEmbed = new MessageEmbed()
   .setTitle(`${client.emotes.winLoad} Praca w toku... 1/4`)
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
        if (!args[1]) {
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
        errorEmbed.setDescription(`${client.emotes.rverify} Sprawdzanie argumentów: **Nie napisałeś nazwy emoji lub numeru wiadomości**`)
        .setTitle(`${client.emotes.x}  Znaleziono problemy z argumentami`)
        .setColor('#FFC000')
        reaction.edit(errorEmbed)
        return;
        } } catch (err) {}

      //2/4
      reactionEmbed.setTitle(`${client.emotes.winLoad} Praca w toku... 2/4`)
      .setDescription(`${client.emotes.grverify} Sprawdzanie argumentów\n${client.emotes.google} Wyszukiwanie wiadomości...`)
      await reaction.edit(reactionEmbed)

      try {
        if (parseInt(args[0]) > 98) {
            errorEmbed.setDescription(`${client.emotes.grverify} Sprawdzanie argumentów\n${client.emotes.rverify} Wyszukiwanie wiadomości`)
            .setTitle(`${client.emotes.x}  Za duża liczba (większa od 98)`)
            reaction.edit(errorEmbed)
            return;
        }
        msgNumber = await parseInt(args[0])
        msg = await message.channel.messages.fetch(msgNumber + 2)
        mess = []
        await msg.forEach(mssg => mess.push(mssg))
      } catch (err) {
        errorEmbed.setDescription(`${client.emotes.grverify} Sprawdzanie argumentów\n${client.emotes.x} Wyszukiwanie wiadomości`)
        reaction.edit(errorEmbed)
        return;
      }

      if (!msgNumber) {
        errorEmbed.setDescription(`${client.emotes.grverify} Sprawdzanie argumentów\n${client.emotes.rverify} Wyszukiwanie wiadomości: **Nie znaleziono wiadomości**`)
        .setTitle(`${client.emotes.x}  Znaleziono problemy z szukaniem wiadomości`)
        .setColor('#FFC000')
        reaction.edit(errorEmbed)
        return;
    }

      //3/4
      reactionEmbed.setTitle(`${client.emotes.winLoad} Praca w toku... 3/4`)
      .setDescription(`${client.emotes.grverify} Sprawdzanie argumentów\n${client.emotes.grverify} Wyszukiwanie wiadomości\n${client.emotes.google} Wyszukiwanie emoji...`)
      await reaction.edit(reactionEmbed)

      try {

        emoji = await client.emojis.cache.find(emojii => emojii.name.toLowerCase().includes(args[1].toLowerCase()))

       } catch (err) {
        errorEmbed.setDescription(`${client.emotes.grverify} Sprawdzanie argumentów\n${client.emotes.grverify} Wyszukiwanie wiadomości\n${client.emotes.x} Wyszukiwanie emoji`)
        reaction.edit(errorEmbed)
        return;
       }

    if (!emoji) {
        errorEmbed.setDescription(`${client.emotes.grverify} Sprawdzanie argumentów\n${client.emotes.grverify} Wyszukiwanie wiadomości\n${client.emotes.rverify} Wyszukiwanie emoji: **Nie znaleziono emoji**`)
        .setTitle(`${client.emotes.x}  Znaleziono problemy z emoji`)
        .setColor('#FFC000')
        reaction.edit(errorEmbed)
        return;
    }

    //4/4
    reactionEmbed.setTitle(`${client.emotes.winLoad} Praca w toku... 4/4`)
    .setDescription(`${client.emotes.grverify} Sprawdzanie argumentów\n${client.emotes.grverify} Wyszukiwanie wiadomości\n${client.emotes.grverify} Wyszukiwanie emoji\n${client.emotes.google} Reagowanie...`)
    await reaction.edit(reactionEmbed)

      try {
        mess[parseInt(msgNumber) + 1].react(emoji)
      } catch (err) {
        errorEmbed.setDescription(`${client.emotes.grverify} Sprawdzanie argumentów\n${client.emotes.grverify} Wyszukiwanie wiadomości\n${client.emotes.grverify} Wyszukiwanie emoji\n${client.emotes.x} Reagowanie`)
        reaction.edit(errorEmbed)
        console.log(err)
        return;
      }

   //READY
   reactionEmbed.setTitle(`${client.emotes.nitro}  Zareagowano`)
   .setDescription(`${client.emotes.grverify} Sprawdzanie argumentów\n${client.emotes.grverify} Wyszukiwanie wiadomości\n${client.emotes.grverify} Wyszukiwanie emoji\n${client.emotes.grverify} Reagowanie`)
   await reaction.edit(reactionEmbed)
  }
}