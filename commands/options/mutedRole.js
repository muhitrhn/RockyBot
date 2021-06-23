const { MessageEmbed } = require('discord.js')
const settingsModel = require('../../models/settings')

module.exports = {
  name: 'mutedrole',
  aliases: ['gomr'],
  description: 'Zmień rolę "wyciszony"',
  category: 'options',
  utilisation: '{prefix}gomr [id/wzmianka roli]',
  async execute(client, message, args, pf, cmd) {
    
    const reaction = await client.base.get('cmd').start(client, message, cmd)

    try {
      const embed = new MessageEmbed()
      .setColor('RANDOM')
      .setFooter(`💡 ${message.author.tag}\n🛠️ v${client.version} ┇ ⚡ RockyBot® 2021`, message.author.displayAvatarURL({dynamic: true}))

      if(!message.member.hasPermission('MANAGE_GUILD') && !client.ownerID.includes(message.author.id)) {
        const missingPerms = 'ZARZĄDZANIE SERWEREM'
        await client.base.get('check').missingPerms(client, message, args, pf, cmd, reaction, missingPerms)
        return;
      }

      let role
      //NO MENTIONS
      if (message.mentions.roles.size) {
        role = message.mentions.roles.first()
      //SOMEONE MENTIONED BY ID
      } 
      else if (message.guild.roles.cache.get(args[0])) {
        role = message.guild.roles.cache.get(args[0])
      }

    
      if (!role){
        embed.setTitle(`${client.emotes.world}  Brak informacji o nowej roli`)
        .setThumbnail(client.cmds.errorImgs[Math.floor(Math.random() * client.cmds.errorImgs.length)])
        .setColor('#FFC000')
        await reaction.edit({embed: embed})
        return
      }

      const data = await settingsModel.findOne({
        GuildID: message.guild.id
      }) 
          
      let oldRole, newData
      if (!data) {      
        newData = new settingsModel({
          MutedRole: role.id,
          GuildID: message.guild.id
        })
      } else {
        oldRole = data.MutedRole
        newData = new settingsModel({
          Prefix: data.Prefix,
          MutedRole: role.id,
          GuildID: message.guild.id
        })

        await settingsModel.findOneAndRemove({
          GuildID: message.guild.id
        }) 
      }

      await newData.save()

      if (oldRole) {
        embed.setTitle(`${client.emotes.nitro} Zmieniono rolę wyciszenia...`).setDescription(`**...z <@&${oldRole}> na ${role}**`)
      }
      else {
        embed.setTitle(`${client.emotes.nitro} Ustawiono rolę wyciszenia...`).setDescription(`**...na ${role}**`)
      }
      embed.setThumbnail(client.cmds.doneImgs[Math.floor(Math.random() * client.cmds.doneImgs.length)])
      await reaction.edit({embed: embed})
    } 
    catch (err) {
      await client.base.get('cmd').error(client, message, pf, cmd, reaction, err)
    }
  }
}