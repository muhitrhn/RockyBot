const { MessageEmbed, MessageButton, MessageActionRow, InteractionCollector } = require('discord.js')

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
    
      await interaction.defer()

      return this.list(client, interaction)
    }
    catch (err) {
      return client.base.get('cmd').error(client, interaction, err)
    }
  },

  async list(client, interaction, page, bt, embedColor, embedThumbnail){
    try {
      const embed = new MessageEmbed()
        .setFooter(`🛠️ v${client.version} ┇ ⚡ RockyBot® 2021`, interaction.user.displayAvatarURL({dynamic: true}))

      if (!page) page = 1
      let num = (page*5)-4

      const nowPlay = await client.queue.get(interaction.guild.id).songs[0]
      const queue = await client.queue.get(interaction.guild.id).songs.slice(1)

      let maxPage
      if (queue.length <= 5) maxPage = 1
      else maxPage = Math.ceil(queue.length/5)

      let songs = [] 
      const songsPage = queue.slice(5*(page-1), page*5)
      songsPage.forEach(y => {
        songs.push(`**${client.emotes.yellowDot} ${num}**: ${y.title}┇*${y.length}*\n\n`)
        num = num + 1
      })  

      const embedDesc = songs.map(x => x).join(' ')
      embed.setTitle(`${client.emotes.grverify}  Kolejka...`)
        .setDescription(`**...kanału ${client.queue.get(interaction.guild.id).voiceChannel}**\n\n🔁 Powtarzanie kolejki: ${client.queue.get(interaction.guild.id).repeatMode === 'queue' ? client.emotes.grverify : client.emotes.rverify}\n🔂 Powtarzanie utworu: ${client.queue.get(interaction.guild.id).repeatMode === 'track' ? client.emotes.grverify : client.emotes.rverify}\n\n${client.emotes.boombox} Teraz gram: **${nowPlay.title}**┇***${nowPlay.length}***\n\n` + embedDesc + `${client.emotes.gearspin} ***Strona*** ***${page}***/***${maxPage}***`)
        embedColor ? embed.setColor(embedColor) : embed.setColor('RANDOM')
        embedThumbnail ? embed.setThumbnail(embedThumbnail) : embed.setThumbnail(client.cmds.musicImgs.queue[Math.floor(Math.random() * client.cmds.musicImgs.queue.length)])

      const button = new MessageButton()
        .setLabel('')
        .setEmoji(client.emotes.arrl_ID)
        .setCustomId('back')
        if (page === 1) {
          button.setStyle('SECONDARY')
          .setDisabled(true)
        } else {
          button.setStyle('PRIMARY')
        }

      const button2 = new MessageButton()
        .setLabel('')
        .setEmoji(client.emotes.arrr_ID)
        .setCustomId('next')
        if (maxPage - page === 0) {
          button2.setStyle('SECONDARY')
          .setDisabled(true)
        } else {
          button2.setStyle('PRIMARY')
        }

      const buttonRow = new MessageActionRow().addComponents([button, button2])

      const reply = await interaction.editReply({ embeds: [embed], components: [buttonRow] })
        
      // eslint-disable-next-line no-empty
      try {await bt.deferUpdate()} catch (err) {}

      if (maxPage === 1) {
        return
      }

      const collector = new InteractionCollector(client, {message: reply, time: 30000, dispose: true})
      collector.on('collect', async buttonClick => {
        if (buttonClick.user.id !== interaction.user.id) {
          const replyEmbed = new MessageEmbed().setColor('RED').setDescription(`**${client.emotes.grverify} Nie wywołałeś tej wiadomości**`).setFooter(`🛠️ v${client.version} ┇ ⚡ RockyBot® 2021 Reply Engine`, buttonClick.clicker.user.displayAvatarURL({dynamic: true}))
          
          await buttonClick.reply.send({ embeds: [replyEmbed], ephemeral: true })
        } 
        else if (buttonClick.customId === 'next') {
          collector.stop()
          
          const pageToProv = page + 1
          return this.list(client, interaction, pageToProv, buttonClick, embed.color, embed.thumbnail.url)
        } 
        else if (buttonClick.customId === 'back') {
          collector.stop()

          const pageToProv = page - 1
          return this.list(client, interaction, pageToProv, buttonClick, embed.color, embed.thumbnail.url)
        }
      }) 
    }
    catch (err) {
      await client.base.get('cmd').error(client, interaction, err)
    }
  }
}
