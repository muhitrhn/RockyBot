const { MessageButton, MessageActionRow } = require('discord-buttons')
const { MessageEmbed } = require('discord.js')
const mutedSchema = require('../../models/mutedRole')

module.exports = {
  name: 'unmute',
  aliases: ['mum'],
  description: 'Odcisz kogoś',
  category: 'moderation',
  utilisation: '{prefix}mum [wzmianka/id]',
  async execute(client, message, args, pf, cmd) {
    const reaction = await client.base.get('cmd').start(client, message, cmd)

    try {

      const button = new MessageButton()

      let permsCheck = 2
      if (!message.guild.me.permissionsIn(message.channel).has('MANAGE_ROLES')) {
        permsCheck = 0
      } else if (!message.member.permissionsIn(message.channel).has('MANAGE_MESSAGES')  && !client.ownerID.includes(message.author.id)) {
        permsCheck = 1
      }

      if (permsCheck === 0) {
        //PermsCheck: missing bot perms
        const missingPerms = 'ZARZĄDZANIE ROLAMI'
        const ifBot = 1
        await client.base.get('check').missingPerms(client, message, reaction, missingPerms, ifBot)
        return
      } else if (permsCheck === 1) {
        //PermsCheck: missing user perms
        const missingPerms = 'ZARZĄDZANIE WIADOMOŚCIAMI'
        await client.base.get('check').missingPerms(client, message, reaction, missingPerms)
        return
      }

      const mentioned = await client.base.get('check').member(client, message, args)
      const embed = new MessageEmbed()
      .setColor('RANDOM')
      .setFooter(`💡 ${message.author.tag}\n🛠️ v${client.version} ┇ ⚡ RockyBot® 2021`, message.author.avatarURL({dynamic: true}))

      if (mentioned === message.member) {
        embed.setTitle(`${client.emotes.siren}  Nie podano właściwego użytkownika...`)
        .setDescription('**...podaj id lub oznacz użytkownika**')
        .setThumbnail(client.cmds.errorImgs[Math.floor(Math.random() * client.cmds.errorImgs.length)])
        .setColor('#FFC000')
        await reaction.edit({embed: embed})
        return
      }

      const data = await mutedSchema.findOne({
        GuildID: message.guild.id
      })
      let role
      if(data) role = message.guild.roles.cache.get(data.Role)

      if(!data) {
        embed.setTitle(`${client.emotes.warn}  Ten serwer nie ma ustawionej...`)
        .setDescription(`**...roli wyciszenia, użyj \`${pf}gomr [wzmianka/id roli]\`, aby ustawić rolę**`)
        .setThumbnail(client.cmds.errorImgs[Math.floor(Math.random() * client.cmds.errorImgs.length)])
        .setColor('#FFC000')
        await reaction.edit({embed: embed})
        return
      }

      if (!mentioned.roles.cache.some(role => role.id === data.Role)) {
        embed.setTitle(`${client.emotes.warn}  Użytkownik nie jest wyciszony,...`)
        .setDescription(`**...użyj \`${pf}mm ${mentioned.id}\` aby go wyciszyć**`)
        .setThumbnail(client.cmds.errorImgs[Math.floor(Math.random() * client.cmds.errorImgs.length)])
        .setColor('#FFC000')
        await reaction.edit({embed: embed})
        return
      }

      if (!mentioned.manageable) {
        embed.setTitle(`${client.emotes.warn}  Nie mogę odciszyć użytkownika...`)
        .setDescription(`**...${mentioned}, prawdopodobnie ma rolę wyższą od mojej**`)
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

      embed.setTitle(`${client.emotes.siren}  Czy na pewno chcesz odciszyć...`)

      if (reason === 0)
        embed.setDescription(`**...użytkownika ${mentioned}, nie podając powodu?**`)
      else {
        embed.setDescription(`**...użytkownika ${mentioned}, podając powód**\n\n\`${reason}\`**?**`)
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

      reaction.edit({embed: embed, component: buttonRow})

      const filter = (button) => button.clicker.user.id === message.author.id && button.id === 'mute'
      const filter2 = (button) => button.clicker.user.id === message.author.id && button.id === 'cancel'
      const filter3 = (button) => button.clicker.user.id !== message.author.id
      const collector = reaction.createButtonCollector(filter, { time: 30000, dispose: true })
      const collector2 = reaction.createButtonCollector(filter2, { time: 30000, dispose: true })
      const collector3 = reaction.createButtonCollector(filter3, { time: 30000, dispose: true })

      collector.on('collect', async () => {
        collector.stop()
        collector2.stop()
        collector3.stop()

        try {
          await mentioned.roles.remove(role, {reason: reasonToProvide})
        } catch (err) {
          embed.setTitle(`${client.emotes.warn}  Nie mogę odciszyć użytkownika...`)
          .setDescription(`**...${mentioned}, prawdopodobnie rola wyciszenia jest wyższa od mojej**`)
          .setThumbnail(client.cmds.errorImgs[Math.floor(Math.random() * client.cmds.errorImgs.length)])
          .setColor('#FFC000')
          reaction.edit({embed: embed})
          return
        }

        embed.setTitle(`${client.emotes.staff}  Odciszono użytkownika...`)
        if (reason === 0)
          embed.setDescription(`**...${mentioned}, nie podając powodu**`)
        else {
          embed.setDescription(`**...${mentioned}, podając powód**\n\n\`${reason}\``)
        }

        embed.setThumbnail(client.cmds.doneImgs[Math.floor(Math.random() * client.cmds.doneImgs.length)])

        await reaction.edit({embed: embed})
        return
      })

      collector2.on('collect', () => {
        collector.stop()
        collector2.stop()
        collector3.stop()

        embed.setTitle(`${client.emotes.rverify}  Anulowano odciszenie użytkownika...`)
        .setDescription(`**...${mentioned}**`)
        .setThumbnail(client.cmds.errorImgs[Math.floor(Math.random() * client.cmds.errorImgs.length)])

        reaction.edit({embed: embed})
        return
      })

      collector3.on('collect', buttonClick => {
        const replyEmbed = new MessageEmbed().setColor('RED').setDescription(`**${client.emotes.grverify} Nie wywołałeś tej wiadomości**`).setFooter(`🛠️ v${client.version} ┇ ⚡ RockyBot® 2021 Reply Engine`, buttonClick.clicker.user.avatarURL({dynamic: true}))
        buttonClick.reply.send({ embed: replyEmbed, ephemeral: true })
      })

    } catch (err) {
      await client.base.get('cmd').error(client, message, pf, cmd, reaction, err)
    }
  }
}
