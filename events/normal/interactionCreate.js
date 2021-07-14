const { MessageEmbed } = require('discord.js')

module.exports = async (client, interaction) => {

	if (!interaction.guild || interaction.user.bot) return

  if (interaction.type !== 'APPLICATION_COMMAND') return

  try {
    const cmd = client.handlers.get(interaction.commandName)
    cmd.redirect(client, interaction)
  }
  catch (err) {
    const errEmbed = new MessageEmbed()
      .setTitle(`${client.emotes.world}  Nie znaleziono handlera komend...`)
      .setThumbnail(client.cmds.errorImgs[Math.floor(Math.random() * client.cmds.errorImgs.length)])
      .setDescription('...to nie problem z komendą, wystąpił wewnętrzny błąd bota')
      .setColor('RED')
      .setFooter(`💡 ${interaction.user.tag}\n🛠️ v${client.version} ┇ ⚡ RockyBot® 2021 AntiCrash Engine`, interaction.user.displayAvatarURL({dynamic: true}))

    try {
      await interaction.editReply({embeds: [errEmbed], components: []})
    } 
    catch (err) {
      await interaction.reply({embeds: [errEmbed], components: []})
    }
  }
}
