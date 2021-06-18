const { MessageEmbed } = require('discord.js');

module.exports = {
  name: "emoji",
  aliases: ["ne"],
  description: 'Wysyła emoji o podanej nazwie',
  category: 'nitro',
  utilisation: '{prefix}ne [nazwa emoji]',
  
  async execute(client, message, args, pf, cmd) {
    
    //Start; 1/5
    const reactionEmbed = new MessageEmbed()
    .setTitle(`${client.emotes.winLoad} Praca w toku... 1/5`)
    .setDescription(`${client.emotes.arrr} Sprawdzanie argumentów...`)
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

      //ArgsCheck
      let argsCheck = 0
      try { 
        if (args[0]) {
          argsCheck = 1
        }
      } catch (err) {
        errEmbed.setDescription(`${client.emotes.x} Sprawdzanie argumentów`)
        reaction.edit(errEmbed)
        return;
      }

      try {
        if(argsCheck === 0) {
          //ArgsCheck err
          errEmbed.setDescription(`${client.emotes.rverify} Sprawdzanie argumentów: **Nie napisałeś nazwy emoji**`)
          .setTitle(`${client.emotes.warn}  Znaleziono problemy z argumentami`)
          .setColor('#FFC000')
          reaction.edit(errEmbed)
          return;
        } 
      } catch (err) {return;}

      //2/5
      reactionEmbed.setTitle(`${client.emotes.winLoad} Praca w toku... 2/5`)
      .setDescription(`${client.emotes.grverify} Sprawdzanie argumentów\n${client.emotes.arrr} Wyszukiwanie emoji...`)
      await reaction.edit(reactionEmbed)

      //EmjFind
      let emoji
      try {
        
        emoji = await client.emojis.cache.find(emojii => emojii.name.toLowerCase().includes(args[0].toLowerCase()))
      
      } catch (err) {
        errEmbed.setDescription(`${client.emotes.grverify} Sprawdzanie argumentów\n${client.emotes.x} Wyszukiwanie emoji`)
        reaction.edit(errEmbed)
        return;
      }

      //Emj not found
      if (!emoji) {
        errEmbed.setDescription(`${client.emotes.grverify} Sprawdzanie argumentów\n${client.emotes.rverify} Wyszukiwanie emoji: **Nie znaleziono emoji**`)
        .setTitle(`${client.emotes.warn}  Znaleziono problemy z emoji`)
        .setColor('#FFC000')
        reaction.edit(errEmbed)
        return;
      }

      //3/5
      reactionEmbed.setTitle(`${client.emotes.winLoad} Praca w toku... 3/5`)
      .setDescription(`${client.emotes.grverify} Sprawdzanie argumentów\n${client.emotes.grverify} Wyszukiwanie emoji\n${client.emotes.arrr} Sprawdzanie webhooków...`)
      await reaction.edit(reactionEmbed)

      //WebhksChk
      let webhksCheck
      let myWebhooks
      try {
        const webhooks = await message.channel.fetchWebhooks()
        myWebhooks = await webhooks.filter(wbhk => wbhk.owner.id == client.user.id)
        if (!myWebhooks.first()) {
          webhksCheck = 0
        }
        else {
          webhksCheck = 1
        }
      } catch (err) {
        errEmbed.setDescription(`${client.emotes.grverify} Sprawdzanie argumentów\n${client.emotes.grverify} Wyszukiwanie emoji\n${client.emotes.x} Sprawdzanie webhooków`)
        reaction.edit(errEmbed)
        console.log(err)
        return;
      }

      //4/5
      reactionEmbed.setTitle(`${client.emotes.winLoad} Praca w toku... 4/5`)
      .setDescription(`${client.emotes.grverify} Sprawdzanie argumentów\n${client.emotes.grverify} Wyszukiwanie emoji\n${client.emotes.grverify} Sprawdzanie webhooków\n${client.emotes.arrr} ${webhksCheck ? `Edytowanie` : `Tworzenie`} webhooka...`)
      await reaction.edit(reactionEmbed)

      let webhook
      try {
        if (webhksCheck === 0) {
          //Create webhook
          webhook = await message.channel.createWebhook(message.author.username, { avatar: message.author.avatarURL() })
        }
        else {
          //Edit webhook
          webhook = await myWebhooks.first().edit({
            name: message.author.username,
            avatar: message.author.avatarURL(),
          })
        }
      } catch (err) {
        errEmbed.setDescription(`${client.emotes.grverify} Sprawdzanie argumentów\n${client.emotes.grverify} Wyszukiwanie emoji\n${client.emotes.grverify} Sprawdzanie webhooków\n${client.emotes.x} ${webhksCheck ? `Edytowanie` : `Tworzenie`} webhooka`)
        reaction.edit(errEmbed)
        console.log(err)
        return;
      }

      //5/5
      reactionEmbed.setTitle(`${client.emotes.winLoad} Praca w toku... 5/5`)
      .setDescription(`${client.emotes.grverify} Sprawdzanie argumentów\n${client.emotes.grverify} Wyszukiwanie emoji\n${client.emotes.grverify} Sprawdzanie webhooków\n${client.emotes.grverify} ${webhksCheck ? `Edytowanie` : `Tworzenie`} webhooka\n${client.emotes.arrr} Sprawdzanie uprawnień webhooka...`)
      await reaction.edit(reactionEmbed)

      let webhksPermsCheck
      try {
      if (message.guild.roles.everyone.permissionsIn(message.channel).has('USE_EXTERNAL_EMOJIS')) {
        //Webhook has perms
        await webhook.send(emoji.toString())
        webhksPermsCheck = 1
      } else {
        //Err webhks perms
        webhksPermsCheck = 0
      }
      } catch (err) {
      errEmbed.setDescription(`${client.emotes.grverify} Sprawdzanie argumentów\n${client.emotes.grverify} Wyszukiwanie emoji\n${client.emotes.grverify} Sprawdzanie webhooków\n${client.emotes.grverify} ${webhksCheck ? `Edytowanie` : `Tworzenie`} webhooka\n${client.emotes.x} Sprawdzanie uprawnień webhooka`)
      await reaction.edit(errEmbed)
      return;
      }

      if (webhksPermsCheck === 1) {
        //READY
        reactionEmbed.setTitle(`${client.emotes.nitro}  Wysłano emoji`)
        .setThumbnail('https://cdn.discordapp.com/attachments/850848194929492009/852278226364792893/190411.png')
        .setColor('GREEN')
        .setDescription(`${client.emotes.grverify} Sprawdzanie argumentów\n${client.emotes.grverify} Wyszukiwanie emoji\n${client.emotes.grverify} Sprawdzanie webhooków\n${client.emotes.grverify} ${webhksCheck ? `Edytowanie` : `Tworzenie`} webhooka\n${client.emotes.grverify} Sprawdzanie uprawnień webhooka`)
        await reaction.edit(reactionEmbed)
        return;
      }

      //6/5; break requirements
      reactionEmbed.setTitle(`${client.emotes.winLoad} Omijanie uprawnień... `)
      .setDescription(`${client.emotes.grverify} Sprawdzanie argumentów\n${client.emotes.grverify} Wyszukiwanie emoji\n${client.emotes.grverify} Sprawdzanie webhooków\n${client.emotes.grverify} ${webhksCheck ? `Edytowanie` : `Tworzenie`} webhooka\n${client.emotes.rverify} Sprawdzanie uprawnień webhooka\n${client.emotes.arrr} Zmienianie uprawnień kanału...`)
      await reaction.edit(reactionEmbed)

      //Change channel perms
      try {
        await message.channel.updateOverwrite(message.guild.roles.everyone, { USE_EXTERNAL_EMOJIS: true })
      } catch (err) {
        errEmbed.setDescription(`${client.emotes.grverify} Sprawdzanie argumentów\n${client.emotes.grverify} Wyszukiwanie emoji\n${client.emotes.grverify} Sprawdzanie webhooków\n${client.emotes.grverify} ${webhksCheck ? `Edytowanie` : `Tworzenie`} webhooka\n${client.emotes.rverify} Sprawdzanie uprawnień webhooka\n${client.emotes.rverify} Zmienianie uprawnień kanału: **Nie mam wymaganych uprawnień**`)
        .setTitle(`${client.emotes.x}  Znaleziono problemy z łamaniem uprawnień`)
        .setColor('#FFC000')
        reaction.edit(errEmbed)
        console.log(err)
        return;
      }

      //7/5; repair role
      reactionEmbed.setTitle(`${client.emotes.winLoad} Naprawianie uprawnień... `)
      .setDescription(`${client.emotes.grverify} Sprawdzanie argumentów\n${client.emotes.grverify} Wyszukiwanie emoji\n${client.emotes.grverify} Sprawdzanie webhooków\n${client.emotes.grverify} ${webhksCheck ? `Edytowanie` : `Tworzenie`} webhooka\n${client.emotes.rverify} Sprawdzanie uprawnień webhooka\n${client.emotes.grverify} Zmienianie uprawnień kanału\n${client.emotes.arrr} Przywracanie uprawnień kanału...`)
      await reaction.edit(reactionEmbed)

      //Send emj & repair channel perms
      try {
        await webhook.send(emoji.toString())

        if (message.guild.roles.everyone.permissions.toArray().includes('USE_EXTERNAL_EMOJIS')) {
          await message.channel.updateOverwrite(message.guild.roles.everyone, { USE_EXTERNAL_EMOJIS: false })
        } else {
          await message.channel.updateOverwrite(message.guild.roles.everyone, { USE_EXTERNAL_EMOJIS: null })
        }
      } catch (err) {
        errEmbed.setDescription(`${client.emotes.grverify} Sprawdzanie argumentów\n${client.emotes.grverify} Wyszukiwanie emoji\n${client.emotes.grverify} Sprawdzanie webhooków\n${client.emotes.grverify} ${webhksCheck ? `Edytowanie` : `Tworzenie`} webhooka\n${client.emotes.rverify} Sprawdzanie uprawnień webhooka\n${client.emotes.grverify} Zmienianie uprawnień kanału\n${client.emotes.x} Przywracanie uprawnień kanału`)
        await reaction.edit(errEmbed)
        return;
      }

      reactionEmbed.setTitle(`${client.emotes.nitro}  Wysłano emoji`)
      .setColor('GREEN')
      .setThumbnail('https://cdn.discordapp.com/attachments/850848194929492009/852278226364792893/190411.png')
      .setDescription(`${client.emotes.grverify} Sprawdzanie argumentów\n${client.emotes.grverify} Wyszukiwanie emoji\n${client.emotes.grverify} Sprawdzanie webhooków\n${client.emotes.grverify} ${webhksCheck ? `Edytowanie` : `Tworzenie`} webhooka\n${client.emotes.rverify} Sprawdzanie uprawnień webhooka\n${client.emotes.grverify} Zmienianie uprawnień kanału\n${client.emotes.grverify} Przywracanie uprawnień kanału`)
      await reaction.edit(reactionEmbed)
      return; 
  
    } catch (err) {
      const embed = new MessageEmbed()
      .setTitle(`${client.emotes.warn}  Zatrzymano komendę \`${cmd}\` z powodu wycieku błędu`)
      .setThumbnail(`https://cdn.discordapp.com/attachments/850848194929492009/854001906962530334/1810746.png`)
      .setFooter(`💡 ${message.author.tag}\n🛠️ v${client.version} ┇ ⚡ RockyBot® 2021`, message.author.avatarURL({dynamic: true}))
      .setColor('RED')
      try {await reaction.delete()} catch (err) {}
      await message.channel.send(embed)
      console.log(err)
      return;
    }
  }
}