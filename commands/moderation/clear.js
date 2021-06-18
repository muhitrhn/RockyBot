const { MessageEmbed } = require('discord.js');

module.exports = {
  name: "clear",
  aliases: ["mc"],
  description: "Czyści podaną liczbę wiadomości",
  category: 'moderation',
  utilisation: '{prefix}mc [liczba >0 i <1001]',

  async execute(client, message, args, pf, cmd) {
    
    //Start; 1/3
    const reactionEmbed = new MessageEmbed()
    .setTitle(`${client.emotes.winLoad} Praca w toku... 1/4`)
    .setDescription(`${client.emotes.arrr} Sprawdzanie permisji...`)
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
    
      //PermsCheck
      let permsCheck = 2
      try {
        if (!message.guild.me.permissionsIn(message.channel).has('MANAGE_MESSAGES')) {
          permsCheck = 0
        } else if (!message.member.permissionsIn(message.channel).has('MANAGE_MESSAGES')  && !client.ownerID.includes(message.author.id)) {
          permsCheck = 1
        }
      } 
      catch (err) {
        errEmbed.setDescription(`${client.emotes.x} Sprawdzanie permisji`)
        reaction.edit(errEmbed)
        return;
      }
    
      try {
        if(permsCheck === 0) {
          //PermsCheck: missing bot perms
          errEmbed.setThumbnail(`https://cdn.discordapp.com/attachments/852928154691567669/852976002178220052/891399.png`)
          .setDescription(`${client.emotes.rverify} Sprawdzanie permisji: **Brakujące uprawnienia BOTA: \`ZARZĄDZANIE WIADOMOŚCIAMI\`**`)
          .setTitle(`${client.emotes.warn}  Znaleziono problemy z permisjami`)
          .setColor('#FFC000')
          reaction.edit(errEmbed)
          return;
        } else if (permsCheck === 1) {
          //PermsCheck: missing user perms
          errEmbed.setThumbnail(`https://cdn.discordapp.com/attachments/852928154691567669/852976002178220052/891399.png`)
          .setDescription(`${client.emotes.rverify} Sprawdzanie permisji: **Brakujące uprawnienia: \`ZARZĄDZANIE WIADOMOŚCIAMI\`**`)
          .setTitle(`${client.emotes.warn}  Znaleziono problemy z permisjami`)
          .setColor('#FFC000')
          reaction.edit(errEmbed)
          return;
        }
      } catch (err) {return;}
      
      //2/4
      reactionEmbed.setTitle(`${client.emotes.winLoad} Praca w toku... 2/4`)
      .setDescription(`${client.emotes.grverify} Sprawdzanie permisji\n${client.emotes.arrr} Sprawdzanie argumentów...`)
      await reaction.edit(reactionEmbed)
        
      //ArgsCheck
      let amount
      try {
        amount = await parseInt(args[0])
        if (isNaN(amount) || amount < 1 || amount > 1000) {
          //No amount/bad amount
          errEmbed.setDescription(`${client.emotes.grverify} Sprawdzanie permisji\n${client.emotes.rverify} Sprawdzanie argumentów: **Zła liczba wiadomości**`)
          .setTitle(`${client.emotes.warn}  Znaleziono problemy z argumentami`)
          .setColor('#FFC000')
          reaction.edit(errEmbed)
          return;
          }
      } catch (err) {
        errEmbed.setDescription(`${client.emotes.grverify} Sprawdzanie permisji\n${client.emotes.x} Sprawdzanie argumentów`)
        reaction.edit(errEmbed)
        return;
      }
        
      //3/4
      reactionEmbed.setTitle(`${client.emotes.winLoad} Praca w toku... 3/4`)
      .setDescription(`${client.emotes.grverify} Sprawdzanie permisji\n${client.emotes.grverify} Sprawdzanie argumentów\n${client.emotes.arrr} Usuwanie wiadomości szybką metodą...`)
      await reaction.edit(reactionEmbed)

      //FastDelete
      let deletedFast = 0, toDelete = []
      let deletingCache = amount
      try {
          
        for (;deletingCache > 98;) {
          await message.channel.messages.fetch({ limit: 100}).then(msgs => msgs.forEach(msg => toDelete.push(msg)))
          const deletable = await toDelete.filter(mssg => mssg.id !== reaction.id && mssg.id !== message.id)
  
          const deleting = await message.channel.bulkDelete(deletable, true)
          deletedFast = deletedFast + deleting.size
          toDelete = []
          deletingCache = deletingCache - deleting.size
          if (deleting.size < 98) {
            break;
          }
        }
          
        if (deletingCache < 99) {
          await  message.channel.messages.fetch({ limit: deletingCache + 2 }).then(msgs => msgs.forEach(msg => toDelete.push(msg)))
          const deletable = await toDelete.filter(mssg => mssg.id !== reaction.id && mssg.id !== message.id)

          const deleting = await message.channel.bulkDelete(deletable, true)
          deletedFast = deletedFast + deleting.size
          toDelete = []
        }
      } catch (err) {
        errEmbed.setDescription(`${client.emotes.grverify} Sprawdzanie permisji\n${client.emotes.grverify} Sprawdzanie argumentów\n${client.emotes.x} Usuwanie wiadomości szybką metodą`)
        reaction.edit(errEmbed)
        return;
      }

      //Everything deleted
      let checkIfStop = []
      await message.channel.messages.fetch({ limit: 5 }).then(msgs => msgs.forEach(msg => checkIfStop.push(msg)))      
      if(amount - deletedFast === 0 || checkIfStop.length < 3) {
        reactionEmbed.setTitle(`${client.emotes.trash}  Usunięto \`${deletedFast}\`/\`${amount}\` wiadomości`)
        .setThumbnail(`https://cdn.discordapp.com/attachments/850848194929492009/853335731615039498/4883451.png`)
        .setDescription(`${client.emotes.grverify} Sprawdzanie permisji\n${client.emotes.grverify} Sprawdzanie argumentów\n${client.emotes.grverify} Usuwanie wiadomości szybką metodą: **${deletedFast}**`)
        .setColor('RANDOM')
        await message.delete()
        await reaction.edit(reactionEmbed)
        return;
      }

      //4/4
      reactionEmbed.setTitle(`${client.emotes.winLoad} Praca w toku... 4/4`)
      .setDescription(`${client.emotes.grverify} Sprawdzanie permisji\n${client.emotes.grverify} Sprawdzanie argumentów\n${client.emotes.grverify} Usuwanie wiadomości szybką metodą: **${deletedFast}**\n${client.emotes.arrr} Próba usunięcia **${amount - deletedFast}** wiadomości wolną metodą (starsze niż 14 dni)...${amount - deletedFast === 0 ? `` : `\n\n${client.emotes.siren} **Nie pisz NIC na kanale do czasu zakonczenia czyszczenia, może to zająć nawet kilkadziesiąt minut w zależności od liczby wiadomości...**`}`)
      await reaction.edit(reactionEmbed)
        
      //SlowDelete
      let deleting = [], deletedSlow = 0
      try {
        deletingCache = amount - deletedFast
        toDelete = []
          
        for (;deletingCache > 98;) {
          await message.channel.messages.fetch({ limit: 100}).then(msgs => msgs.forEach(msg => toDelete.push(msg)))
          const deletable = await toDelete.filter(mssg => mssg.id !== reaction.id && mssg.id !== message.id)

          await deletable.forEach(msg => {deleting.push(msg); msg.delete()})
          deletedSlow = deletedSlow + deleting.size
          deletingCache = deletingCache - deleting.size
          toDelete = []
        }
          
        if (deletingCache === 0) {} 
          
        else if (deletingCache < 99) {
          await  message.channel.messages.fetch({ limit: deletingCache + 2}).then(msgs => msgs.forEach(msg => toDelete.push(msg)))
          const deletable = await toDelete.filter(mssg => mssg.id !== reaction.id && mssg.id !== message.id)

          await deletable.forEach(msg => {deleting.push(msg); msg.delete()})
          deletedSlow = deletedSlow + deleting.size
          toDelete = []
        }
        deletedSlow = deleting.length
        await message.delete()
      } catch (err) {
        errEmbed.setDescription(`${client.emotes.grverify} Sprawdzanie permisji\n${client.emotes.grverify} Sprawdzanie argumentów\n${client.emotes.grverify} Usuwanie wiadomości szybką metodą: **${deletedFast}**\n${client.emotes.x} Próba usunięcia **${amount - deletedFast}** wiadomości wolną metodą (starsze niż 14 dni)`)
        reaction.edit(errEmbed)
        return;
      }
        
      //Ready
      reactionEmbed.setTitle(`${client.emotes.trash}  Usunięto \`${deletedFast + deletedSlow}\`/\`${amount}\` wiadomości`)
      .setThumbnail(`https://cdn.discordapp.com/attachments/850848194929492009/853335731615039498/4883451.png`)
      .setDescription(`${client.emotes.grverify} Sprawdzanie permisji\n${client.emotes.grverify} Sprawdzanie argumentów\n${client.emotes.grverify} Usuwanie wiadomości szybką metodą: **${deletedFast}**\n${client.emotes.grverify} Usuwanie wiadomości wolną metodą (starsze niż 14 dni): **${deletedSlow}**`)
      .setColor('RANDOM')
      await reaction.edit(reactionEmbed)

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