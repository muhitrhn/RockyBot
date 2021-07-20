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

  if (interaction.options.get('typ')?.value === 'disable') {
    serverQueue.repeatMode = null
      
    embed.setTitle('❌ Usunąłem powtarzanie czegokolwiek')
  }
  else if (interaction.options.get('typ')?.value === 'queue') {
    serverQueue.repeatMode = 'queue'
      
	  embed.setTitle('🔁 Włączyłem powtarzanie kolejki')
  }
  else if (interaction.options.get('typ')?.value === 'track') {
    serverQueue.repeatMode = 'track'
      
	  embed.setTitle('🔂 Włączyłem powtarzanie utworu')
  }

  embed.setThumbnail(config.cmds.moderationImgs.clear[Math.floor(Math.random() * config.cmds.moderationImgs.clear.length)])
		.setColor('RANDOM')
		.setFooter(`💡 Utworów w kolejce: ${serverQueue.songs.length}\n🛠️ v${config.version} ┇ ⚡ RockyBot® 2021`, interaction.user.displayAvatarURL({dynamic: true}))

  await interaction.reply({embeds: [embed]})

  if (interaction.channelId !== serverQueue.textChannel.id) {
    await serverQueue.textChannel.send({embeds: [embed]})
  }
}

const options = {
  name: 'repeat',
  description: '🔁 Zmień tryb powtarzania utworu',
  type: 1,
  options: [
    {
      name: 'typ',
      description: '🔁 Zmień tryb powtarzania utworu',
      type: 'STRING',
      required: true,
      choices: [
        {
          name: '❌ Disable',
          value: 'disable'
        },
        {
          name: '🔁 Queue (default)',
          value: 'queue'
        },
        {
          name: '🔂 Track',
          value: 'track'
        },
      ]
    }
  ] 
}

export { execute, options }