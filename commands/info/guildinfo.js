const { MessageEmbed, MessageButton, MessageActionRow, InteractionCollector } = require('discord.js')

module.exports = {

  async execute(client, interaction) {
    try {
      await interaction.defer()

      return client.commands.get('infoguildinfo.js').main(client, interaction)
    } catch (err) {
      return client.base.get('cmd').error(client, interaction, err)
    }
  },

  async main(client, interaction, bt, embedColor) {
    try {
      await interaction.guild.members.fetch(); await interaction.guild.emojis.fetch();  await interaction.guild.channels.fetch()

      const embed = new MessageEmbed().setDescription('')
        .setFooter(`🛠️ v${client.version} ┇ ⚡ RockyBot® 2021`, interaction.user.displayAvatarURL({dynamic: true}))
        .setThumbnail(interaction.guild.iconURL({ dynamic: true }))
        .setTitle(`🖥️  Serwer **${interaction.guild.name}**`)
        embedColor ? embed.setColor(embedColor) : embed.setColor('RANDOM')
        embed.addField(
          '🔆 <-- Ogólne -->', 

          `📎 ID: **${interaction.guild.id}**` + '\n' +
          `⛳ Właściciel: **${client.users.cache.get(interaction.guild.ownerId).tag}**` + '\n' +
          `⏲️ Utworzono (UTC): **${interaction.guild.createdAt.getUTCHours()}:${(interaction.guild.createdAt.getUTCMinutes()<10?'0':'')+parseInt(interaction.guild.createdAt.getUTCMinutes())}┇${(interaction.guild.createdAt.getUTCDate()<10?'0':'')+parseInt(interaction.guild.createdAt.getUTCDate())}.${((interaction.guild.createdAt.getUTCMonth()+1)<10?'0':'')+parseInt(interaction.guild.createdAt.getUTCMonth()+1)}.${interaction.guild.createdAt.getUTCFullYear()}**` +
          '\u200b'
        )
        .addField(
          `${client.emotes.world} <-- Statystyki -->`,

          `🪃 Roli: **${interaction.guild.roles.cache.size}**` + '\n' +
          `${client.emotes.cpu} Emoji ogółem: **${interaction.guild.emojis.cache.size}**` + '\n' +
          `${client.emotes.changelog} Normalnych emoji: **${interaction.guild.emojis.cache.filter(emoji => !emoji.animated).size}**` + '\n' +
          `${client.emotes.nitro} Animowanych emoji: **${interaction.guild.emojis.cache.filter(emoji => emoji.animated).size}**` + '\n' +
          `👥 Ludzi: **${interaction.guild.members.cache.filter(member => !member.user.bot).size}**` + '\n' +
          `🤖 Botów: **${interaction.guild.members.cache.filter(member => member.user.bot).size}**` + '\n' +
          `✍️ Kanałow tekstowych: **${interaction.guild.channels.cache.filter(channel => channel.type === 'text').size}**` + '\n' +
          `🔊 Kanałów głosowych: **${interaction.guild.channels.cache.filter(channel => channel.type === 'voice').size}**` + '\n' +
          `🔰 Boostów: **${interaction.guild.premiumSubscriptionCount || '0'}**`
        )

      const button = new MessageButton()
        .setStyle('PRIMARY')
        .setEmoji(client.emotes.staff_ID)
        .setLabel('Moderatorzy')
        .setCustomId('moderators')

      const buttonRow = new MessageActionRow().addComponents([button])

      // eslint-disable-next-line no-empty
      try {await bt.deferUpdate()} catch (err) {}

      const reply = await interaction.editReply({embeds: [embed], components: [buttonRow]})

      const collector = new InteractionCollector(client, {message: reply, time: 30000, dispose: true})
      collector.on('collect', async buttonClick => {
        if (buttonClick.user.id !== interaction.user.id) {
          const replyEmbed = new MessageEmbed().setColor('RED').setDescription(`**${client.emotes.grverify} Nie wywołałeś tej wiadomości**`).setFooter(`🛠️ v${client.version} ┇ ⚡ RockyBot® 2021 Reply Engine`, buttonClick.clicker.user.displayAvatarURL({dynamic: true}))
         
          await buttonClick.reply.send({ embeds: [replyEmbed], ephemeral: true })
        } else {
          collector.stop()

          const embedColor = embed.color
          return client.commands.get('infoguildinfo.js').modders(client, interaction, buttonClick, embedColor)
        }
      })
    } catch (err) {
      return client.base.get('cmd').error(client, interaction, err)
    }
  },

  async modders(client, interaction, bt, embedColor) {
    try {
      const mods = await interaction.guild.roles.cache.filter(role => role.permissions.has('MANAGE_MESSAGES') && role.members.filter(member => !member.user.bot).map(x => x)[0]).map(x => `\n${client.emotes.grverify} **${x}**:\n${x.members.filter(y => !y.user.bot).map(y => client.emotes.yellowDot + ' ' + y.user.tag).join('\n')}`).join('\n')
      
      const embed = new MessageEmbed()
        .setTitle(`${client.emotes.staff} Moderatorzy na serwerze ${interaction.guild.name}`)
        .setThumbnail(interaction.guild.iconURL({ dynamic: true }))
        .setFooter(`🛠️ v${client.version} ┇ ⚡ RockyBot® 2021`, interaction.user.displayAvatarURL({dynamic: true}))
        .setColor(embedColor)
        if (mods[0]) {
          embed.setDescription(`${client.emotes.rverify} *Role z uprawnieniami \`ZARZĄDZANIE WIADOMOŚCIAMI\`*\n\n${mods}`)
        }
        else {
          const mod = interaction.guild.members.cache.filter(member => member.permissions.has('MANAGE_MESSAGES') && !member.user.bot).map(y => client.emotes.yellowDot + ' ' + y.user.tag).join('\n')
        
          embed.setDescription(`${client.emotes.rverify} *Użytkownicy z uprawnieniami \`ZARZĄDZANIE WIADOMOŚCIAMI\`*\n\n${mod}`)
        } 

      const button = new MessageButton()
        .setLabel('Wróć')
        .setStyle('SECONDARY')
        .setEmoji(client.emotes.arrl_ID)
        .setCustomId('back')

      const buttonRow = new MessageActionRow().addComponents([button])

      await bt.deferUpdate()

      const reply = await interaction.editReply({embeds: [embed], components: [buttonRow]})

     const collector = new InteractionCollector(client, {message: reply, time: 30000, dispose: true})
      collector.on('collect', async buttonClick => {
        if (buttonClick.user.id !== interaction.user.id) {
          const replyEmbed = new MessageEmbed().setColor('RED').setDescription(`**${client.emotes.grverify} Nie wywołałeś tej wiadomości**`).setFooter(`🛠️ v${client.version} ┇ ⚡ RockyBot® 2021 Reply Engine`, buttonClick.clicker.user.displayAvatarURL({dynamic: true}))
          
          await buttonClick.reply.send({ embeds: [replyEmbed], ephemeral: true })
        } 
        else {
          collector.stop()

          const embedColor = embed.color
          return client.commands.get('infoguildinfo.js').main(client, interaction, buttonClick, embedColor)
        }
      })
    } 
    catch (err) {
      return client.base.get('cmd').error(client, interaction, err)
    }
  }
}