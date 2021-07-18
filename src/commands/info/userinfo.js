const { MessageEmbed, MessageButton, MessageActionRow, InteractionCollector } = require('discord.js')

module.exports = {

  async execute(client, interaction) {
    try {
      await interaction.defer()

      const mentioned = interaction.options.map(x => x.options)[0] ? interaction.options.map(x => x.options)[0].map(x => x.member)[0] : interaction.member

      return this.main(client, interaction, mentioned)
    } catch (err) {
      return client.base.get('cmd').error(client, interaction, err)
    }

  },

  async main(client, interaction, mentioned, bt, color) {
    try {
      const embed = new MessageEmbed()
        .setFooter(`💡 ${mentioned.user.tag}\n🛠️ v${client.version} ┇ ⚡ RockyBot® 2021`, mentioned.user.displayAvatarURL({dynamic: true}))
        .setThumbnail(mentioned.user.displayAvatarURL({ dynamic: true }))
        .setTitle(`💻  Użytkownik ${mentioned.user.tag}`)
        .setDescription(
          `🛡️ **${mentioned}**` + '\n' +
          `📎 ID: **${mentioned.user.id}**` + '\n' + 
          `${mentioned.nickname ? `${client.emotes.grverify} Nick: **${mentioned.nickname}**\n` : ''}` + '\n' +
          `⏲️ Konto założone (UTC): **${mentioned.user.createdAt.getUTCHours()}:${(mentioned.user.createdAt.getUTCMinutes()<10?'0':'')+parseInt(mentioned.user.createdAt.getUTCMinutes())}┇${(mentioned.user.createdAt.getUTCDate()<10?'0':'')+parseInt(mentioned.user.createdAt.getUTCDate())}.${((mentioned.user.createdAt.getUTCMonth()+1)<10?'0':'')+parseInt(mentioned.user.createdAt.getUTCMonth()+1)}.${mentioned.user.createdAt.getUTCFullYear()}**` + '\n' +
          `${client.emotes.world} Dołączono do serwera (UTC): **${mentioned.joinedAt.getUTCHours()}:${(mentioned.joinedAt.getUTCMinutes()<10?'0':'')+parseInt(mentioned.joinedAt.getUTCMinutes())}┇${(mentioned.joinedAt.getUTCDate()<10?'0':'')+parseInt(mentioned.joinedAt.getUTCDate())}.${((mentioned.joinedAt.getUTCMonth()+1)<10?'0':'')+parseInt(mentioned.joinedAt.getUTCMonth()+1)}.${mentioned.joinedAt.getUTCFullYear()}**`
        )
        color ? embed.setColor(color) : embed.setColor('RANDOM'); const embedColor = embed.color

      if (mentioned.permissions.has('ADMINISTRATOR')) {
        const button = new MessageButton()
          .setLabel('Administrator')
          .setStyle('DANGER')
          .setEmoji(client.emotes.grverify_ID)
          .setCustomId('ch_perms')
          .setDisabled(true)

        const messageRow = new MessageActionRow().addComponents([button])

        return interaction.editReply({embeds: [embed], components: [messageRow]})
      } 
      
      const button = new MessageButton()
        .setLabel('Permisje kanału')
        .setStyle('PRIMARY')
        .setEmoji('⚒️')
        .setCustomId('ch_perms')

      const button2 = new MessageButton()
        .setLabel('Permisje globalne')
        .setStyle('SUCCESS')
        .setEmoji('🛠️')
        .setCustomId('glob_perms')

      const messageRow = new MessageActionRow().addComponents([button, button2])

      // eslint-disable-next-line no-empty
      try {await bt.deferUpdate()} catch (err) {} 

      const reply = await interaction.editReply({embeds: [embed], components: [messageRow]})

      const collector = new InteractionCollector(client, {message: reply, time: 30000, dispose: true})
      collector.on('collect', async buttonClick => {
        if (buttonClick.user.id !== interaction.user.id) {
          const replyEmbed = new MessageEmbed().setColor('RED').setDescription(`**${client.emotes.grverify} Nie wywołałeś tej wiadomości**`).setFooter(`🛠️ v${client.version} ┇ ⚡ RockyBot® 2021 Reply Engine`, buttonClick.clicker.user.displayAvatarURL({dynamic: true}))
          
          await buttonClick.reply.send({ embeds: [replyEmbed], ephemeral: true })
        } 
        else if (buttonClick.customId === 'ch_perms') {
          collector.stop()

          return this.chPerms(client, interaction, mentioned, buttonClick, embedColor)
        } 
        else if (buttonClick.customId === 'glob_perms') {
          collector.stop()

          return this.globPerms(client, interaction, mentioned, buttonClick, embedColor)
        }
      })
    }
    catch (err) {
      return client.base.get('cmd').error(client, interaction, err)
    }

  },

  async chPerms(client, interaction, mentioned, bt, color) {
    try {
      const perms = [
        (mentioned.permissionsIn(interaction.channel).has('VIEW_CHANNEL') ? client.emotes.grverify : client.emotes.rverify) +  ' Wyświetlanie kanału',
        (mentioned.permissionsIn(interaction.channel).has('SEND_MESSAGES') ? client.emotes.grverify : client.emotes.rverify) +  ' Wysyłanie wiadomości',
        (mentioned.permissionsIn(interaction.channel).has('ADD_REACTIONS') ? client.emotes.grverify : client.emotes.rverify) +  ' Dodawanie reakcji',
        (mentioned.permissionsIn(interaction.channel).has('SEND_TTS_MESSAGES') ? client.emotes.grverify : client.emotes.rverify) +  ' Wysyłanie wiadomości TTS',
        (mentioned.permissionsIn(interaction.channel).has('ATTACH_FILES') ? client.emotes.grverify : client.emotes.rverify) +  ' Załączanie plików',
        (mentioned.permissionsIn(interaction.channel).has('READ_MESSAGE_HISTORY') ? client.emotes.grverify : client.emotes.rverify) +  ' Wyświetlanie historii czatu',
        (mentioned.permissionsIn(interaction.channel).has('USE_EXTERNAL_EMOJIS') ? client.emotes.grverify : client.emotes.rverify) +  ' Używanie zewnętrznych emoji',
        (mentioned.permissionsIn(interaction.channel).has('MENTION_EVERYONE') ? client.emotes.grverify : client.emotes.rverify) +  ' Używanie wzmianki "everyone"',
        (mentioned.permissionsIn(interaction.channel).has('MANAGE_MESSAGES') ? client.emotes.grverify : client.emotes.rverify) +  ' Zarządzanie wiadomościami'
      ]
      const embed = new MessageEmbed()
        .setFooter(`💡 ${mentioned.user.tag}\n🛠️ v${client.version} ┇ ⚡ RockyBot® 2021`, mentioned.user.displayAvatarURL({dynamic: true}))
        .setThumbnail(mentioned.user.displayAvatarURL({ dynamic: true }))
        .setTitle(`${client.emotes.warn} Uprawnienia na kanale ${interaction.channel.name} dla ${mentioned.user.tag}`)
        .setColor(color)
        .addField('📡 Uprawnienia na kanale:', perms.join('\n'))

      const button = new MessageButton()
        .setLabel('Wróć')
        .setStyle('SECONDARY')
        .setEmoji(client.emotes.arrl_ID)
        .setCustomId('back')

      const messageRow = new MessageActionRow().addComponents([button])

      await bt.deferUpdate()

      const reply = await interaction.editReply({embeds: [embed], components: [messageRow]})
      
      const collector = new InteractionCollector(client, {message: reply, time: 30000, dispose: true})
      collector.on('collect', async buttonClick => {
        if (buttonClick.user.id !== interaction.user.id) {
          const replyEmbed = new MessageEmbed().setColor('RED').setDescription(`**${client.emotes.grverify} Nie wywołałeś tej wiadomości**`).setFooter(`🛠️ v${client.version} ┇ ⚡ RockyBot® 2021 Reply Engine`, buttonClick.clicker.user.displayAvatarURL({dynamic: true}))
          
          await buttonClick.reply.send({ embeds: [replyEmbed], ephemeral: true })
        } 
        else if (buttonClick.customId === 'back'){
          collector.stop()
          
          return this.main(client, interaction, mentioned, buttonClick, color)
        }
      })
    } 
    catch (err) {
      await client.base.get('cmd').error(client, interaction, err)
    }
  },

  async globPerms(client, interaction, mentioned, bt, color) {
    try {
      const serverperms = [
        (mentioned.permissions.has('BAN_MEMBERS') ? client.emotes.grverify : client.emotes.rverify) +  ' Banowanie członków',
        (mentioned.permissions.has('KICK_MEMBERS') ? client.emotes.grverify : client.emotes.rverify) +  ' Wyrzucanie członków',
        (mentioned.permissions.has('VIEW_AUDIT_LOG') ? client.emotes.grverify : client.emotes.rverify) +  ' Wyświetlanie dziennika zdarzeń',
        (mentioned.permissions.has('MANAGE_GUILD') ? client.emotes.grverify : client.emotes.rverify) +  ' Zarządzanie serwerem',
        (mentioned.permissions.has('MANAGE_CHANNELS') ? client.emotes.grverify : client.emotes.rverify) +  ' Zarządzanie kanałami',
        (mentioned.permissions.has('MANAGE_ROLES') ? client.emotes.grverify : client.emotes.rverify) +  ' Zarządzanie rolami i permisjami',
        (mentioned.permissions.has('MANAGE_EMOJIS') ? client.emotes.grverify : client.emotes.rverify) +  ' Zarządzanie emoji',
        (mentioned.permissions.has('MANAGE_NICKNAMES') ? client.emotes.grverify : client.emotes.rverify) +  ' Zarządzanie pseudonimami',
        (mentioned.permissions.has('VIEW_GUILD_INSIGHTS') ? client.emotes.grverify : client.emotes.rverify) +  ' Wyświetlanie informacji o serwerze',
        (mentioned.permissions.has('CREATE_INSTANT_INVITE') ? client.emotes.grverify : client.emotes.rverify) +  ' Tworzenie szybkich zaproszeń'
      ]
      const voiceperms = [
        (mentioned.permissions.has('CONNECT') ? client.emotes.grverify : client.emotes.rverify) +  ' Łączenie',
        (mentioned.permissions.has('SPEAK') ? client.emotes.grverify : client.emotes.rverify) +  ' Rozmowa',
        (mentioned.permissions.has('STREAM') ? client.emotes.grverify : client.emotes.rverify) +  ' Wideo',
        (mentioned.permissions.has('PRIORITY_SPEAKER') ? client.emotes.grverify : client.emotes.rverify) +  ' Priorytetowy rozmówca',
        (mentioned.permissions.has('DEAFEN_MEMBERS') ? client.emotes.grverify : client.emotes.rverify) +  ' Wyciszanie innych użytkowników',
        (mentioned.permissions.has('MOVE_MEMBERS') ? client.emotes.grverify : client.emotes.rverify) +  ' Przenoszenie innych użytkowników'
      ]
      const embed = new MessageEmbed()
        .setFooter(`💡 ${mentioned.user.tag}\n🛠️ v${client.version} ┇ ⚡ RockyBot® 2021`, mentioned.user.displayAvatarURL({dynamic: true}))
        .setThumbnail(mentioned.user.displayAvatarURL({ dynamic: true }))
        .setTitle(`${client.emotes.world} Uprawnienia na serwerze dla ${mentioned.user.tag}`)
        .setColor(color)
        .addField(`${client.emotes.staff} Zarządzanie serwerem:`, serverperms.join('\n'))

        .addField('🗣️ Kanały głosowe', voiceperms.join('\n'))

      const button = new MessageButton()
        .setLabel('Wróć')
        .setStyle('SECONDARY')
        .setEmoji(client.emotes.arrl_ID)
        .setCustomId('back')

      const messageRow = new MessageActionRow().addComponents([button])
      
      await bt.deferUpdate()

      const reply = await interaction.editReply({embeds: [embed], components: [messageRow]})

      const collector = new InteractionCollector(client, {message: reply, time: 30000, dispose: true})
      collector.on('collect', async buttonClick => {
        if (buttonClick.user.id !== interaction.user.id) {
          const replyEmbed = new MessageEmbed().setColor('RED').setDescription(`**${client.emotes.grverify} Nie wywołałeś tej wiadomości**`).setFooter(`🛠️ v${client.version} ┇ ⚡ RockyBot® 2021 Reply Engine`, buttonClick.clicker.user.displayAvatarURL({dynamic: true}))
          
          await buttonClick.reply.send({ embeds: [replyEmbed], ephemeral: true })
        } 
        else if (buttonClick.customId === 'back'){
          collector.stop()
          
          return this.main(client, interaction, mentioned, buttonClick, color)
        }
      })
    } 
    catch (err) {
      return client.base.get('cmd').error(client, interaction, err)
    }
  }
}