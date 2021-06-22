const { MessageEmbed } = require('discord.js')

module.exports = {
  name: 'ping',
  aliases: ['ip'],
  description: 'Sprawdza ping bota',
  category: 'info',
  utilisation: '{prefix}ip',
  async execute(client, message, args, pf, cmd) {

    const reaction = await client.base.get('cmd').start(client, message, cmd)

    try {
      const embed = new MessageEmbed()
      .setColor('GREEN')
      .setTitle(`🏓  Ping: \`${client.ws.ping}\`ms`)
      .setFooter(`💡 ${message.author.tag}\n🛠️ v${client.version} ┇ ⚡ RockyBot® 2021`, message.author.displayAvatarURL({dynamic: true}))
      .setThumbnail(client.cmds.infoImgs.ping)
      await reaction.edit({embed: embed})
    } 
    catch (err) {
      await client.base.get('cmd').error(client, message, pf, cmd, reaction, err)
    }
  }
}