const { MessageEmbed, MessageAttachment } = require('discord.js')

module.exports = {

  async execute(client, interaction) {
    try {
      await interaction.defer()

      let files = []
      await client.channels.cache.get(client.cmds.attachments.stonoga).messages.fetch().then(async msgs => msgs.forEach(msg => files.push(msg.attachments.array()[0].url)))
      const chosenFile = await files[Math.floor(Math.random() * files.length)] 
      const attachment = new MessageAttachment(chosenFile, 'wideo.mp4')

      const embed = new MessageEmbed()
        .setTitle(`${client.emotes.CMDstonoga}  Zbyszek!`)
        .setColor('RANDOM')
        .setFooter(`🛠️ v${client.version} ┇ ⚡ RockyBot® 2021`, interaction.user.displayAvatarURL({dynamic: true}))

      return interaction.editReply({embeds: [embed], files: [attachment]})     
    } 
    catch (err) {
      return client.base.get('cmd').error(client, interaction, err)
    }
  }
}