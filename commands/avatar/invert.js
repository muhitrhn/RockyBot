const { MessageEmbed } = require('discord.js')
const DIG = require('discord-image-generation')

module.exports = {

  async execute(client, interaction) {
    try {
      await interaction.defer()

      const mentioned = interaction.options.map(x => x.options)[0] ? interaction.options.map(x => x.options)[0].map(x => x.user)[0] : interaction.user

      const CreateAv = await new DIG.Invert().getImage(`${mentioned.displayAvatarURL({ dynamic: false, format: 'png' })}?size=4096`)

      const embed = new MessageEmbed()
        .setColor('RANDOM')
        .setFooter(`💡 ${mentioned.tag}\n🛠️ v${client.version} ┇ ⚡ RockyBot® 2021`, mentioned.displayAvatarURL({dynamic: true}))

      return interaction.editReply({embeds: [embed], files: [CreateAv]})
    } 
    catch (err) {
      return client.base.get('cmd').error(client, interaction, err)
    }
  }
}