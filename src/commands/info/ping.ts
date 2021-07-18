import { MessageEmbed, Client } from 'discord.js'
import { config } from '../..'

async function execute(client: Client, interaction: any) {
  await interaction.defer()

  const embed = new MessageEmbed()
    .setColor('GREEN')
    .setTitle(`🏓  Ping: \`${client.ws.ping}\`ms`)
    .setFooter(`🛠️ v${config.version} ┇ ⚡ RockyBot® 2021`, interaction.user.displayAvatarURL({dynamic: true}))
    .setThumbnail(config.cmds.infoImgs.ping)

  await interaction.editReply({embeds: [embed]})
}

const options = {
  name: 'ping',
  description: '🏓 Sprawdź ping bota',
  type: 1,
}

export { execute, options }