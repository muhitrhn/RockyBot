const { MessageButton, MessageActionRow } = require('discord-buttons')
const { MessageEmbed } = require('discord.js')
const mutedSchema = require('../../models/settings')

module.exports = {
  name: 'mute',
  aliases: ['mm'],
  description: 'Wycisz kogoś',
  category: 'moderation',
  utilisation: '{prefix}mm [wzmianka/id]',
  async execute(client, message, args, pf, cmd) {
    const reaction = await client.base.get('cmd').start(client, message, cmd)

    try {

      const button = new MessageButton()

      if (!message.guild.me.permissionsIn(message.channel).has('MANAGE_ROLES')) {
        //PermsCheck: missing bot perms
        const missingPerms = 'ZARZĄDZANIE ROLAMI'
        const ifBot = 1
        await client.base.get('check').missingPerms(client, message, args, pf, cmd, reaction, missingPerms, ifBot)
        return
      } 
      else if (!message.member.permissionsIn(message.channel).has('MANAGE_MESSAGES')  && !client.ownerID.includes(message.author.id)) {
        //PermsCheck: missing user perms
        const missingPerms = 'ZARZĄDZANIE WIADOMOŚCIAMI'
        await client.base.get('check').missingPerms(client, message, args, pf, cmd, reaction, missingPerms)
        return
      }

      const mentioned = await client.base.get('check').member(client, message, args)
      const embed = new MessageEmbed()
      .setColor('RANDOM')
      .setFooter(`💡 ${message.author.tag}\n🛠️ v${client.version} ┇ ⚡ RockyBot® 2021`, message.author.displayAvatarURL({dynamic: true}))

      if (mentioned === message.member) {
        embed.setTitle(`${client.emotes.siren}  Nie podano właściwego użytkownika...`)
        .setDescription('**...podaj id lub oznacz użytkownika**')
        .setThumbnail(client.cmds.errorImgs[Math.floor(Math.random() * client.cmds.errorImgs.length)])
        .setColor('#FFC000')
        await reaction.edit({embed: embed})
        return
      }

      if (!mentioned.manageable) {
        embed.setTitle(`${client.emotes.warn}  Nie mogę wyciszyć użytkownika...`)
        .setDescription(`**...[${mentioned.user.tag}](https://discord.com/users/${mentioned.id}), prawdopodobnie ma rolę wyższą od mojej**`)
        .setThumbnail(client.cmds.errorImgs[Math.floor(Math.random() * client.cmds.errorImgs.length)])
        .setColor('#FFC000')
        await reaction.edit({embed: embed})
        return
      }

      const data = await mutedSchema.findOne({
        GuildID: message.guild.id
      })

      let role
      if(data) role = await message.guild.roles.cache.get(data.Role)

      if(!role) {
        embed.setTitle(`${client.emotes.warn}  Ten serwer nie ma ustawionej...`)
        .setDescription(`**...roli wyciszenia, użyj \`${pf}gomr [wzmianka/id roli]\` aby ustawić rolę**`)
        .setThumbnail(client.cmds.errorImgs[Math.floor(Math.random() * client.cmds.errorImgs.length)])
        .setColor('#FFC000')
        await reaction.edit({embed: embed})
        return
      }

      if (mentioned.roles.cache.some(role => role.id === data.Role)) {
        embed.setTitle(`${client.emotes.warn}  Użytkownik jest już wyciszony,...`)
        .setDescription(`**...użyj \`${pf}mum ${mentioned.id}\` aby usunąć wyciszenie**`)
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

      embed.setTitle(`${client.emotes.siren}  Czy na pewno chcesz wyciszyć...`)
      if (reason === 0) {
        embed.setDescription(`**...użytkownika [${mentioned.user.tag}](https://discord.com/users/${mentioned.id}), nie podając powodu?**`)
      }
      else {
        embed.setDescription(`**...użytkownika [${mentioned.user.tag}](https://discord.com/users/${mentioned.id}), podając powód**\n\n\`${reason}\`**?**`)
      }
      embed.setThumbnail(client.cmds.loadingImgs[Math.floor(Math.random() * client.cmds.loadingImgs.length)])

      button.setLabel('TAK')
      .setStyle('red')
      .setEmoji(client.emotes.grverify_ID)
      .setID('mute')
      const button2 = new MessageButton()
      .setLabel('NIE')
      .setStyle('green')
      .setEmoji(client.emotes.rverify_ID)
      .setID('cancel')
      const buttonRow = new MessageActionRow()
      .addComponent(button)
      .addComponent(button2)

      await reaction.edit({embed: embed, component: buttonRow})

      const filter = (button) => button.clicker.user.id === message.author.id && button.id === 'mute'
      const filter2 = (button) => button.clicker.user.id === message.author.id && button.id === 'cancel'
      const filter3 = (button) => button.clicker.user.id !== message.author.id
      const collector = reaction.createButtonCollector(filter, { time: 30000, dispose: true })
      const collector2 = reaction.createButtonCollector(filter2, { time: 30000, dispose: true })
      const collector3 = reaction.createButtonCollector(filter3, { time: 30000, dispose: true })

      collector.on('collect', async () => {
        await collector.stop()
        await collector2.stop()
        await collector3.stop()

        try {
          await mentioned.roles.add(role, {reason: reasonToProvide})
        } 
        catch (err) {
          embed.setTitle(`${client.emotes.warn}  Nie mogę wyciszyć użytkownika...`)
          .setDescription(`**...[${mentioned.user.tag}](https://discord.com/users/${mentioned.id}), prawdopodobnie rola wyciszenia jest wyższa od mojej**`)
          .setThumbnail(client.cmds.errorImgs[Math.floor(Math.random() * client.cmds.errorImgs.length)])
          .setColor('#FFC000')
          await reaction.edit({embed: embed})
          return
        }

        embed.setTitle(`${client.emotes.staff}  Wyciszono użytkownika...`)
        if (reason === 0) {
          embed.setDescription(`**...[${mentioned.user.tag}](https://discord.com/users/${mentioned.id}), nie podając powodu**`)
        }
        else {
          embed.setDescription(`**...[${mentioned.user.tag}](https://discord.com/users/${mentioned.id}), podając powód**\n\n\`${reason}\``)
        }
        embed.setThumbnail(mentioned.user.displayAvatarURL())

        await reaction.edit({embed: embed})
        return
      })

      collector2.on('collect', async () => {
        await collector.stop()
        await collector2.stop()
        await collector3.stop()

        embed.setTitle(`${client.emotes.rverify}  Anulowano wyciszenie użytkownika...`)
        .setDescription(`**...${mentioned}**`)
        .setThumbnail(client.cmds.errorImgs[Math.floor(Math.random() * client.cmds.errorImgs.length)])

        await reaction.edit({embed: embed})
        return
      })

      collector3.on('collect', async buttonClick => {
        const replyEmbed = new MessageEmbed().setColor('RED').setDescription(`**${client.emotes.grverify} Nie wywołałeś tej wiadomości**`).setFooter(`🛠️ v${client.version} ┇ ⚡ RockyBot® 2021 Reply Engine`, buttonClick.clicker.user.displayAvatarURL({dynamic: true}))
        await buttonClick.reply.send({ embed: replyEmbed, ephemeral: true })
      })

    } catch (err) {
      await client.base.get('cmd').error(client, message, pf, cmd, reaction, err)
    }
  }
}
