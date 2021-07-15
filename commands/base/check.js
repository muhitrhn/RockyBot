const { MessageEmbed } = require('discord.js')

module.exports = {
  name: 'check',

  async missingPerms(client, interaction, missingPerms, ifBot) {
    try {
      const embed = new MessageEmbed()
      if (ifBot) embed.setTitle('🔒  Bot nie ma wymaganych uprawnień...').setThumbnail(client.cmds.errorImgs[Math.floor(Math.random() * client.cmds.errorImgs.length)])
      else embed.setTitle('🔒  Nie masz wymaganych uprawnień...').setThumbnail(client.cmds.lockedImgs[Math.floor(Math.random() * client.cmds.lockedImgs.length)])
      embed.setFooter(`🛠️ v${client.version}\n⚡ RockyBot® 2021`, interaction.user.displayAvatarURL({dynamic: true}))
        .setDescription(`**...${missingPerms}**`)
        .setColor('RED')

      try {
        return interaction.editReply({embeds: [embed], ephemeral: true})
      } catch (err) {
        return interaction.reply({embeds: [embed], ephemeral: true})
      }
    } 
    catch (err) {
      return client.base.get('cmd').error(client, interaction, err)
    }
    
  }
}