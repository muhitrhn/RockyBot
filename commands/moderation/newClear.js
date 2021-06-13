const { MessageEmbed } = require('discord.js');

  module.exports = {
    name: "newClear",
    aliases: ["mnc"],
    description: "Czyści podaną liczbę wiadomości",
    category: 'moderation',
    utilisation: '{prefix}clear [liczba >0 i <1001]',

    async execute(client, message, args, pf, cmd) {

      //Start; 1/3
      reactionEmbed = new MessageEmbed()
      .setTitle(`${client.emotes.winLoad} Praca w toku... 1/4`)
      .setDescription(`${client.emotes.google} Sprawdzanie permisji...`)
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
           if (!message.guild.me.hasPermission('MANAGE_MESSAGES')) {
               x = 0
           } else if (!message.member.hasPermission('MANAGE_MESSAGES')  && !client.ownerID.includes(message.author.id)) {
               x = 1
           } else {
             x = 2
           }
   
       } catch (error) {
         errorEmbed.setDescription(`${client.emotes.x} Sprawdzanie permisji`)
         reaction.edit(errorEmbed)
         return;
       }
   
       try {
          if(x === 0) {
            errorEmbed.setThumbnail(`https://cdn.discordapp.com/attachments/852928154691567669/852976002178220052/891399.png`)
            .setDescription(`${client.emotes.rverify} Sprawdzanie permisji: **Brakujące uprawnienia BOTA: \`ZARZĄDZANIE WIADOMOŚCIAMI\`**`)
            .setTitle(`${client.emotes.x}  Znaleziono problemy z permisjami`)
            .setColor('#FFC000')
            reaction.edit(errorEmbed)
            return;
        } else if (x === 1) {
            errorEmbed.setThumbnail(`https://cdn.discordapp.com/attachments/852928154691567669/852976002178220052/891399.png`)
            .setDescription(`${client.emotes.rverify} Sprawdzanie permisji: **Brakujące uprawnienia: \`ZARZĄDZANIE WIADOMOŚCIAMI\`**`)
            .setTitle(`${client.emotes.x}  Znaleziono problemy z permisjami`)
            .setColor('#FFC000')
            reaction.edit(errorEmbed)
            return;
        }
      } catch (err) {}
   
         //2/4
         reactionEmbed.setTitle(`${client.emotes.winLoad} Praca w toku... 2/4`)
         .setDescription(`${client.emotes.grverify} Sprawdzanie permisji\n${client.emotes.google} Sprawdzanie argumentów...`)
         await reaction.edit(reactionEmbed)
   
         try {
          amount = await parseInt(args[0])
          toDelete = []
          if (isNaN(amount) || amount < 1 || amount > 1000) {
            errorEmbed.setDescription(`${client.emotes.grverify} Sprawdzanie permisji\n${client.emotes.rverify} Sprawdzanie argumentów: **Zła liczba wiadomości**`)
            .setTitle(`${client.emotes.x}  Znaleziono problemy z argumentami`)
            .setColor('#FFC000')
            reaction.edit(errorEmbed)
            return;
          }
   
          } catch (err) {
           errorEmbed.setDescription(`${client.emotes.grverify} Sprawdzanie permisji\n${client.emotes.x} Sprawdzanie argumentów`)
           reaction.edit(errorEmbed)
           return;
          }
   
       //3/4
       reactionEmbed.setTitle(`${client.emotes.winLoad} Praca w toku... 3/4`)
       .setDescription(`${client.emotes.grverify} Sprawdzanie permisji\n${client.emotes.grverify} Sprawdzanie argumentów\n${client.emotes.google} Usuwanie wiadomości szybką metodą...`)
       await reaction.edit(reactionEmbed)
   
         try {
          deletingCache = amount
          deletedFast = 0
          toDelete = []

          for (;deletingCache > 98;) { 

          await message.channel.messages.fetch({ limit: 100}).then(msgs => msgs.forEach(msg => toDelete.push(msg)))
          const deletable = await toDelete.filter(mssg => mssg.id !== reaction.id && mssg.id !== message.id)
 
          const deleting = await message.channel.bulkDelete(deletable, true)
          deletedFast = await deletedFast + deleting.size
          toDelete = await []
          if (deleting.size < 98) {
            deletingCache = await deletingCache - deleting.size;
            break;
          }
          deletingCache = await deletingCache - deleting.size
        }

         if (deletingCache < 99) {
         await  message.channel.messages.fetch({ limit: deletingCache + 2}).then(msgs => msgs.forEach(msg => toDelete.push(msg)))
         const deletable = await toDelete.filter(mssg => mssg.id !== reaction.id && mssg.id !== message.id)

         const deleting = await message.channel.bulkDelete(deletable, true)
         deletedFast = await deletedFast + deleting.size
         toDelete = await []
        }

         } catch (err) {
           errorEmbed.setDescription(`${client.emotes.grverify} Sprawdzanie permisji\n${client.emotes.grverify} Sprawdzanie argumentów\n${client.emotes.x} Usuwanie wiadomości szybką metodą`)
           reaction.edit(errorEmbed)
           return;
         }

      //4/4
       reactionEmbed.setTitle(`${client.emotes.winLoad} Praca w toku... 4/4`)
       .setDescription(`${client.emotes.grverify} Sprawdzanie permisji\n${client.emotes.grverify} Sprawdzanie argumentów\n${client.emotes.grverify} Usuwanie \`${deletedFast}\` wiadomości szybką metodą\n${client.emotes.google} Usuwanie \`${amount - deletedFast}\` wiadomości wolną metodą (starsze niż 14 dni)...${amount - deletedFast === 0 ? `` : `\n\n${client.emotes.siren} **Nie pisz NIC na kanale do czasu zakonczenia czyszczenia, może to zająć nawet kilkadziesiąt minut w zależności od liczby wiadomości...**`}`)
       await reaction.edit(reactionEmbed)
      
       try {
       deletingCache = amount - deletedFast
       toDelete = []
       deleting = []
       deletedSlow = 0

       for (;deletingCache > 98;) { 

        await message.channel.messages.fetch({ limit: 100}).then(msgs => msgs.forEach(msg => toDelete.push(msg)))
        const deletable = await toDelete.filter(mssg => mssg.id !== reaction.id && mssg.id !== message.id)

        await deletable.forEach(msg => {deleting.push(msg); msg.delete()})
        deletedSlow = await deletedSlow + deleting.size
        deletingCache = await deletingCache - deleting.size
        toDelete = await []
        }
        if (deletingCache === 0) {

        } else if (deletingCache < 99) {
       await  message.channel.messages.fetch({ limit: deletingCache + 2}).then(msgs => msgs.forEach(msg => toDelete.push(msg)))
       const deletable = await toDelete.filter(mssg => mssg.id !== reaction.id && mssg.id !== message.id)

       await deletable.forEach(msg => {deleting.push(msg); msg.delete()})
       deletedSlow = await deletedSlow + deleting.size
       toDelete = await []
       }  
      deletedSlow = await deleting.length 
      message.delete()
    } catch (err) {
        errorEmbed.setDescription(`${client.emotes.grverify} Sprawdzanie permisji\n${client.emotes.grverify} Sprawdzanie argumentów\n${client.emotes.grverify} Usuwanie \`${deletedFast}\` wiadomości szybką metodą\n${client.emotes.x} Usuwanie wiadomości wolną metodą (starsze niż 14 dni)`)
        reaction.edit(errorEmbed)
        return;
       }


         reactionEmbed.setTitle(`${client.emotes.trash}  Usunięto \`${deletedFast + deletedSlow}\`/\`${amount}\` wiadomości`)
         .setThumbnail(`https://cdn.discordapp.com/attachments/850848194929492009/853335731615039498/4883451.png`)
         .setDescription(`${client.emotes.grverify} Sprawdzanie permisji\n${client.emotes.grverify} Sprawdzanie argumentów\n${client.emotes.grverify} Usuwanie \`${deletedFast}\` wiadomości szybką metodą\n${client.emotes.grverify} Usuwanie \`${deletedSlow}\` wiadomości wolną metodą (starsze niż 14 dni)`)
         .setColor('RANDOM')
         await reaction.edit(reactionEmbed)
     }
}