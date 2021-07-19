import { CommandInteraction, MessageEmbed } from 'discord.js'
import { config, queue } from '../..'

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
    serverQueue.player.stop()
  } 
  else if (serverQueue.repeatMode === 'queue') {
    serverQueue.player.stop()
  } 
  else if (serverQueue.repeatMode === 'track') {
    if (serverQueue.songs[1]) {
      serverQueue.songs.push(serverQueue.songs[0])
      serverQueue.songs.shift()

      serverQueue.player.stop()
    } 
    else {
      serverQueue.player.stop()
    }
  } 

  embed.setTitle('⏭️ Pominąłem utwór')
    .setThumbnail(config.cmds.musicImgs.skip[Math.floor(Math.random() * config.cmds.musicImgs.skip.length)])
    .setColor('RANDOM')
    .setFooter(`💡 Utworów w kolejce: ${serverQueue.songs.length}\n🛠️ v${config.version} ┇ ⚡ RockyBot® 2021`, interaction.user.displayAvatarURL({dynamic: true}))

  await interaction.reply({embeds: [embed]})

  if (interaction.channelId !== serverQueue.textChannel.id) {
    await serverQueue.textChannel.send({embeds: [embed]})
  }
}

const options = {
  name: 'skip',
  description: '⏭️ Pomiń utwór',
  type: 1, 
}

export { execute, options }