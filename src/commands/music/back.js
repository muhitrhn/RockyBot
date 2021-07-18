const { MessageEmbed } = require('discord.js')

module.exports = {

  async execute(client, interaction) {
    try {
      const serverQueue = client.queue.get(interaction.guild.id)
      const embed = new MessageEmbed()
        .setColor('RANDOM')
        .setFooter(`🛠️ v${client.version} ┇ ⚡ RockyBot® 2021`, interaction.user.displayAvatarURL({dynamic: true}))

      if (!interaction.member.voice.channel) {
        embed.setTitle(`${client.emotes.world}  Nie jesteś na kanale głosowym`)
          .setThumbnail(client.cmds.errorImgs[Math.floor(Math.random() * client.cmds.errorImgs.length)])
          .setColor('#FFC000')

        return interaction.reply({embeds: [embed], ephemeral: true})
      }

      if (!serverQueue) {
        embed.setTitle(`${client.emotes.world}  Nie gram na tym kanale`)
          .setThumbnail(client.cmds.errorImgs[Math.floor(Math.random() * client.cmds.errorImgs.length)])
          .setColor('#FFC000')

        return interaction.reply({embeds: [embed], ephemeral: true})
      }

      if (!serverQueue.repeatMode) {
        embed.setTitle(`${client.emotes.world}  Nie mogę cofnąć utworu...`)
          .setDescription(`**...powtarzanie utworów kanału ${serverQueue.voiceChannel.toString()} jest wyłączone, użyj \`/music repeat\` aby je włączyć.`)
          .setThumbnail(client.cmds.errorImgs[Math.floor(Math.random() * client.cmds.errorImgs.length)])
          .setColor('#FFC000')

        return interaction.reply({embeds: [embed], ephemeral: true})
      } 
      else if (serverQueue.repeatMode === 'queue') {
        serverQueue.songs.unshift(serverQueue.songs[serverQueue.songs.length - 1])
        serverQueue.songs.unshift(serverQueue.songs[serverQueue.songs.length - 1])
        serverQueue.songs.pop()

        await serverQueue.player.stop()
        setTimeout(async () => {
          serverQueue.songs.pop()

          embed.setTitle('⏮️ Cofnąłem utwór')
            .setThumbnail(client.cmds.musicImgs.back[Math.floor(Math.random() * client.cmds.musicImgs.back.length)])
            .setColor('RANDOM')
            .setFooter(`💡 Utworów w kolejce: ${serverQueue.songs.length}\n🛠️ v${client.version} ┇ ⚡ RockyBot® 2021`, interaction.user.displayAvatarURL({dynamic: true}))

          await interaction.reply({embeds: [embed]})
        }, 300)
      } 
      else if (serverQueue.repeatMode === 'track') {
        serverQueue.songs.unshift(serverQueue.songs[serverQueue.songs.length - 1])
        serverQueue.songs.pop()

        await serverQueue.player.stop()

        embed.setTitle('⏮️ Cofnąłem utwór')
        .setThumbnail(client.cmds.musicImgs.back[Math.floor(Math.random() * client.cmds.musicImgs.back.length)])
        .setColor('RANDOM')
        .setFooter(`💡 Utworów w kolejce: ${serverQueue.songs.length}\n🛠️ v${client.version} ┇ ⚡ RockyBot® 2021`, interaction.user.displayAvatarURL({dynamic: true}))

        await interaction.reply({embeds: [embed]})

        if (interaction.channel.id !== serverQueue.textChannel.id) {
          await serverQueue.textChannel.send({embeds: [embed]})
        }
      } 

      if (interaction.channel.id !== serverQueue.textChannel.id) {
        await serverQueue.textChannel.send({embeds: [embed]})
      }
    }
    catch (err) {
      return client.base.get('cmd').error(client, interaction, err)
    }
  }
}