const { MessageActionRow, MessageButton } = require('discord-buttons')
const { MessageEmbed } = require('discord.js')

module.exports = {
  name: 'userinfo',
  aliases: ['iui', 'iu', 'ia', 'iai', 'accountinfo'],
  description: 'Info o użytkowniku',
  category: 'info',
  utilisation: '{prefix}iui <wzmianka/id>',

  async execute(client, message, args, pf, cmd) {
    
    const reaction = await client.base.get('cmd').start(client, message, cmd)

    try {
      
      const mention = await client.base.get('check').user(client, message, args)
      const mentionMember = await client.base.get('check').member(client, message, args)

      client.commands.get('userinfo').main(client, message, mention, reaction, mentionMember, pf, cmd)
      return
    } catch (err) {
      await client.base.get('cmd').error(client, message, pf, cmd, reaction, err)
    }
  },

  async main(client, message, mention, reaction, mentionMember, pf, cmd, bt, color) {
    try {
      const embed = new MessageEmbed()
      .setFooter(`💡 ${message.author.tag}\n🛠️ v${client.version} ┇ ⚡ RockyBot® 2021`, message.author.avatarURL({dynamic: true}))
      .setThumbnail(mention.avatarURL({ dynamic: true }))
      .setTitle(`${client.emotes.siri} Użytkownik \`${mention.tag}\``)
      if (!color) {embed.setColor('RANDOM')} else {embed.setColor(color)}
      const embedColor = embed.color
      embed.setDescription([
        `🛡️ **${mention}**`,
        `📎 **ID**: \`${mention.id}\``,
        mentionMember.nickname ? `${client.emotes.arrr} **Nick**: ${mentionMember.nickname}\n` : '',
        `⏲️ **Konto założone** (UTC): \`${mention.createdAt.getUTCHours()}:${(mention.createdAt.getUTCMinutes()<10?'0':'')+parseInt(mention.createdAt.getUTCMinutes())} ┇ ${(mention.createdAt.getUTCDate()<10?'0':'')+parseInt(mention.createdAt.getUTCDate())}.${((mention.createdAt.getUTCMonth()+1)<10?'0':'')+parseInt(mention.createdAt.getUTCMonth()+1)}.${mention.createdAt.getUTCFullYear()}\``,
        `${client.emotes.grverify} **Dołączono do serwera** (UTC): \`${mentionMember.joinedAt.getUTCHours()}:${(mentionMember.joinedAt.getUTCMinutes()<10?'0':'')+parseInt(mentionMember.joinedAt.getUTCMinutes())} ┇ ${(mentionMember.joinedAt.getUTCDate()<10?'0':'')+parseInt(mentionMember.joinedAt.getUTCDate())}.${((mentionMember.joinedAt.getUTCMonth()+1)<10?'0':'')+parseInt(mentionMember.joinedAt.getUTCMonth()+1)}.${mentionMember.joinedAt.getUTCFullYear()}\` `
      ])

      const button = new MessageButton()
      if (mentionMember.permissions.has('ADMINISTRATOR')) {
        button.setLabel('Administrator')
        .setStyle('red')
        .setEmoji(client.emotes.grverify_ID)
        .setID('ch_perms')
        .setDisabled()
        await reaction.edit({embed: embed, component: button})
        return
      } else {
        button.setLabel('Permisje kanału')
        .setStyle('blurple')
        .setEmoji('⚒️')
        .setID('ch_perms')
        const button2 = new MessageButton()
        .setLabel('Permisje globalne')
        .setStyle('green')
        .setEmoji('🛠️')
        .setID('glob_perms')
        const buttonRow = new MessageActionRow()
        .addComponent(button)
        .addComponent(button2)
        await reaction.edit({embed: embed, component: buttonRow})
      }
      try {await bt.defer()} catch (err) {}
      const filter = (button) => button.clicker.user.id === message.author.id && button.id === 'ch_perms'
      const filter2 = (button) => button.clicker.user.id === message.author.id && button.id === 'glob_perms'
      const filter3 = (button) => button.clicker.user.id !== message.author.id
      const collector = reaction.createButtonCollector(filter, { time: 30000, dispose: true })
      const collector2 = reaction.createButtonCollector(filter2, { time: 30000, dispose: true })
      const collector3 = reaction.createButtonCollector(filter3, { time: 30000, dispose: true })

      collector.on('collect', buttonClick => {
        collector.stop()
        collector2.stop()
        collector3.stop()
        client.commands.get('userinfo').chPerms(client, message, mention, reaction, mentionMember, pf, cmd, buttonClick, embedColor)
        return
      })

      collector2.on('collect', buttonClick => {
        collector.stop()
        collector2.stop()
        collector3.stop()
        client.commands.get('userinfo').globPerms(client, message, mention, reaction, mentionMember, pf, cmd, buttonClick, embedColor)
        return
      })

      collector3.on('collect', buttonClick => {
        const replyEmbed = new MessageEmbed().setColor('RED').setDescription(`**${client.emotes.grverify} Nie wywołałeś tej wiadomości**`).setFooter(`🛠️ v${client.version} ┇ ⚡ RockyBot® 2021 Reply Engine`, buttonClick.clicker.user.avatarURL({dynamic: true}))
        buttonClick.reply.send({ embed: replyEmbed, ephemeral: true })
      })
    } catch (err) {
      await client.base.get('cmd').error(client, message, pf, cmd, reaction, err)
    }

  }, 

  async chPerms(client, message, mention, reaction, mentionMember, pf, cmd, bt, color) {
    try {
      const embed = new MessageEmbed()
      .setFooter(`💡 ${message.author.tag}\n🛠️ v${client.version} ┇ ⚡ RockyBot® 2021`, message.author.avatarURL({dynamic: true}))
      .setThumbnail(mention.avatarURL({ dynamic: true }))
      .setTitle(`${client.emotes.warn} Uprawnienia na kanale \`${message.channel.name}\` dla \`${mention.tag}\``)
      .setColor(color)
      
      embed.addField('📡 Uprawnienia na kanale:', [
        (mentionMember.permissionsIn(message.channel).has('VIEW_CHANNEL') ? client.emotes.grverify : client.emotes.rverify) +  ' \`Wyświetlanie kanału\`',
        (mentionMember.permissionsIn(message.channel).has('SEND_MESSAGES') ? client.emotes.grverify : client.emotes.rverify) +  ' \`Wysyłanie wiadomości\`',
        (mentionMember.permissionsIn(message.channel).has('ADD_REACTIONS') ? client.emotes.grverify : client.emotes.rverify) +  ' \`Dodawanie reakcji\`',
        (mentionMember.permissionsIn(message.channel).has('SEND_TTS_MESSAGES') ? client.emotes.grverify : client.emotes.rverify) +  ' \`Wysyłanie wiadomości TTS\`',
        (mentionMember.permissionsIn(message.channel).has('ATTACH_FILES') ? client.emotes.grverify : client.emotes.rverify) +  ' \`Załączanie plików\`',
        (mentionMember.permissionsIn(message.channel).has('READ_MESSAGE_HISTORY') ? client.emotes.grverify : client.emotes.rverify) +  ' \`Wyświetlanie historii czatu\`',
        (mentionMember.permissionsIn(message.channel).has('USE_EXTERNAL_EMOJIS') ? client.emotes.grverify : client.emotes.rverify) +  ' \`Używanie zewnętrznych emoji\`',
        (mentionMember.permissionsIn(message.channel).has('MENTION_EVERYONE') ? client.emotes.grverify : client.emotes.rverify) +  ' \`Używanie wzmianki \"everyone\"\`',
        (mentionMember.permissionsIn(message.channel).has('MANAGE_MESSAGES') ? client.emotes.grverify : client.emotes.rverify) +  ' \`Zarządzanie wiadomościami\`',
      ])

      const button = new MessageButton()
      .setLabel('Wróć')
      .setStyle('grey')
      .setEmoji(client.emotes.arrl_ID)
      .setID('back')
      await reaction.edit({embed: embed, component: button})
      try {await bt.defer()} catch (err) {}
      const filter = (button) => button.clicker.user.id === message.author.id && button.id === 'back'
      const filter2 = (button) => button.clicker.user.id !== message.author.id
      const collector = reaction.createButtonCollector(filter, { time: 30000, dispose: true })
      const collector2 = reaction.createButtonCollector(filter2, { time: 30000, dispose: true })

      collector.on('collect', buttonClick => {
        collector.stop()
        collector2.stop()
        client.commands.get('userinfo').main(client, message, mention, reaction, mentionMember, pf, cmd, buttonClick, color)
        return
      })

      collector2.on('collect', buttonClick => {
        const replyEmbed = new MessageEmbed().setColor('RED').setDescription(`**${client.emotes.grverify} Nie wywołałeś tej wiadomości**`).setFooter(`🛠️ v${client.version} ┇ ⚡ RockyBot® Reply Engine 2021`, buttonClick.clicker.user.avatarURL({dynamic: true}))
        buttonClick.reply.send({ embed: replyEmbed, ephemeral: true })
      })

    } catch (err) {
      await client.base.get('cmd').error(client, message, pf, cmd, reaction, err)
    }
  },
  async globPerms(client, message, mention, reaction, mentionMember, pf, cmd, bt, color) {
    try {
      const embed = new MessageEmbed()
      .setFooter(`💡 ${message.author.tag}\n🛠️ v${client.version} ┇ ⚡ RockyBot® 2021`, message.author.avatarURL({dynamic: true}))
      .setThumbnail(mention.avatarURL({ dynamic: true }))
      .setTitle(`${client.emotes.world} Uprawnienia na serwerze dla \`${mention.tag}\``)
      .setColor(color)

      embed.addField(`${client.emotes.staff} Zarządzanie serwerem:`, [
        (mentionMember.permissions.has('BAN_MEMBERS') ? client.emotes.grverify : client.emotes.rverify) +  ' \`Banowanie członków\`',
        (mentionMember.permissions.has('KICK_MEMBERS') ? client.emotes.grverify : client.emotes.rverify) +  ' \`Wyrzucanie członków\`',
        (mentionMember.permissions.has('VIEW_AUDIT_LOG') ? client.emotes.grverify : client.emotes.rverify) +  ' \`Wyświetlanie dziennika zdarzeń\`',
        (mentionMember.permissions.has('MANAGE_GUILD') ? client.emotes.grverify : client.emotes.rverify) +  ' \`Zarządzanie serwerem\`',
        (mentionMember.permissions.has('MANAGE_CHANNELS') ? client.emotes.grverify : client.emotes.rverify) +  ' \`Zarządzanie kanałami\`',
        (mentionMember.permissions.has('MANAGE_ROLES') ? client.emotes.grverify : client.emotes.rverify) +  ' \`Zarządzanie rolami i permisjami\`',
        (mentionMember.permissions.has('MANAGE_EMOJIS') ? client.emotes.grverify : client.emotes.rverify) +  ' \`Zarządzanie emoji\`',
        (mentionMember.permissions.has('MANAGE_NICKNAMES') ? client.emotes.grverify : client.emotes.rverify) +  ' \`Zarządzanie pseudonimami\`',
        (mentionMember.permissions.has('VIEW_GUILD_INSIGHTS') ? client.emotes.grverify : client.emotes.rverify) +  ' \`Wyświetlanie informacji o serwerze\`',
        (mentionMember.permissions.has('CREATE_INSTANT_INVITE') ? client.emotes.grverify : client.emotes.rverify) +  ' \`Tworzenie szybkich zaproszeń\`',
      ])
      
      embed.addField('🗣️ Kanały głosowe', [
        (mentionMember.permissions.has('CONNECT') ? client.emotes.grverify : client.emotes.rverify) +  ' \`Łączenie\`',
        (mentionMember.permissions.has('SPEAK') ? client.emotes.grverify : client.emotes.rverify) +  ' \`Rozmowa\`',
        (mentionMember.permissions.has('STREAM') ? client.emotes.grverify : client.emotes.rverify) +  ' \`Wideo\`',
        (mentionMember.permissions.has('PRIORITY_SPEAKER') ? client.emotes.grverify : client.emotes.rverify) +  ' \`Priorytetowy rozmówca\`',
        (mentionMember.permissions.has('DEAFEN_MEMBERS') ? client.emotes.grverify : client.emotes.rverify) +  ' \`Wyciszanie innych użytkowników\`',
        (mentionMember.permissions.has('MOVE_MEMBERS') ? client.emotes.grverify : client.emotes.rverify) +  ' \`Przenoszenie innych użytkowników\`',
      ])
      

      const button = new MessageButton()
      .setLabel('Wróć')
      .setStyle('grey')
      .setEmoji(client.emotes.arrl_ID)
      .setID('back')
      await reaction.edit({embed: embed, component: button})
      try {await bt.defer()} catch (err) {}
      const filter = (button) => button.clicker.user.id === message.author.id && button.id === 'back'
      const filter2 = (button) => button.clicker.user.id !== message.author.id
      const collector = reaction.createButtonCollector(filter, { time: 30000, dispose: true })
      const collector2 = reaction.createButtonCollector(filter2, { time: 30000, dispose: true })

      collector.on('collect', buttonClick => {
        collector.stop()
        collector2.stop()
        client.commands.get('userinfo').main(client, message, mention, reaction, mentionMember, pf, cmd, buttonClick, color)
        return
      })

      collector2.on('collect', buttonClick => {
        const replyEmbed = new MessageEmbed().setColor('RED').setDescription(`**${client.emotes.grverify} Nie wywołałeś tej wiadomości**`).setFooter(`🛠️ v${client.version} ┇ ⚡ RockyBot® Reply Engine 2021`, buttonClick.clicker.user.avatarURL({dynamic: true}))
        buttonClick.reply.send({ embed: replyEmbed, ephemeral: true })
      })
    } catch (err) {
      await client.base.get('cmd').error(client, message, pf, cmd, reaction, err)
    }
  },
}