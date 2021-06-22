const { MessageButton, MessageActionRow } = require('discord-buttons')
const { MessageEmbed } = require('discord.js')

module.exports = {
  name: 'kick',
  aliases: ['mk'],
  description: 'Wyrzuć kogoś',
  category: 'moderation',
  utilisation: '{prefix}mk [wzmianka/id]',
  async execute(client, message, args, pf, cmd) {

    const reaction = await client.base.get('cmd').start(client, message, cmd)

    try {
      const embed = new MessageEmbed()
      .setColor('RANDOM')
      .setFooter(`💡 ${message.author.tag}\n🛠️ v${client.version} ┇ ⚡ RockyBot® 2021`, message.author.displayAvatarURL({dynamic: true}))

      const missingPerms = 'WYRZUCANIE CZŁONKÓW'
      if (!message.guild.me.permissionsIn(message.channel).has('KICK_MEMBERS')) {
        //PermsCheck: missing bot perms
        const ifBot = 1
        await client.base.get('check').missingPerms(client, message, args, pf, cmd, reaction, missingPerms, ifBot)
        return
      } 
      else if (!message.member.permissionsIn(message.channel).has('KICK_MEMBERS')  && !client.ownerID.includes(message.author.id)) {
        //PermsCheck: missing user perms
        await client.base.get('check').missingPerms(client, message, args, pf, cmd, reaction, missingPerms)
        return
      }

      const mentioned = await client.base.get('check').member(client, message, args)

      if (mentioned === message.member) {
        embed.setTitle(`${client.emotes.siren}  Nie podano właściwego użytkownika,...`)
        .setDescription('**...podaj id lub oznacz użytkownika**')
        .setThumbnail(client.cmds.errorImgs[Math.floor(Math.random() * client.cmds.errorImgs.length)])
        .setColor('#FFC000')
        await reaction.edit({embed: embed})
        return
      }

      if (!mentioned.kickable) {
        embed.setTitle(`${client.emotes.warn}  Nie mogę wyrzucić użytkownika...`)
        .setDescription(`**...[${mentioned.user.tag}](https://discord.com/users/${mentioned.id}), prawdopodobnie ma rolę wyższą od mojej**`)
        .setThumbnail(client.cmds.errorImgs[Math.floor(Math.random() * client.cmds.errorImgs.length)])
        .setColor('#FFC000')
        await reaction.edit({embed: embed})
        return
      }

      let reason, reasonToProvide
      if (args[0] === mentioned.id || args[0] === `<@${mentioned.id}>` || args[0] === `<@!${mentioned.id}>` ) {
        if (args[1]) {
          reason = args.slice(1).join(' ')
          reasonToProvide = 'Mod: ' + message.author.tag + '┇' + message.author.id + ';  Reason: ' + args.slice(1).join(' ')
        } else {
          reason = 0
          reasonToProvide = 'Mod: ' + message.author.tag + '┇' + message.author.id + ';  Reason not provided'
        }
      } else {
        if (args[0]) {
          reason = args.join(' ')
          reasonToProvide = 'Mod: ' + message.author.tag + '┇' + message.author.id + ';  Reason: ' + args.join(' ')
        } else {
          reason = 0
          reasonToProvide = 'Mod: ' + message.author.tag + '┇' + message.author.id + ';  Reason not provided'
        }
      }

      embed.setTitle(`${client.emotes.siren}  Czy na pewno chcesz wyrzucić...`)

      if (reason === 0) {
        embed.setDescription(`**...użytkownika [${mentioned.user.tag}](https://discord.com/users/${mentioned.id}), nie podając powodu?**`)
      }
      else {
        embed.setDescription(`**...użytkownika [${mentioned.user.tag}](https://discord.com/users/${mentioned.id}), podając powód**\n\n\`${reason}\`**?**`)
      }
      embed.setThumbnail(client.cmds.loadingImgs[Math.floor(Math.random() * client.cmds.loadingImgs.length)])

      const button = new MessageButton()
      .setLabel('TAK')
      .setStyle('red')
      .setEmoji(client.emotes.grverify_ID)
      .setID('kick')
      const button2 = new MessageButton()
      .setLabel('NIE')
      .setStyle('green')
      .setEmoji(client.emotes.rverify_ID)
      .setID('cancel')
      const buttonRow = new MessageActionRow()
      .addComponent(button)
      .addComponent(button2)

      await reaction.edit({embed: embed, component: buttonRow})

      const filter = (button) => button.clicker.user.id === message.author.id && button.id === 'kick'
      const filter2 = (button) => button.clicker.user.id === message.author.id && button.id === 'cancel'
      const filter3 = (button) => button.clicker.user.id !== message.author.id
      const collector = reaction.createButtonCollector(filter, { time: 30000, dispose: true })
      const collector2 = reaction.createButtonCollector(filter2, { time: 30000, dispose: true })
      const collector3 = reaction.createButtonCollector(filter3, { time: 30000, dispose: true })

      collector.on('collect', async () => {
        await collector.stop()
        await collector2.stop()
        await collector3.stop()

        await mentioned.kick({ reason: reasonToProvide })

        embed.setTitle(`${client.emotes.staff}  Wyrzucono użytkownika...`)
        if (reason === 0) {
          embed.setDescription(`**...[${mentioned.user.tag}](https://discord.com/users/${mentioned.id}), nie podając powodu**`)
        }
        else {
          embed.setDescription(`**...[${mentioned.user.tag}](https://discord.com/users/${mentioned.id}), podając powód**\n\n\`${reason}\``)
        }
        embed.setThumbnail(mentioned.user.displayAvatarURL())
        .setImage(client.cmds.moderationImgs.kick[Math.floor(Math.random() * client.cmds.moderationImgs.kick.length)])

        await reaction.edit({embed: embed})
        return
      })

      collector2.on('collect', async () => {
        await collector.stop()
        await collector2.stop()
        await collector3.stop()

        embed.setTitle(`${client.emotes.rverify}  Anulowano wyrzucanie użytkownika...`)
        .setDescription(`**...[${mentioned.user.tag}](https://discord.com/users/${mentioned.id})**`)
        .setThumbnail(client.cmds.errorImgs[Math.floor(Math.random() * client.cmds.errorImgs.length)])

        await reaction.edit({embed: embed})
        return
      })

      collector3.on('collect', async buttonClick => {
        const replyEmbed = new MessageEmbed().setColor('RED').setDescription(`**${client.emotes.grverify} Nie wywołałeś tej wiadomości**`).setFooter(`🛠️ v${client.version} ┇ ⚡ RockyBot® 2021 Reply Engine`, buttonClick.clicker.user.displayAvatarURL({dynamic: true}))
        await buttonClick.reply.send({ embed: replyEmbed, ephemeral: true })
      })


    } 
    catch (err) {
      await client.base.get('cmd').error(client, message, pf, cmd, reaction, err)
    }
  }
}