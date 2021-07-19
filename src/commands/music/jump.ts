import { CommandInteraction, MessageEmbed }from 'discord.js'
import { queue, config } from '../../..'

async function execute(interaction: CommandInteraction) {
  const serverQueue = queue.get(interaction.guildId)
  const embed = new MessageEmbed()
    .setColor('RANDOM')
    .setFooter(`🛠️ v${config.version} ┇ ⚡ RockyBot® 2021`, interaction.user.displayAvatarURL({dynamic: true}))

  //@ts-ignore
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

  if (!serverQueue.repeatMode) {
    serverQueue.songs.shift(interaction.options.getInteger('numer', true) - 1)
  }
  else if (serverQueue.repeatMode === 'queue') {
    const shifted = serverQueue.songs.shift(interaction.options.getInteger('numer', true) - 2)
    serverQueue.songs.push(shifted)
  }
  else if (serverQueue.repeatMode === 'track') {
    const shifted = serverQueue.songs.shift(interaction.options.getInteger('numer', true) - 1)
    serverQueue.songs.push(shifted)
  } 

  serverQueue.player.stop()

  embed.setTitle(`♻️ Usunąłem utwór \`${deletedSong.title}\`...`)
    .setThumbnail(config.cmds.moderationImgs.clear[Math.floor(Math.random() * config.cmds.moderationImgs.clear.length)])
    .setDescription(`**...z numerem \`${interaction.options.getInteger('numer', true)}\`, trwający \`${deletedSong.length}\`**`)
    .setColor('RANDOM')
    .setFooter(`💡 Utworów w kolejce: ${serverQueue.songs.length}\n🛠️ v${config.version} ┇ ⚡ RockyBot® 2021`, interaction.user.displayAvatarURL({dynamic: true}))

  await interaction.reply({embeds: [embed]})

  if (interaction.channelId !== serverQueue.textChannel.id) {
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