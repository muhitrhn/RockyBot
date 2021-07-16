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

      if (serverQueue.songs.length < interaction.options.map(x => x.options)[0].map(x => x.options)[0].map(x => x.value)[0] || interaction.options.map(x => x.options)[0].map(x => x.options)[0].map(x => x.value)[0] < 1) {
        embed.setTitle(`${client.emotes.world}  Nie znaleziono podanego numeru utworu`)
          .setThumbnail(client.cmds.errorImgs[Math.floor(Math.random() * client.cmds.errorImgs.length)])
          .setColor('#FFC000')

        return interaction.reply({embeds: [embed], ephemeral: true})
      }

      const deletedSong = serverQueue.songs[interaction.options.map(x => x.options)[0].map(x => x.options)[0].map(x => x.value)[0]]

      delete serverQueue.songs[interaction.options.map(x => x.options)[0].map(x => x.options)[0].map(x => x.value)[0]]

      embed.setTitle(`♻️ Usunąłem utwór \`${deletedSong.title}\`...`)
        .setThumbnail(client.cmds.moderationImgs.clear[Math.floor(Math.random() * client.cmds.moderationImgs.clear.length)])
        .setDescription(`**...z numerem \`${interaction.options.map(x => x.options)[0].map(x => x.options)[0].map(x => x.value)[0]}\`, trwający \`${deletedSong.length}\`**`)
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