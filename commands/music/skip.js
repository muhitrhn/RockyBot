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
        .setThumbnail(client.cmds.musicImgs.skip[Math.floor(Math.random() * client.cmds.musicImgs.skip.length)])
        .setColor('RANDOM')
        .setFooter(`💡 Utworów w kolejce: ${serverQueue.songs.length}\n🛠️ v${client.version} ┇ ⚡ RockyBot® 2021`, interaction.user.displayAvatarURL({dynamic: true}))

      await interaction.reply({embeds: [embed]})

      if (interaction.channel.id !== serverQueue.textChannel.id) {
        await serverQueue.textChannel.send({embeds: [embed]})
      }
    }
    catch (err) {
      return client.base.get('cmd').error(client, interaction, err)
    }
  }
}