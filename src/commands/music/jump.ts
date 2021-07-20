import { CommandInteraction, MessageEmbed }from 'discord.js'
import { queue, config } from '../..'

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

  if (serverQueue.songs.length - 1 < interaction.options.getInteger('numer', true) || interaction.options.getInteger('numer', true) < 1) {
    embed.setTitle(`${config.emotes.world}  Nie znaleziono podanego numeru utworu`)
      .setThumbnail(config.cmds.errorImgs[Math.floor(Math.random() * config.cmds.errorImgs.length)])
      .setColor('#FFC000')

    await interaction.reply({embeds: [embed], ephemeral: true})
    return
  }

  if (!serverQueue.repeatMode || serverQueue.repeatMode === 'queue') {
    const spliced = serverQueue.songs.splice(0, interaction.options.getInteger('numer', true) - 1)
    for (const unsplice of spliced) {
      serverQueue.songs.push(unsplice)
    }
  }
  else if (serverQueue.repeatMode === 'track') {
    const spliced = serverQueue.songs.splice(0, interaction.options.getInteger('numer', true))
    for (const unsplice of spliced) {
      serverQueue.songs.push(unsplice)
    }
  } 

  serverQueue.player.stop()

  embed.setTitle(`⤵️ Przesunąłem kolejkę...`)
    .setThumbnail(config.cmds.musicImgs.skip[Math.floor(Math.random() * config.cmds.musicImgs.skip.length)])
    .setDescription(`**...o \`${interaction.options.getInteger('numer', true)}\` utworów**`)
    .setColor('RANDOM')
    .setFooter(`💡 Utworów w kolejce: ${serverQueue.songs.length}\n🛠️ v${config.version} ┇ ⚡ RockyBot® 2021`, interaction.user.displayAvatarURL({dynamic: true}))

  await interaction.reply({embeds: [embed]})

  if (interaction.channelId !== serverQueue.textChannel.id) {
    await serverQueue.textChannel.send({embeds: [embed]})
  }
}

const options = {
  name: 'jump',
  description: '⤵️ Przeskocz na konkretny utwór',
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