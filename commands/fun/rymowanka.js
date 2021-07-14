const { MessageEmbed } = require('discord.js')

module.exports = {

  async execute(client, interaction) {
    try {
      await interaction.defer()

      let texts = []
      await client.channels.cache.get(client.cmds.attachments.rymowanka).messages.fetch().then(async msgs => msgs.forEach(msg => texts.push(msg.content)))
      const text = await texts[Math.floor(Math.random() * texts.length)] 
      
      const embed = new MessageEmbed()
        .setTitle(text)
        .setColor('RANDOM')
        .setFooter(`🛠️ v${client.version} ┇ ⚡ RockyBot® 2021`, interaction.user.displayAvatarURL({dynamic: true}))
        .setThumbnail(client.cmds.funImgs.rymowanka)

      return interaction.editReply({embeds: [embed]})     
    } 
    catch (err) {
      return client.base.get('cmd').error(client, interaction, err)
    }
  }
}