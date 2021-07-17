const { MessageEmbed, MessageButton, MessageActionRow, InteractionCollector } = require('discord.js')

module.exports = {

  async execute(client, interaction) {
    try {
      const missingPerms = 'BANOWANIE CZŁONKÓW'
      if (!interaction.guild.me.permissionsIn(interaction.channel).has('BAN_MEMBERS')) {
        //PermsCheck: missing bot perms
        const ifBot = 1
        return client.base.get('check').missingPerms(client, interaction, missingPerms, ifBot)
      } 
      else if (!interaction.member.permissionsIn(interaction.channel).has('BAN_MEMBERS')  && !client.ownerID.includes(interaction.user.id)) {
        //PermsCheck: missing user perms
        return client.base.get('check').missingPerms(client, interaction, missingPerms)
      }
    
      const mentioned = interaction.options.map(x => x.options)[0].map(x => x.member)[0]
  
      const embed = new MessageEmbed()
        .setColor('RANDOM')
        .setFooter(`💡 ${mentioned.user.tag}\n🛠️ v${client.version} ┇ ⚡ RockyBot® 2021`, mentioned.user.displayAvatarURL({dynamic: true}))

      if (mentioned.permissions.has('MANAGE_MESSAGES')) {
        embed.setTitle(`${client.emotes.warn}  Nie mogę zbanować...`)
          .setDescription(`**...moderatora [${mentioned.user.tag}](https://discord.com/users/${mentioned.id})**, ma uprawnienie 'ZARZĄDZANIE WIADOMOŚCIAMI'`)
          .setThumbnail(client.cmds.errorImgs[Math.floor(Math.random() * client.cmds.errorImgs.length)])
          .setColor('#FFC000')

        return interaction.reply({embeds: [embed], ephemeral: true})
      }

      if (!mentioned.bannable) {
        embed.setTitle(`${client.emotes.warn}  Moja rola jest za niska...`)
          .setDescription(`**...lub [${mentioned.user.tag}](https://discord.com/users/${mentioned.id}) jest właścicielem serwera**`)
          .setThumbnail(client.cmds.errorImgs[Math.floor(Math.random() * client.cmds.errorImgs.length)])
          .setColor('#FFC000')

        return interaction.reply({embeds: [embed], ephemeral: true})
      }

      await interaction.defer()

      let reason, reasonToProvide
      if (interaction.options.map(x => x.options)[0].map(x => x)[1]) {
        reason = interaction.options.map(x => x.options)[0].map(x => x.value)[1]
        reasonToProvide = 'Mod: ' + interaction.user.tag + '┇' + interaction.user.id + ';  Reason: ' + interaction.options.map(x => x.value)[1]
      } 
      else {
        reason = 0
        reasonToProvide = 'Mod: ' + interaction.user.tag + '┇' + interaction.user.id + ';  Reason not provided' 
      }

      embed.setTitle(`${client.emotes.siren}  Czy na pewno chcesz zbanować...`)
        .setThumbnail(client.cmds.loadingImgs[Math.floor(Math.random() * client.cmds.loadingImgs.length)])
        if (reason === 0) {
          embed.setDescription(`**...użytkownika [${mentioned.user.tag}](https://discord.com/users/${mentioned.id}), nie podając powodu?**`)
        }
        else {
          embed.setDescription(`**...użytkownika [${mentioned.user.tag}](https://discord.com/users/${mentioned.id}), podając powód**\n\n\`${reason}\`**?**`)
        }

      const button = new MessageButton()
        .setLabel('TAK')
        .setStyle('DANGER')
        .setEmoji(client.emotes.grverify_ID)
        .setCustomId('ban')

      const button2 = new MessageButton()
        .setLabel('NIE')
        .setStyle('SUCCESS')
        .setEmoji(client.emotes.rverify_ID)
        .setCustomId('cancel')

      const buttonRow = new MessageActionRow().addComponents([button, button2])

      const reply = await interaction.editReply({embeds: [embed], components: [buttonRow]})

      const collector = new InteractionCollector(client, {message: reply, time: 30000, dispose: true})
      collector.on('collect', async buttonClick => {
        if (buttonClick.user.id !== interaction.user.id) {
          const replyEmbed = new MessageEmbed().setColor('RED').setDescription(`**${client.emotes.grverify} Nie wywołałeś tej wiadomości**`).setFooter(`🛠️ v${client.version} ┇ ⚡ RockyBot® 2021 Reply Engine`, buttonClick.user.displayAvatarURL({dynamic: true}))
          
          await buttonClick.reply({ embeds: [replyEmbed], ephemeral: true })
        } 
        else if (buttonClick.customId === 'cancel') {
          collector.stop()
          
          embed.setTitle(`${client.emotes.rverify}  Anulowano banowanie użytkownika...`)
            .setDescription(`**...[${mentioned.user.tag}](https://discord.com/users/${mentioned.id})**`)
            .setThumbnail(client.cmds.errorImgs[Math.floor(Math.random() * client.cmds.errorImgs.length)])
  
          return interaction.editReply({embeds: [embed], components: []})
        } 
        else if (buttonClick.customId === 'ban') {
          await mentioned.ban({ reason: reasonToProvide })

          embed.setTitle(`${client.emotes.staff}  Zbanowano użytkownika...`)
            .setThumbnail(mentioned.user.displayAvatarURL())
            .setImage(client.cmds.moderationImgs.ban[Math.floor(Math.random() * client.cmds.moderationImgs.ban.length)])
            if (reason === 0) {
              embed.setDescription(`**...[${mentioned.user.tag}](https://discord.com/users/${mentioned.id}), nie podając powodu**`)
            }
            else {
              embed.setDescription(`**...[${mentioned.user.tag}](https://discord.com/users/${mentioned.id}), podając powód**\n\n\`${reason}\``)
            }
  
          return interaction.editReply({embeds: [embed], components: []})
        }
      })
    } 
    catch (err) {
      return client.base.get('cmd').error(client, interaction, err)
    }
  }
}