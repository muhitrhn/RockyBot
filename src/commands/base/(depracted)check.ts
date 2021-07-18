import { MessageEmbed } from 'discord.js'
import { config } from '../..'

async function missingPerms(interaction: any, missingPerms: string, ifBot: any) {

  const embed = new MessageEmbed()
  if (ifBot) embed.setTitle('🔒  Bot nie ma wymaganych uprawnień...').setThumbnail(config.cmds.errorImgs[Math.floor(Math.random() * config.cmds.errorImgs.length)])
  else embed.setTitle('🔒  Nie masz wymaganych uprawnień...').setThumbnail(config.cmds.lockedImgs[Math.floor(Math.random() * config.cmds.lockedImgs.length)])
  embed.setFooter(`🛠️ v${config.version}\n⚡ RockyBot® 2021`, interaction.user.displayAvatarURL({dynamic: true}))
    .setDescription(`**...${missingPerms}**`)
    .setColor('RED')

  try {
    await interaction.editReply({embeds: [embed], ephemeral: true})
  } catch (err) {
    await interaction.reply({embeds: [embed], ephemeral: true})
  } 
}


export { missingPerms }