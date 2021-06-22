const { MessageActionRow, MessageButton } = require('discord-buttons')
const { MessageEmbed } = require('discord.js')
const warnModel = require('../../models/warns')

module.exports = {
  name: 'warndelete',
  aliases: ['mwd', 'mwr', 'warnremove', 'warndelete'],
  description: 'Nadaj ostrzeżenie',
  category: 'moderation',
  utilisation: '{prefix}mwd [globID warna/(wzmianka/id) użytkownika] ',
  async execute(client, message, args, pf, cmd) {

    const reaction = await client.base.get('cmd').start(client, message, cmd)
    try {

      const mentioned = await client.base.get('check').member(client, message, args)

      const embed = new MessageEmbed()
      .setColor('RANDOM')
      .setFooter(`💡 ${message.author.tag}\n🛠️ v${client.version} ┇ ⚡ RockyBot® 2021`, message.author.displayAvatarURL({dynamic: true}))

      if (!message.member.permissionsIn(message.channel).has('MANAGE_MESSAGES')  && !client.ownerID.includes(message.author.id)) {
        //PermsCheck: missing user perms
        const missingPerms = 'ZARZĄDZANIE WIADOMOŚCIAMI'
        await client.base.get('check').missingPerms(client, message, args, pf, cmd, reaction, missingPerms)
        return
      }

      if (args[0] === `<@${mentioned.id}>` || args[0] === `<@!${mentioned.id}>` || args[0] === mentioned.id) {
        const userWarns = await warnModel.find({ GuildID: message.guild.id, User: mentioned.id })
        if (!userWarns.length) {
          embed.setTitle(`${client.emotes.grverify}  Użytkownik...`)
          .setDescription(`**...[${mentioned.user.tag}](https://discord.com/users/${mentioned.id}) nie posiada warnów**`)
          .setColor('RANDOM')
          .setThumbnail(mentioned.user.displayAvatarURL({ dynamic: true }))
          await reaction.edit({ embed: embed })
          return
        }

        embed.setTitle(`${client.emotes.siren}  Czy na pewno chcesz usunąć...`)
        .setDescription(`**...wszystkie ostrzeżenia uzytkownika [${mentioned.user.tag}](https://discord.com/users/${mentioned.id})?**`)
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

        collector.on('collect', async () => {
          await collector.stop()
          await collector2.stop()
          await collector3.stop()

          await warnModel.deleteMany({ GuildID: message.guild.id, User: mentioned.id })

          embed.setTitle(`${client.emotes.staff}  Usunięto wszystkie warny użytkownika...`)
          .setDescription(`**...[${mentioned.user.tag}](https://discord.com/users/${mentioned.id})**`)
          .setThumbnail(mentioned.user.displayAvatarURL({ dynamic: true }))

          await reaction.edit({embed: embed})
          return
        })

        collector2.on('collect', async () => {
          await collector.stop()
          await collector2.stop()
          await collector3.stop()

          embed.setTitle(`${client.emotes.staff}  Anulowano usuwanie warnów użytkownika...`)
          .setDescription(`**...[${mentioned.user.tag}](https://discord.com/users/${mentioned.id})**`)
          .setThumbnail(client.cmds.errorImgs[Math.floor(Math.random() * client.cmds.errorImgs.length)])

          await reaction.edit({embed: embed})
          return
        })
        
        return
      }
      else {
        if (!parseInt(args[0])) {
          embed.setTitle(`${client.emotes.grverify}  Nie znaleziono warna...`)
          .setDescription(`**...o globalnym ID ${args[0]}**`)
          .setColor('RANDOM')
          .setThumbnail(client.cmds.errorImgs[Math.floor(Math.random() * client.cmds.errorImgs.length)])
          await reaction.edit({ embed: embed })
          return
        }

        const warn = await warnModel.findOne({ GuildID: message.guild.id, GlobID: args[0] })

        if (!warn) {
          embed.setTitle(`${client.emotes.grverify}  Na tym serwerze nie znaleziono warna...`)
          .setDescription(`**...o globalnym ID ${args[0]}**`)
          .setColor('RANDOM')
          .setThumbnail(client.cmds.errorImgs[Math.floor(Math.random() * client.cmds.errorImgs.length)])
          await reaction.edit({ embed: embed })
          return
        }

        embed.setTitle(`${client.emotes.staff}  Usunięto warna...`)
        .setDescription(`**...użytkownika${message.guild.member(warn.User) ? ` [${message.guild.member(warn.User).user.tag}` : `o id [${warn.User}`}](https://discord.com/users/${warn.User})** z powodem **${warn.Reason}** o globalnym ID **${warn.GlobID}**`)
        .setThumbnail(client.cmds.doneImgs[Math.floor(Math.random() * client.cmds.doneImgs.length)])

        await warnModel.findOneAndRemove({ GuildID: message.guild.id, GlobID: args[0] })

        await reaction.edit({embed: embed})
        return
      }
    } 
    catch (err) {
      await client.base.get('cmd').error(client, message, pf, cmd, reaction, err)
    }
  }
}
