const { MessageEmbed } = require('discord.js')

module.exports = {

  async execute(client, interaction) {
    try {
      await interaction.defer()

      const embed = new MessageEmbed()
        .setColor('GREEN')
        .setTitle(`🏓  Ping: \`${client.ws.ping}\`ms`)
        .setFooter(`🛠️ v${client.version} ┇ ⚡ RockyBot® 2021`, interaction.user.displayAvatarURL({dynamic: true}))
        .setThumbnail(client.cmds.infoImgs.ping)

      return interaction.editReply({embeds: [embed]})
    } 
    catch (err) {
      return client.base.get('cmd').error(client, interaction, err)
    }
  }
}