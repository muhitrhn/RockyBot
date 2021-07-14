const { MessageEmbed, MessageButton, MessageActionRow } = require('discord.js')

module.exports = {

  async execute(client, interaction) {
    try {
      await interaction.defer()

      let changes = []
      await client.channels.cache.get(client.cmds.ChangesChannel).messages.fetch(1).then(async msgs => msgs.forEach(msg => changes.push(msg.content)))

      const embed = new MessageEmbed()
        .setFooter(`🛠️ v${client.version} ┇ ⚡ RockyBot® 2021`, interaction.user.displayAvatarURL({dynamic: true}))
        .setColor('RANDOM')
        .setTitle(`${client.emotes.cpu}  Używana wersja: ${client.version}`)
        .setThumbnail(client.cmds.infoImgs.changelog)
        if (changes[0]) embed.addField('🛠️ Aktualne prace:', `${changes[0]}`)

      const button = new MessageButton()
        .setStyle('LINK')
        .setEmoji(client.emotes.changelog_ID)
        .setLabel('CHANGELOG')
        .setURL(client.config.changelog)

      const buttonRow = new MessageActionRow().addComponents([button])

      return await interaction.editReply({embeds: [embed], components: [buttonRow]})
    } 
    catch (err) {
      return client.base.get('cmd').error(client, interaction, err)
    }
  }
}