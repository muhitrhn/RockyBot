const { MessageEmbed, MessageButton, MessageActionRow, InteractionCollector } = require('discord.js')
const warnModel = require('../../../models/warns')

module.exports = {

  async execute(client, interaction) {
    try {
      await interaction.defer()

      const mentioned = interaction.options.map(x => x.options)[0].map(x => x.options)[0] ? interaction.options.map(x => x.options)[0].map(x => x.options)[0].map(x => x.member)[0] : interaction.member

      return this.list(client, interaction, mentioned)
    }
    catch (err) {
      return client.base.get('cmd').error(client, interaction, err)
    }
  },

  async list(client, interaction, mentioned, page, bt, embedColor){
    try {
      const embed = new MessageEmbed()
        .setThumbnail(mentioned.user.displayAvatarURL({ dynamic: true }))
        .setFooter(`💡 ${mentioned.user.tag}\n🛠️ v${client.version} ┇ ⚡ RockyBot® 2021`, mentioned.user.displayAvatarURL({dynamic: true}))

      if (!page) page = 1
      let num = (page*5)-4

      const warnDatas = await warnModel.find({ User: mentioned.user.id, GuildID: interaction.guild.id })
      if (!warnDatas.length) {
        embed.setTitle(`${client.emotes.grverify}  Użytkownik...`)
          .setDescription(`**...[${mentioned.user.tag}](https://discord.com/users/${mentioned.user.id}) nie posiada warnów**`)
          .setColor('RANDOM')

        return interaction.editReply({embeds: [embed]})
      }

      let maxPage
      if (warnDatas.length <= 5) maxPage = 1
      else maxPage = Math.ceil(warnDatas.length/5)

      let warns = [] 
      const warnsPage = warnDatas.slice(5*(page-1), page*5)
      warnsPage.forEach(y => {
        warns.push(`**#${num}**: Moderator${interaction.guild.members.cache.get(y.ModID) ? `: **[${interaction.guild.members.cache.get(y.ModID).user.tag}` : `o id: **[${y.ModID}`}](https://discord.com/users/${y.ModID})**\n${client.emotes.grverify} Powód: **${y.Reason}**\n||${client.emotes.yellowDot} ID: **${y._id}**||\n\n`)
        num = num + 1
      })  

      const embedDesc = warns.map(x => x).join(' ')

      embed.setTitle(`${client.emotes.world}  Lista warnów użytkownika...`)
        .setDescription(`**...[${mentioned.user.tag}](https://discord.com/users/${mentioned.user.id})**\n\n` + embedDesc + `${client.emotes.gearspin} *Strona **${page}**/**${maxPage}***`)
        embedColor ? embed.setColor(embedColor) : embed.setColor('RANDOM')

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
          return this.list(client, interaction, mentioned, pageToProv, buttonClick, embed.color)
        } 
        else if (buttonClick.customId === 'back') {
          collector.stop()

          const pageToProv = page - 1
          return this.list(client, interaction, mentioned, pageToProv, buttonClick, embed.color)
        }
      })
    }
    catch (err) {
      await client.base.get('cmd').error(client, interaction, err)
    }
  }
}