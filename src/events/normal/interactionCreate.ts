import { MessageEmbed } from 'discord.js'
import { config, handlers } from '../..'

module.exports = async (client: any, interaction: { guild: any; user: { bot: any; tag: any; displayAvatarURL: (arg0: { dynamic: boolean }) => string }; type: string; commandName: any; editReply: (arg0: { embeds: MessageEmbed[]; components: any[] }) => any; reply: (arg0: { embeds: MessageEmbed[]; components: any[] }) => any }) => {

	if (!interaction.guild || interaction.user.bot) return

  if (interaction.type !== 'APPLICATION_COMMAND') return
  try {
    const { redirect } = handlers.get(interaction.commandName)
    redirect(client, interaction)
  } 
  catch (err) {
    const errEmbed = new MessageEmbed()
    .setTitle(`${config.emotes.world}  Nie znaleziono handlera komend...`)
    .setThumbnail(config.cmds.errorImgs[Math.floor(Math.random() * config.cmds.errorImgs.length)])
    .setDescription('...to nie problem z komendą, wystąpił wewnętrzny błąd bota')
    .setColor('RED')
    .setFooter(`💡 ${interaction.user.tag}\n🛠️ v${config.version} ┇ ⚡ RockyBot® 2021 AntiCrash Engine`, interaction.user.displayAvatarURL({dynamic: true}))

    return interaction.editReply({embeds: [errEmbed], components: []})
  }
}
