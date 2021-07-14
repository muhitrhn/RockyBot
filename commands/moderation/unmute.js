const { MessageEmbed, MessageButton, MessageActionRow, InteractionCollector } = require('discord.js')
const mutedSchema = require('../../models/settings')

module.exports = {

  async execute(client, interaction) {
    try {
      if (!interaction.guild.me.permissionsIn(interaction.channel).has('MANAGE_ROLES')) {
        //PermsCheck: missing bot perms
        const missingPerms = 'ZARZĄDZANIE ROLAMI'
        const ifBot = 1
        return client.base.get('check').missingPerms(client, interaction, missingPerms, ifBot)
      } 
      else if (!interaction.member.permissionsIn(interaction.channel).has('MANAGE_MESSAGES')  && !client.ownerID.includes(interaction.author.id)) {
        //PermsCheck: missing user perms
        const missingPerms = 'ZARZĄDZANIE WIADOMOŚCIAMI'
        return client.base.get('check').missingPerms(client, interaction, missingPerms)
      }

      const mentioned = interaction.options.map(x => x.options)[0].map(x => x.member)[0]

      const embed = new MessageEmbed()
        .setColor('RANDOM')
        .setFooter(`💡 ${mentioned.user.tag}\n🛠️ v${client.version} ┇ ⚡ RockyBot® 2021`, mentioned.user.displayAvatarURL({dynamic: true}))

      if (!mentioned.manageable) {
        embed.setTitle(`${client.emotes.warn}  Moja rola jest za niska...`)
          .setDescription(`**...aby zdjąć rolę wyciszenia z [${mentioned.user.tag}](https://discord.com/users/${mentioned.id})**`)
          .setThumbnail(client.cmds.errorImgs[Math.floor(Math.random() * client.cmds.errorImgs.length)])
          .setColor('#FFC000')

        return interaction.reply({embeds: [embed], ephemeral: true})
      }

      const data = await mutedSchema.findOne({
        GuildID: interaction.guild.id
      })

      let role
      if(data){
        await interaction.guild.roles.fetch()
        role = await interaction.guild.roles.cache.get(data.MutedRole)
      } 

      if(!role) {
        embed.setTitle(`${client.emotes.warn}  Ten serwer nie ma ustawionej...`)
          .setDescription('**...roli wyciszenia, użyj `/settings mutedrole` jeśli masz uprawnienie \'ZARZĄDZANIE SERWEREM\', aby ustawić rolę**')
          .setThumbnail(client.cmds.errorImgs[Math.floor(Math.random() * client.cmds.errorImgs.length)])
          .setColor('#FFC000')

        return interaction.reply({embeds: [embed], ephemeral: true})
      }

      if (!mentioned.roles.cache.some(role => role.id === data.Role)) {
        embed.setTitle(`${client.emotes.warn}  Użytkownik nie jest wyciszony,...`)
          .setDescription('**...użyj `/mute` aby go wyciszyć**')
          .setThumbnail(client.cmds.errorImgs[Math.floor(Math.random() * client.cmds.errorImgs.length)])
          .setColor('#FFC000')
          
        return interaction.reply({embed: embed, ephemeral: true})
      }

      await interaction.defer()

      let reason, reasonToProvide
      if (interaction.options.map(x => x.options)[0].map(x => x)[1]) {
        reason = interaction.options.map(x => x.options)[0].map(x => x.value)[1]
        reasonToProvide = 'Mod: ' + interaction.user.tag + '┇' + interaction.user.id + ';  Reason: ' + interaction.options.map(x => x.options)[0].map(x => x.value)[1]
      } 
      else {
        reason = 0
        reasonToProvide = 'Mod: ' + interaction.user.tag + '┇' + interaction.user.id + ';  Reason not provided' 
      }

      embed.setTitle(`${client.emotes.siren}  Czy na pewno chcesz odciszyć...`)
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
        .setCustomId('mute')

      const button2 = new MessageButton()
        .setLabel('NIE')
        .setStyle('SUCCESS')
        .setEmoji(client.emotes.rverify_ID)
        .setCustomId('cancel')

      const buttonRow = new MessageActionRow().addComponents([button, button2])

      const reply = await interaction.editReply({embeds: [embed], components: [buttonRow]})

      const collector = new InteractionCollector(client, {message: reply, time: 30000, dispose: true})
      collector.on('collect', async buttonClick => {
        if (buttonClick.customId === 'cancel') {
          collector.stop()

          embed.setTitle(`${client.emotes.rverify}  Anulowano odciszanie użytkownika...`)
            .setDescription(`**...[${mentioned.user.tag}](https://discord.com/users/${mentioned.id})**`)
            .setThumbnail(client.cmds.errorImgs[Math.floor(Math.random() * client.cmds.errorImgs.length)])
  
          return interaction.editReply({embeds: [embed], components: []})
        } 
        else if (buttonClick.customId === 'mute') {
          try {
            await mentioned.roles.remove(role, {reason: reasonToProvide})
          } 
          catch (err) {
            embed.setTitle(`${client.emotes.warn}  Nie mogę odciszyć użytkownika...`)
              .setDescription(`**...[${mentioned.user.tag}](https://discord.com/users/${mentioned.id}), rola wyciszenia jest wyższa od mojej, jeśli masz odpowiednie uprawnienia, przestaw w ustawieniach moją rolę ponad rolę wyciszenia**`)
              .setThumbnail(client.cmds.errorImgs[Math.floor(Math.random() * client.cmds.errorImgs.length)])
              .setColor('#FFC000')
            return interaction.editReply({embeds: [embed]})
          }

          embed.setTitle(`${client.emotes.staff}  Odciszono użytkownika...`)
            .setThumbnail(mentioned.user.displayAvatarURL())
            if (reason === 0) {
              embed.setDescription(`**...[${mentioned.user.tag}](https://discord.com/users/${mentioned.id}), nie podając powodu**`)
            }
            else {
              embed.setDescription(`**...[${mentioned.user.tag}](https://discord.com/users/${mentioned.id}), podając powód**\n\n\`${reason}\``)
            }

          return interaction.editReply({embeds: [embed]})
        }
      })
    } catch (err) {
      return client.base.get('cmd').error(client, interaction, err)
    }
  }
}
