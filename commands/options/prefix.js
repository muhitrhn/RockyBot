const { MessageEmbed } = require('discord.js')
const prefixModel = require('../../models/prefix')

module.exports = {
  name: 'prefix',
  aliases: ['gop'],
  description: 'Zmień prefix serwera',
  category: 'options',
  utilisation: '{prefix}gop [nowy prefix]',
  async execute(client, message, args, pf, cmd) {
    
    const reaction = await client.base.get('cmd').start(client, message, cmd)

    try {
      const embed = new MessageEmbed()
      .setColor('RANDOM')
      .setFooter(`💡 ${message.author.tag}\n🛠️ v${client.version} ┇ ⚡ RockyBot® 2021`, message.author.avatarURL({dynamic: true}))

      const oldPrefix = pf

      if(!message.member.hasPermission('MANAGE_GUILD') && !client.ownerID.includes(message.author.id)) {
        const missingPerms = 'ZARZĄDZANIE SERWEREM'
        await client.base.get('check').missingPerms(client, message, reaction, missingPerms)
      }

      if (!args[0]){
        embed.setTitle(`${client.emotes.world}  Brak informacji o nowym prefiksie`)
        .setThumbnail(client.cmds.errorImgs[Math.floor(Math.random() * client.cmds.errorImgs.length)])
        .setColor('#FFC000')
        await reaction.edit({embed: embed})
        return
      }

      const data = await prefixModel.findOne({
        GuildID: message.guild.id
      }) 
          
      if (data) {
        await prefixModel.findOneAndRemove({
          GuildID: message.guild.id
        }) 
      }

      let newData = new prefixModel({
        Prefix: args[0],
        GuildID: message.guild.id
      })

      newData.save()

      embed.setTitle(`${client.emotes.nitro} Zmieniono prefix...`)
      .setDescription(`**z \`${oldPrefix}\` na \`${args[0]}\``)
      .setThumbnail(client.cmds.doneImgs[Math.floor(Math.random() * client.cmds.doneImgs.length)])
      await reaction.edit({embed: embed})
    } catch (err) {
      await client.base.get('cmd').error(client, message, pf, cmd, reaction, err)
    }
  }
}