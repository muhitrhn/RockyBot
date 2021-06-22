const { MessageEmbed } = require('discord.js')
const warnModel = require('../../models/warns')

module.exports = {
  name: 'warn',
  aliases: ['mw'],
  description: 'Nadaj ostrzeżenie',
  category: 'moderation',
  utilisation: '{prefix}mw [wzmianka/id] [powód warna]',
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

      if (mentioned === message.member || mentioned.permissions.has('MANAGE_MESSAGES')) {
        embed.setTitle(`${client.emotes.siren}  Nie podano właściwego użytkownika...`)
        .setDescription('**...podaj id lub oznacz użytkownika**\n\n*Moderatorzy też nie mogą być ostrzeżeni*')
        .setThumbnail(client.cmds.errorImgs[Math.floor(Math.random() * client.cmds.errorImgs.length)])
        .setColor('#FFC000')
        await reaction.edit({embed: embed})
        return
      }

      if (!args[1]) {
        embed.setTitle(`${client.emotes.warn}  Napisz powód ostrzeżenia,...`)
        .setDescription(`**...\`${pf}h ${cmd}\` po więcej szczegółów**`)
        .setThumbnail(client.cmds.errorImgs[Math.floor(Math.random() * client.cmds.errorImgs.length)])
        .setColor('#FFC000')
        await reaction.edit({embed: embed})
        return
      }
      const maxID = await warnModel.find().sort('-GlobID')
      const userWarns = await warnModel.find({ GuildID: message.guild.id, User: mentioned.id })

      let newData = new warnModel({
        User: mentioned.id,
        GlobID: maxID[0]?maxID[0].GlobID + 1:1,
        Reason: args.slice(1).join(' '),
        ModID: message.author.id,
        GuildID: message.guild.id
      })

      await newData.save()

      embed.setTitle(`${client.emotes.staff}  Zwarnowano użytkownika...`)
      .setDescription(`**...[${mentioned.user.tag}](https://discord.com/users/${mentioned.id})**\n${client.emotes.gearspin} Numer ostrzeżenia: **${userWarns?userWarns.length + 1:1}**\n${client.emotes.grverify} Powód: **${args.slice(1).join(' ')}**\n${client.emotes.yellowDot} Globalne ID: **${maxID[0]?maxID[0].GlobID + 1:1}**\n\n${client.emotes.siri} Moderator: ⬇️`)
      .setThumbnail(client.cmds.doneImgs[Math.floor(Math.random() * client.cmds.doneImgs.length)])

      await reaction.edit({embed: embed})
      return
    } 
    catch (err) {
      await client.base.get('cmd').error(client, message, pf, cmd, reaction, err)
    }
  }
}
