const { MessageActionRow, MessageButton } = require('discord-buttons')
const { MessageEmbed } = require('discord.js')

module.exports = {
  name: 'clear',
  aliases: ['mc'],
  description: 'Czyści podaną liczbę wiadomości',
  category: 'moderation',
  utilisation: '{prefix}mc [liczba >0 i <1001]',

  async execute(client, message, args, pf, cmd) {
    const reaction = await client.base.get('cmd').start(client, message, cmd)

    try {
      const embed = new MessageEmbed()
      .setColor('RANDOM')
      .setFooter(`💡 ${message.author.tag}\n🛠️ v${client.version} ┇ ⚡ RockyBot® 2021`, message.author.displayAvatarURL({dynamic: true}))

      const missingPerms = 'ZARZĄDZANIE WIADOMOŚCIAMI'
      if (!message.guild.me.permissionsIn(message.channel).has('MANAGE_MESSAGES')) {
        //PermsCheck: missing bot perms
        const ifBot = 1
        await client.base.get('check').missingPerms(client, message, args, pf, cmd, reaction, missingPerms, ifBot)
        return
      } 
      else if (!message.member.permissionsIn(message.channel).has('MANAGE_MESSAGES')  && !client.ownerID.includes(message.author.id)) {
        //PermsCheck: missing user perms
        await client.base.get('check').missingPerms(client, message, args, pf, cmd, reaction, missingPerms)
        return
      }

      //ArgsCheck
      const amount = parseInt(args[0])
      if (isNaN(amount) || amount < 1 || amount > 1000) {
        //No amount/bad amount
        embed.setTitle(`${client.emotes.world}  Podano złą liczbę wiadomości...`)
        .setDescription('**...większa od 1000, mniejszą od 1 lub nie podano liczby**')
        .setThumbnail(client.cmds.errorImgs[Math.floor(Math.random() * client.cmds.errorImgs.length)])
        .setColor('#FFC000')
        await reaction.edit({embed: embed})
        return
      }

      embed.setTitle(`${client.emotes.siren}  Czy na pewno chcesz usunąć...`)
      .setDescription(`**...\`${amount}\` wiadomości?**`)
      .setThumbnail(client.cmds.loadingImgs[Math.floor(Math.random() * client.cmds.loadingImgs.length)])

      const button = new MessageButton()
      .setLabel('TAK')
      .setStyle('red')
      .setEmoji(client.emotes.grverify_ID)
      .setID('delete')
      const button2 = new MessageButton()
      .setLabel('NIE')
      .setStyle('green')
      .setEmoji(client.emotes.rverify_ID)
      .setID('cancel')
      const buttonRow = new MessageActionRow()
      .addComponent(button)
      .addComponent(button2)

      await reaction.edit({embed: embed, component: buttonRow})

      const filter = (button) => button.clicker.user.id === message.author.id && button.id === 'delete'
      const filter2 = (button) => button.clicker.user.id === message.author.id && button.id === 'cancel'
      const filter3 = (button) => button.clicker.user.id !== message.author.id
      const collector = reaction.createButtonCollector(filter, { time: 30000, dispose: true })
      const collector2 = reaction.createButtonCollector(filter2, { time: 30000, dispose: true })
      const collector3 = reaction.createButtonCollector(filter3, { time: 30000, dispose: true })

      collector3.on('collect', async buttonClick => {
        const replyEmbed = new MessageEmbed().setColor('RED').setDescription(`**${client.emotes.grverify} Nie wywołałeś tej wiadomości**`).setFooter(`🛠️ v${client.version} ┇ ⚡ RockyBot® 2021 Reply Engine`, buttonClick.clicker.user.displayAvatarURL({dynamic: true}))
        await buttonClick.reply.send({ embed: replyEmbed, ephemeral: true })
      })

      collector2.on('collect', async () => {
        await collector.stop()
        await collector2.stop()
        await collector3.stop()

        embed.setTitle(`${client.emotes.rverify}  Anulowano usuwanie...`)
        .setDescription(`**...\`${amount}\` wiadomości**`)
        .setThumbnail(client.cmds.errorImgs[Math.floor(Math.random() * client.cmds.errorImgs.length)])

        await reaction.edit({embed: embed})
        return
      })

      collector.on('collect', async () => {
        await collector.stop()
        await collector2.stop()
        await collector3.stop()

        await client.commands.get('clear').clear(client, message, args, pf, cmd, reaction, embed, amount)
        return
      })

    } 
    catch (err) {
      await client.base.get('cmd').error(client, message, pf, cmd, reaction, err)
    }
  },

  async clear(client, message, args, pf, cmd, reaction, embed, amount) {
    try {
      embed.setTitle(`${client.emotes.winLoad}  Szybkie usuwanie wiadomości...`)
      .setDescription('')
      .setThumbnail(client.cmds.moderationImgs.clearInProg[Math.floor(Math.random() * client.cmds.moderationImgs.clearInProg.length)])
      await reaction.edit({embed: embed})

      //FastDelete
      let deletedFast = 0, toDelete = []
      let deletingCache = amount
      let deleting

      for (;deletingCache > 98;) {
        await message.channel.messages.fetch({ limit: 100}).then(msgs => msgs.forEach(msg => toDelete.push(msg)))
        const deletable = toDelete.filter(mssg => mssg.id !== reaction.id && mssg.id !== message.id)

        deleting = await message.channel.bulkDelete(deletable, true)
        deletedFast = deletedFast*1 + deleting.size
        toDelete = []
        deletingCache = deletingCache - deleting.size
        if (deleting.size < 98) {
          break
        }
      }

      if (deletingCache < 99) {
        await message.channel.messages.fetch({ limit: deletingCache + 2 }).then(msgs => msgs.forEach(msg => toDelete.push(msg)))
        const deletable = toDelete.filter(mssg => mssg.id !== reaction.id)

        deleting = await message.channel.bulkDelete(deletable, true)
        deletedFast = deletedFast*1 + deleting.size
        toDelete = []
      }

      deletedFast = deletedFast - 1

      //Everything deleted
      let checkIfStop = []
      await message.channel.messages.fetch({ limit: 5 }).then(msgs => msgs.forEach(msg => checkIfStop.push(msg)))
      if((amount - deletedFast === 0) || (checkIfStop.length < 3)) {
        embed.setTitle(`${client.emotes.trash}  Usunięto \`${deletedFast}\`/\`${amount}\` wiadomości`)
        .setDescription('')
        .setThumbnail(client.cmds.moderationImgs.clear)
        await reaction.edit({embed: embed})
        return
      }

      embed.setTitle(`${client.emotes.winLoad}  Wolne usuwanie pozostałych \`${amount - deletedFast*1}\` wiadomości...`)
      .setThumbnail(client.cmds.moderationImgs.clearInProg[Math.floor(Math.random() * client.cmds.moderationImgs.clearInProg.length)])
      await reaction.edit({embed: embed})

      //SlowDelete
      deleting = []
      let deletedSlow = 0
      deletingCache = amount - deletedFast
      toDelete = []

      for (;deletingCache > 98;) {
        await message.channel.messages.fetch({ limit: 100}).then(msgs => msgs.forEach(msg => toDelete.push(msg)))
        const deletable = toDelete.filter(mssg => mssg.id !== reaction.id)

        deletable.forEach(msg => {deleting.push(msg); msg.delete()})
        deletedSlow = deletedSlow*1 + deleting.length
        deletingCache = deletingCache - deleting.length
        toDelete = []
        if (deleting.size < 98) {
          break
        }
      }

      if (deletingCache < 99) {
        await message.channel.messages.fetch({ limit: deletingCache + 1}).then(msgs => msgs.forEach(msg => toDelete.push(msg)))
        const deletable = toDelete.filter(mssg => mssg.id !== reaction.id)

        deletable.forEach(msg => {deleting.push(msg); msg.delete()})
        deletedSlow = deletedSlow*1 + deleting.length
        toDelete = []
      }

      //Ready
      embed.setTitle(`${client.emotes.trash}  Usunięto \`${deletedFast + deletedSlow}\`/\`${amount}\` wiadomości`)
      .setDescription('')
      .setThumbnail(client.cmds.moderationImgs.clear)
      await reaction.edit({embed: embed})
      return

    } 
    catch (err) {
      await client.base.get('cmd').error(client, message, pf, cmd, reaction, err)
    }
  }
}