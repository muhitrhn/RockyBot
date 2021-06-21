const { MessageActionRow, MessageButton } = require('discord-buttons');
const { MessageEmbed } = require('discord.js');

module.exports = {
  name: "clear",
  aliases: ["mc"],
  description: "Czyści podaną liczbę wiadomości",
  category: 'moderation',
  utilisation: '{prefix}mc [liczba >0 i <1001]',

  async execute(client, message, args, pf, cmd) {
    
    const reaction = await client.base.get(`cmd`).start(client, message, cmd)

    try {
      const embed = new MessageEmbed()
      .setColor('RANDOM')
      .setFooter(`💡 ${message.author.tag}\n🛠️ v${client.version} ┇ ⚡ RockyBot® 2021`, message.author.avatarURL({dynamic: true}))

      let permsCheck = 2
      if (!message.guild.me.permissionsIn(message.channel).has('MANAGE_MESSAGES')) {
        permsCheck = 0
      } else if (!message.member.permissionsIn(message.channel).has('MANAGE_MESSAGES')  && !client.ownerID.includes(message.author.id)) {
        permsCheck = 1
      }

      if (permsCheck === 0) {
        //PermsCheck: missing bot perms
        embed.setTitle(`${client.emotes.siren}  Bot nie ma wymaganych uprawnień...`)
        .setDescription(`**...\`ZARZĄDZANIE WIADOMOŚCIAMI\`**`)
        .setThumbnail(client.cmds.errorImgs[Math.floor(Math.random() * client.cmds.errorImgs.length)])
        .setColor('RED')
        await reaction.edit({embed: embed})
        return;
      } else if (permsCheck === 1) {
        //PermsCheck: missing user perms
        embed.setTitle(`🔒  Nie masz wymaganych uprawnień...`)
        .setDescription(`**...\`ZARZĄDZANIE WIADOMOŚCIAMI\`**`)
        .setThumbnail(client.cmds.lockedImgs[Math.floor(Math.random() * client.cmds.lockedImgs.length)])
        .setColor('#FFC000')
        await reaction.edit({embed: embed})
        return;
      }
        
      //ArgsCheck
      const amount = parseInt(args[0])
      if (isNaN(amount) || amount < 1 || amount > 1000) {
        //No amount/bad amount
        embed.setTitle(`${client.emotes.world}  Podano złą liczbę wiadomości...`)
        .setDescription(`**...większa od 1000, mniejszą od 1 lub nie podano liczby**`)
        .setThumbnail(client.cmds.errorImgs[Math.floor(Math.random() * client.cmds.errorImgs.length)])
        .setColor('#FFC000')
        await reaction.edit({embed: embed})
        return;
      }

      embed.setTitle(`${client.emotes.siren}  Czy na pewno chcesz usunąć...`)
      .setDescription(`**...\`${amount}\` wiadomości?**`)
      .setThumbnail(client.cmds.loadingImgs[Math.floor(Math.random() * client.cmds.loadingImgs.length)])

      const button = new MessageButton()
      .setLabel("TAK")
      .setStyle("red")
      .setEmoji(client.emotes.grverify_ID)
      .setID(`delete`)
      const button2 = new MessageButton()
      .setLabel("NIE")
      .setStyle("green")
      .setEmoji(client.emotes.rverify_ID)
      .setID('cancel')
      const buttonRow = new MessageActionRow()
      .addComponent(button)
      .addComponent(button2)

      reaction.edit({embed: embed, component: buttonRow})

      const filter = (button) => button.clicker.user.id === message.author.id && button.id === 'delete';
      const filter2 = (button) => button.clicker.user.id === message.author.id && button.id === 'cancel';
      const filter3 = (button) => button.clicker.user.id !== message.author.id;
      const collector = reaction.createButtonCollector(filter, { time: 30000, dispose: true });
      const collector2 = reaction.createButtonCollector(filter2, { time: 30000, dispose: true });
      const collector3 = reaction.createButtonCollector(filter3, { time: 30000, dispose: true });

      collector3.on('collect', buttonClick => {
        const replyEmbed = new MessageEmbed().setColor('RED').setDescription(`**${client.emotes.grverify} Nie wywołałeś tej wiadomości**`).setFooter(`🛠️ v${client.version} ┇ ⚡ RockyBot® 2021 Reply Engine`, buttonClick.clicker.user.avatarURL({dynamic: true}))
        buttonClick.reply.send({ embed: replyEmbed, ephemeral: true })   
      })

      collector2.on('collect', buttonClick => {
        collector.stop()
        collector2.stop()
        collector3.stop()

        embed.setTitle(`${client.emotes.rverify}  Anulowano usuwanie...`)
        .setDescription(`**...\`${amount}\` wiadomości**`)
        .setThumbnail(client.cmds.errorImgs[Math.floor(Math.random() * client.cmds.errorImgs.length)])

        reaction.edit({embed: embed})
        return;
      })

      collector.on('collect', buttonClick => {
        collector.stop()
        collector2.stop()
        collector3.stop()

        client.commands.get("clear").clear(client, message, args, pf, cmd, reaction, embed, amount)
        return;
      })

    } catch (err) {
      await client.base.get(`cmd`).error(client, message, pf, cmd, reaction, err)
    }
  },

  async clear(client, message, args, pf, cmd, reaction, embed, amount) {
    try {
      embed.setTitle(`${client.emotes.winLoad}  Szybkie usuwanie wiadomości...`)
      .setThumbnail(client.cmds.moderationImgs.clearInProg[Math.floor(Math.random() * client.cmds.moderationImgs.clearInProg.length)])
      await reaction.edit({embed: embed})
        
      //FastDelete
      let deletedFast = 0, toDelete = []
      let deletingCache = amount
          
      for (;deletingCache > 98;) {
        await message.channel.messages.fetch({ limit: 100}).then(msgs => msgs.forEach(msg => toDelete.push(msg)))
        const deletable = toDelete.filter(mssg => mssg.id !== reaction.id && mssg.id !== message.id)
  
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
        const deletable = toDelete.filter(mssg => mssg.id !== reaction.id && mssg.id !== message.id)

        const deleting = await message.channel.bulkDelete(deletable, true)
        deletedFast = deletedFast + deleting.size
        toDelete = []
      }

      //Everything deleted
      let checkIfStop = []
      await message.channel.messages.fetch({ limit: 5 }).then(msgs => msgs.forEach(msg => checkIfStop.push(msg)))      
      if(amount - deletedFast === 0 || checkIfStop.length < 3) {
        embed.setTitle(`${client.emotes.trash}  Usunięto \`${deletedFast}\`/\`${amount}\` wiadomości`)
        .setDescription(``)
        .setThumbnail(client.cmds.moderationImgs.clear)
        await message.delete()
        await reaction.edit({embed: embed})
        return;
      }

      embed.setTitle(`${client.emotes.winLoad}  Wolne usuwanie pozostałych \`${amount - deletedFast}\` wiadomości...`)
      .setThumbnail(client.cmds.moderationImgs.clearInProg[Math.floor(Math.random() * client.cmds.moderationImgs.clearInProg.length)])
      await reaction.edit({embed: embed})
        
      //SlowDelete
      let deleting = [], deletedSlow = 0
      deletingCache = amount - deletedFast
      toDelete = []
          
      for (;deletingCache > 98;) {
        await message.channel.messages.fetch({ limit: 100}).then(msgs => msgs.forEach(msg => toDelete.push(msg)))
        const deletable = toDelete.filter(mssg => mssg.id !== reaction.id && mssg.id !== message.id)

        deletable.forEach(msg => {deleting.push(msg); msg.delete()})
        deletedSlow = deletedSlow + deleting.size
        deletingCache = deletingCache - deleting.size
        toDelete = []
      }
          
      if (deletingCache === 0) {} 
          
      else if (deletingCache < 99) {
        await  message.channel.messages.fetch({ limit: deletingCache + 2}).then(msgs => msgs.forEach(msg => toDelete.push(msg)))
        const deletable = toDelete.filter(mssg => mssg.id !== reaction.id && mssg.id !== message.id)

        deletable.forEach(msg => {deleting.push(msg); msg.delete()})
        deletedSlow = deletedSlow + deleting.size
        toDelete = []
      }
      deletedSlow = deleting.length

      await message.delete()

      //Ready
      embed.setTitle(`${client.emotes.trash}  Usunięto \`${deletedFast + deletedSlow}\`/\`${amount}\` wiadomości`)
      .setDescription(``)
      .setThumbnail(client.cmds.moderationImgs.clear)
      await reaction.edit({embed: embed})

    } catch (err) {
      await client.base.get(`cmd`).error(client, message, pf, cmd, reaction, err)
    }
  }
}