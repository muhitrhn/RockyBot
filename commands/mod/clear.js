const { MessageEmbed, MessageButton, MessageActionRow, InteractionCollector } = require('discord.js')

module.exports = {

  async execute(client, interaction) {
    try {
      const embed = new MessageEmbed()
        .setColor('RANDOM')
        .setFooter(`🛠️ v${client.version} ┇ ⚡ RockyBot® 2021`, interaction.user.displayAvatarURL({dynamic: true}))

      const missingPerms = 'ZARZĄDZANIE WIADOMOŚCIAMI'
      if (!interaction.guild.me.permissionsIn(interaction.channel).has('MANAGE_MESSAGES')) {
        //PermsCheck: missing bot perms
        const ifBot = 1

        return client.base.get('check').missingPerms(client, interaction, missingPerms, ifBot)
      } 
      else if (!interaction.member.permissionsIn(interaction.channel).has('MANAGE_MESSAGES')  && !client.ownerID.includes(interaction.user.id)) {
        //PermsCheck: missing user perms
        return client.base.get('check').missingPerms(client, interaction, missingPerms)
      }

      //ArgsCheck
      const amount = interaction.options.map(x => x.options)[0].map(x => x.value)[0]

      if (amount < 1 || amount > 1000) {
        //Bad amount
        embed.setTitle(`${client.emotes.world}  Podano liczbę wiadomości...`)
          .setThumbnail(client.cmds.errorImgs[Math.floor(Math.random() * client.cmds.errorImgs.length)])
          .setColor('#FFC000')
          if (amount < 1) {
            embed.setDescription('**...mniejszą od 1**')
          }
          else {
            embed.setDescription('**...większą od 1000**')
          }

        return interaction.reply({embeds: [embed], ephemeral: true})
      }

      await interaction.defer()

      embed.setTitle(`${client.emotes.siren}  Czy na pewno chcesz usunąć...`)
        .setDescription(`**...\`${amount}\` wiadomości?**`)
        .setThumbnail(client.cmds.loadingImgs[Math.floor(Math.random() * client.cmds.loadingImgs.length)])

      const button = new MessageButton()
        .setLabel('TAK')
        .setStyle('DANGER')
        .setEmoji(client.emotes.grverify_ID)
        .setCustomId('delete')

      const button2 = new MessageButton()
        .setLabel('NIE')
        .setStyle('SUCCESS')
        .setEmoji(client.emotes.rverify_ID)
        .setCustomId('cancel')

      const buttonRow = new MessageActionRow().addComponents([button, button2])

      const reply = await interaction.editReply({embeds: [embed], components: [buttonRow]})

      const collector = new InteractionCollector(client, {message: reply, time: 30000, dispose: true })
      collector.on('collect', async buttonClick => {
        if (buttonClick.user.id !== interaction.user.id) {
          const replyEmbed = new MessageEmbed().setColor('RED').setDescription(`**${client.emotes.grverify} Nie wywołałeś tej wiadomości**`).setFooter(`🛠️ v${client.version} ┇ ⚡ RockyBot® 2021 Reply Engine`, buttonClick.user.displayAvatarURL({dynamic: true}))
          
          await buttonClick.reply({ embeds: [replyEmbed], ephemeral: true })
        } 
        else if (buttonClick.customId === 'cancel') {
          collector.stop()
          
          embed.setTitle(`${client.emotes.rverify}  Anulowano usuwanie...`)
            .setDescription(`**...\`${amount}\` wiadomości**`)
            .setThumbnail(client.cmds.errorImgs[Math.floor(Math.random() * client.cmds.errorImgs.length)])

          return interaction.editReply({embeds: [embed], components: []})
        } 
        else if (buttonClick.customId === 'delete') {
          collector.stop()
          
          return client.commands.get('modclear.js').clear(client, interaction, reply, embed, amount)
        }
      })

    } 
    catch (err) {
      return client.base.get('cmd').error(client, interaction, err)
    }
  },

  async clear(client, interaction, reply, embed, amount) {
    try {
      embed.setTitle(`${client.emotes.winLoad}  Usuwanie wiadomości...`)
        .setDescription('')
        .setThumbnail(client.cmds.moderationImgs.clearInProg[Math.floor(Math.random() * client.cmds.moderationImgs.clearInProg.length)])

      await interaction.editReply({embeds: [embed], components: []})

      //FastDelete
      let deleted = 0, toDelete = []
      let deletingCache = amount
      let deleting

      for (;deletingCache > 99;) {
        await interaction.channel.messages.fetch({ limit: 100}).then(msgs => msgs.forEach(msg => toDelete.push(msg)))
        const deletable = toDelete.filter(mssg => mssg.id !== reply.id)

        deleting = await interaction.channel.bulkDelete(deletable, true)
        deleted = deleted*1 + deleting.size
        toDelete = []
        deletingCache = deletingCache - deleting.size
        if (deleting.size < 99) {
          break
        }
      }

      if (deletingCache < 100) {
        await interaction.channel.messages.fetch({ limit: deletingCache + 1 }).then(msgs => msgs.forEach(msg => toDelete.push(msg)))
        const deletable = toDelete.filter(mssg => mssg.id !== reply.id)

        deleting = await interaction.channel.bulkDelete(deletable, true)
        deleted = deleted*1 + deleting.size
        toDelete = []
      }

      embed.setTitle(`${client.emotes.trash}  Usunięto \`${deleted}\`/\`${amount}\` wiadomości`)
        .setDescription(`*${client.emotes.gearspin} Wiadomości starsze niż 14 dni nie mogą zostać usunięte*`)
        .setThumbnail(client.cmds.moderationImgs.clear)

      return interaction.editReply({embeds: [embed]})      
    }
    catch (err) {
      return client.base.get('cmd').error(client, interaction, err)
    }
  }
}