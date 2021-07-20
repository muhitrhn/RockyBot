import { CommandInteraction, MessageEmbed } from 'discord.js'
import { config, queue } from '../..'

async function execute(interaction: CommandInteraction) {
  const serverQueue = queue.get(interaction.guildId)
  const embed = new MessageEmbed()
    .setColor('RANDOM')
    .setFooter(`🛠️ v${config.version} ┇ ⚡ RockyBot® 2021`, interaction.user.displayAvatarURL({dynamic: true}))

  // @ts-ignore
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
    embed.setTitle(`${config.emotes.world}  Nie mogę cofnąć utworu...`)
      .setDescription(`**...powtarzanie utworów kanału ${serverQueue.voiceChannel.toString()} jest wyłączone, użyj \`/music repeat\` aby je włączyć.`)
      .setThumbnail(config.cmds.errorImgs[Math.floor(Math.random() * config.cmds.errorImgs.length)])
      .setColor('#FFC000')

    await interaction.reply({embeds: [embed], ephemeral: true})
    return
  } 
  else if (serverQueue.repeatMode === 'queue') {
    serverQueue.songs.unshift(serverQueue.songs[serverQueue.songs.length - 1])
    serverQueue.songs.unshift(serverQueue.songs[serverQueue.songs.length - 1])
    serverQueue.songs.pop()

    await serverQueue.player.stop()
    setTimeout(async () => {
      serverQueue.songs.pop()
    }, 300)
  } 
  else if (serverQueue.repeatMode === 'track') {
  serverQueue.songs.unshift(serverQueue.songs[serverQueue.songs.length - 1])
    serverQueue.songs.pop()

    await serverQueue.player.stop()
  } 

  embed.setTitle('⏮️ Cofnąłem utwór')
  .setThumbnail(config.cmds.musicImgs.back[Math.floor(Math.random() * config.cmds.musicImgs.back.length)])
  .setColor('RANDOM')
  .setFooter(`💡 Utworów w kolejce: ${await serverQueue.songs.length}\n🛠️ v${config.version} ┇ ⚡ RockyBot® 2021`, interaction.user.displayAvatarURL({dynamic: true}))

  await interaction.reply({embeds: [embed]})

  if (interaction.channelId !== serverQueue.textChannel.id) {
    await serverQueue.textChannel.send({embeds: [embed]})
  }
}

const options = {
  name: 'back',
  description: '⏮️ Cofnij utwór',
  type: 1, 
}

export { execute, options }