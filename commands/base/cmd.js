const { MessageEmbed } = require('discord.js')

module.exports = {
  name: 'cmd',

  async error(client, interaction, err) {
    const errEmbed = new MessageEmbed()
      .setTitle(`${client.emotes.world}  Komenda napotkała problem`)
      .setThumbnail(client.cmds.errorImgs[Math.floor(Math.random() * client.cmds.errorImgs.length)])
      .setDescription('`'+err+'`')
      .setColor('RED')
      .setFooter(`🛠️ v${client.version} ┇ ⚡ RockyBot® 2021 ErrorReport Engine`, interaction.user.displayAvatarURL({dynamic: true}))

      try {
        await interaction.editReply({embeds: [errEmbed], components: []})
      } catch (err) {
        await interaction.channel.send({embeds: [errEmbed], components: []})
      }
  
  }    
}
