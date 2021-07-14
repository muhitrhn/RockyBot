const { MessageEmbed, MessageButton, MessageActionRow } = require('discord.js')

module.exports = {

  async execute(client, interaction) {
    try {
      await interaction.defer()

      const mentioned = interaction.options.map(x => x.options)[0] ? interaction.options.map(x => x.options)[0].map(x => x.user)[0] : interaction.user

      const button = new MessageButton()
        .setStyle('LINK')
        .setEmoji(client.emotes.dwnld_ID)
        .setLabel('MAŁY')
        .setURL(mentioned.displayAvatarURL({dynamic: true}))

      const button2 = new MessageButton()
        .setStyle('LINK')
        .setEmoji(client.emotes.dwnld_ID)
        .setLabel('DUŻY')
        .setURL(mentioned.displayAvatarURL({dynamic: true})+'?size=4096')

      const actionRow = new MessageActionRow().addComponents([button, button2])

      const embed = new MessageEmbed()
        .setColor('RANDOM')
        .setFooter(`💡 ${mentioned.tag}\n🛠️ v${client.version} ┇ ⚡ RockyBot® 2021`, mentioned.displayAvatarURL({dynamic: true}))

      return interaction.editReply({embeds: [embed], files: [`${mentioned.displayAvatarURL({ dynamic: true })}?size=4096`], components: [actionRow] })
    } 
    catch (err) {
      return client.base.get('cmd').error(client, interaction, err)
    }
  }
}