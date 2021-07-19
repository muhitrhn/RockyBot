import { MessageEmbed }from 'discord.js'
import { queue, config } from '../../..'

async function execute(interaction: any) {
  const serverQueue = queue.get(interaction.guild.id)
  const embed = new MessageEmbed()
    .setColor('RANDOM')
    .setFooter(`🛠️ v${config.version} ┇ ⚡ RockyBot® 2021`, interaction.user.displayAvatarURL({dynamic: true}))

  if (!interaction.member.voice.channel) {
    embed.setTitle(`${config.emotes.world}  Nie jesteś na kanale głosowym`)
      .setThumbnail(config.cmds.errorImgs[Math.floor(Math.random() * config.cmds.errorImgs.length)])
      .setColor('#FFC000')

    await interaction.reply({embeds: [embed], ephemeral: true})
    return
  }
      
  if (!serverQueue) {
    embed.setTitle(`${config.emotes.world}  Nie gram na tym kanale`)
      .setThumbnail(config.cmds.errorImgs[Math.floor(Math.random() * config.cmds.errorImgs.length)])
      .setColor('#FFC000')

    await interaction.reply({embeds: [embed], ephemeral: true})
    return
  }

  const deletedSong = serverQueue.songs[interaction.options.map((x: any) => x.options)[0].map((x: any) => x.options)[0].map((x: any) => x.value)[0]]

  delete serverQueue.songs[interaction.options.map((x: any) => x.options)[0].map((x: any) => x.options)[0].map((x: any) => x.value)[0]]

  embed.setTitle(`♻️ Usunąłem utwór \`${deletedSong.title}\`...`)
    .setThumbnail(config.cmds.moderationImgs.clear[Math.floor(Math.random() * config.cmds.moderationImgs.clear.length)])
    .setDescription(`**...z numerem \`${interaction.options.map((x: any) => x.options)[0].map((x: any) => x.options)[0].map((x: any) => x.value)[0]}\`, trwający \`${deletedSong.length}\`**`)
    .setColor('RANDOM')
    .setFooter(`💡 Utworów w kolejce: ${serverQueue.songs.length}\n🛠️ v${config.version} ┇ ⚡ RockyBot® 2021`, interaction.user.displayAvatarURL({dynamic: true}))

  await interaction.reply({embeds: [embed]})

  if (interaction.channel.id !== serverQueue.textChannel.id) {
    await serverQueue.textChannel.send({embeds: [embed]})
  }
} 

const options = {
  name: 'delete',
  description: '♻️ Usuń konkretny utwór',
  type: 1, 
  options: [
    {
      type: 'INTEGER',
      name: 'numer',
      description: '🔢 Numer utworu z playlisty (komenda /music queue view)',
      required: true
    }
  ]
}

export { execute, options }