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

  const deletedSongs = serverQueue.songs.length - 1

  serverQueue.songs.length = 1

  embed.setTitle(`♻️ Usunąłem ${deletedSongs} utworów`)
    .setThumbnail(config.cmds.moderationImgs.clear[Math.floor(Math.random() * config.cmds.moderationImgs.clear.length)])
    .setColor('RANDOM')
    .setFooter(`♻️ Wyczyszczono utworów w kolejce: 1\n🛠️ v${config.version} ┇ ⚡ RockyBot® 2021`, interaction.user.displayAvatarURL({dynamic: true}))

  await interaction.reply({embeds: [embed]})

  if (interaction.channel.id !== serverQueue.textChannel.id) {
    await serverQueue.textChannel.send({embeds: [embed]})
  }
} 

const options = {
  name: 'clear',
  description: '❌ Wyczyść kolejkę odtwarzania',
  type: 1
}

export { execute, options }