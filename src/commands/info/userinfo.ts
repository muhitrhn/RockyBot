import { MessageEmbed, MessageButton, MessageActionRow, InteractionCollector, CommandInteraction } from 'discord.js'
import { client, config } from "../.."

async function execute(interaction: CommandInteraction) {
  await interaction.defer()

  const mentioned = interaction.options.getMember('użytkownik') ? interaction.options.getMember('użytkownik') : interaction.member
  main(interaction, mentioned, null, null)
}

async function main(interaction: CommandInteraction, mentioned: any, bt: any, color: any) {
  const embed = new MessageEmbed()
    .setFooter(`💡 ${mentioned.user.tag}\n🛠️ v${config.version} ┇ ⚡ RockyBot® 2021`, mentioned.user.displayAvatarURL({dynamic: true}))
    .setThumbnail(mentioned.user.displayAvatarURL({ dynamic: true }))
    .setTitle(`💻  Użytkownik ${mentioned.user.tag}`)
    .setDescription(
      `🛡️ **${mentioned}**` + '\n' +
      `📎 ID: **${mentioned.user.id}**` + '\n' + 
      `${mentioned.nickname ? `${config.emotes.grverify} Nick: **${mentioned.nickname}**\n` : ''}` + '\n' +
      `⏲️ Konto założone (UTC): **${mentioned.user.createdAt.getUTCHours()}:${(mentioned.user.createdAt.getUTCMinutes()<10?'0':'')+parseInt(mentioned.user.createdAt.getUTCMinutes())}┇${(mentioned.user.createdAt.getUTCDate()<10?'0':'')+parseInt(mentioned.user.createdAt.getUTCDate())}.${((mentioned.user.createdAt.getUTCMonth()+1)<10?'0':'')+parseInt(mentioned.user.createdAt.getUTCMonth()+1)}.${mentioned.user.createdAt.getUTCFullYear()}**` + '\n' +
      `${config.emotes.world} Dołączono do serwera (UTC): **${mentioned.joinedAt.getUTCHours()}:${(mentioned.joinedAt.getUTCMinutes()<10?'0':'')+parseInt(mentioned.joinedAt.getUTCMinutes())}┇${(mentioned.joinedAt.getUTCDate()<10?'0':'')+parseInt(mentioned.joinedAt.getUTCDate())}.${((mentioned.joinedAt.getUTCMonth()+1)<10?'0':'')+parseInt(mentioned.joinedAt.getUTCMonth()+1)}.${mentioned.joinedAt.getUTCFullYear()}**`
    )
    color ? embed.setColor(color) : embed.setColor('RANDOM'); const embedColor = embed.color

  if (mentioned.permissions.has('ADMINISTRATOR')) {
    const button = new MessageButton()
      .setLabel('Administrator')
      .setStyle('DANGER')
      .setEmoji(config.emotes.grverify_ID)
      .setCustomId('ch_perms')
      .setDisabled(true)

    const messageRow = new MessageActionRow().addComponents([button])

    await interaction.editReply({embeds: [embed], components: [messageRow]})
    return
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

  // @ts-ignore  
  // eslint-disable-next-line no-empty
  try {await bt.deferUpdate()} catch (err) {} 

  const reply = await interaction.editReply({embeds: [embed], components: [messageRow]})

  //@ts-ignore
  const collector = new InteractionCollector(client, {message: reply, time: 30000, dispose: true})
  collector.on('collect', async buttonClick => {
    if (buttonClick.user.id !== interaction.user.id) {
      const replyEmbed = new MessageEmbed().setColor('RED').setDescription(`**${config.emotes.grverify} Nie wywołałeś tej wiadomości**`).setFooter(`🛠️ v${config.version} ┇ ⚡ RockyBot® 2021 Reply Engine`, // @ts-ignore  
        buttonClick.clicker.user.displayAvatarURL({dynamic: true}))
          
      // @ts-ignore  
      await buttonClick.reply.send({ embeds: [replyEmbed], ephemeral: true })
    } 
    // @ts-ignore  
    else if (buttonClick.customId === 'ch_perms') {
      collector.stop()

      chPerms(interaction, mentioned, buttonClick, embedColor)
      return
    } 
    // @ts-ignore  
    else if (buttonClick.customId === 'glob_perms') {
      collector.stop()

      globPerms(interaction, mentioned, buttonClick, embedColor)
      return
    }
  })
}

async function chPerms(interaction: CommandInteraction, mentioned: any, bt: any, color: any)  {
  const perms = [
    (mentioned.permissionsIn(interaction.channel).has('VIEW_CHANNEL') ? config.emotes.grverify : config.emotes.rverify) +  ' Wyświetlanie kanału',
    (mentioned.permissionsIn(interaction.channel).has('SEND_MESSAGES') ? config.emotes.grverify : config.emotes.rverify) +  ' Wysyłanie wiadomości',
    (mentioned.permissionsIn(interaction.channel).has('ADD_REACTIONS') ? config.emotes.grverify : config.emotes.rverify) +  ' Dodawanie reakcji',
    (mentioned.permissionsIn(interaction.channel).has('SEND_TTS_MESSAGES') ? config.emotes.grverify : config.emotes.rverify) +  ' Wysyłanie wiadomości TTS',
    (mentioned.permissionsIn(interaction.channel).has('ATTACH_FILES') ? config.emotes.grverify : config.emotes.rverify) +  ' Załączanie plików',
    (mentioned.permissionsIn(interaction.channel).has('READ_MESSAGE_HISTORY') ? config.emotes.grverify : config.emotes.rverify) +  ' Wyświetlanie historii czatu',
    (mentioned.permissionsIn(interaction.channel).has('USE_EXTERNAL_EMOJIS') ? config.emotes.grverify : config.emotes.rverify) +  ' Używanie zewnętrznych emoji',
    (mentioned.permissionsIn(interaction.channel).has('MENTION_EVERYONE') ? config.emotes.grverify : config.emotes.rverify) +  ' Używanie wzmianki "everyone"',
    (mentioned.permissionsIn(interaction.channel).has('MANAGE_MESSAGES') ? config.emotes.grverify : config.emotes.rverify) +  ' Zarządzanie wiadomościami'
  ]
  
  const embed = new MessageEmbed()
    .setFooter(`💡 ${mentioned.user.tag}\n🛠️ v${config.version} ┇ ⚡ RockyBot® 2021`, mentioned.user.displayAvatarURL({dynamic: true}))
    .setThumbnail(mentioned.user.displayAvatarURL({ dynamic: true }))
    //@ts-ignore
    .setTitle(`${config.emotes.warn} Uprawnienia na kanale ${interaction.channel.name} dla ${mentioned.user.tag}`)
    .setColor(color)
    .addField('📡 Uprawnienia na kanale:', perms.join('\n'))

  const button = new MessageButton()
    .setLabel('Wróć')
    .setStyle('SECONDARY')
    .setEmoji(config.emotes.arrl_ID)
    .setCustomId('back')

  const messageRow = new MessageActionRow().addComponents([button])

  // @ts-ignore  
  await bt.deferUpdate()

  const reply = await interaction.editReply({embeds: [embed], components: [messageRow]})
      
  //@ts-ignore
  const collector = new InteractionCollector(client, {message: reply, time: 30000, dispose: true})
  collector.on('collect', async buttonClick => {
    if (buttonClick.user.id !== interaction.user.id) {
      const replyEmbed = new MessageEmbed().setColor('RED').setDescription(`**${config.emotes.grverify} Nie wywołałeś tej wiadomości**`).setFooter(`🛠️ v${config.version} ┇ ⚡ RockyBot® 2021 Reply Engine`, // @ts-ignore  
        buttonClick.clicker.user.displayAvatarURL({dynamic: true}))
          
       // @ts-ignore  
      await buttonClick.reply.send({ embeds: [replyEmbed], ephemeral: true })
    } 
    // @ts-ignore  
    else if (buttonClick.customId === 'back'){
      collector.stop()
          
      main(interaction, mentioned, buttonClick, color)
      return
    }
  })
}

async function globPerms(interaction: CommandInteraction, mentioned: any, bt: any, color: any)  {
  const serverperms = [
    (mentioned.permissions.has('BAN_MEMBERS') ? config.emotes.grverify : config.emotes.rverify) +  ' Banowanie członków',
    (mentioned.permissions.has('KICK_MEMBERS') ? config.emotes.grverify : config.emotes.rverify) +  ' Wyrzucanie członków',
    (mentioned.permissions.has('VIEW_AUDIT_LOG') ? config.emotes.grverify : config.emotes.rverify) +  ' Wyświetlanie dziennika zdarzeń',
    (mentioned.permissions.has('MANAGE_GUILD') ? config.emotes.grverify : config.emotes.rverify) +  ' Zarządzanie serwerem',
    (mentioned.permissions.has('MANAGE_CHANNELS') ? config.emotes.grverify : config.emotes.rverify) +  ' Zarządzanie kanałami',
    (mentioned.permissions.has('MANAGE_ROLES') ? config.emotes.grverify : config.emotes.rverify) +  ' Zarządzanie rolami i permisjami',
    (mentioned.permissions.has('MANAGE_EMOJIS') ? config.emotes.grverify : config.emotes.rverify) +  ' Zarządzanie emoji',
    (mentioned.permissions.has('MANAGE_NICKNAMES') ? config.emotes.grverify : config.emotes.rverify) +  ' Zarządzanie pseudonimami',
    (mentioned.permissions.has('VIEW_GUILD_INSIGHTS') ? config.emotes.grverify : config.emotes.rverify) +  ' Wyświetlanie informacji o serwerze',
    (mentioned.permissions.has('CREATE_INSTANT_INVITE') ? config.emotes.grverify : config.emotes.rverify) +  ' Tworzenie szybkich zaproszeń'
  ]
  
  const voiceperms = [
    (mentioned.permissions.has('CONNECT') ? config.emotes.grverify : config.emotes.rverify) +  ' Łączenie',
    (mentioned.permissions.has('SPEAK') ? config.emotes.grverify : config.emotes.rverify) +  ' Rozmowa',
    (mentioned.permissions.has('STREAM') ? config.emotes.grverify : config.emotes.rverify) +  ' Wideo',
    (mentioned.permissions.has('PRIORITY_SPEAKER') ? config.emotes.grverify : config.emotes.rverify) +  ' Priorytetowy rozmówca',
    (mentioned.permissions.has('DEAFEN_MEMBERS') ? config.emotes.grverify : config.emotes.rverify) +  ' Wyciszanie innych użytkowników',
    (mentioned.permissions.has('MOVE_MEMBERS') ? config.emotes.grverify : config.emotes.rverify) +  ' Przenoszenie innych użytkowników'
  ]
      
  const embed = new MessageEmbed()
    .setFooter(`💡 ${mentioned.user.tag}\n🛠️ v${config.version} ┇ ⚡ RockyBot® 2021`, mentioned.user.displayAvatarURL({dynamic: true}))
    .setThumbnail(mentioned.user.displayAvatarURL({ dynamic: true }))
    .setTitle(`${config.emotes.world} Uprawnienia na serwerze dla ${mentioned.user.tag}`)
    .setColor(color)
    .addField(`${config.emotes.staff} Zarządzanie serwerem:`, serverperms.join('\n'))
    .addField('🗣️ Kanały głosowe', voiceperms.join('\n'))

  const button = new MessageButton()
    .setLabel('Wróć')
    .setStyle('SECONDARY')
    .setEmoji(config.emotes.arrl_ID)
    .setCustomId('back')

  const messageRow = new MessageActionRow().addComponents([button])
      
  // @ts-ignore  
  await bt.deferUpdate()

  const reply = await interaction.editReply({embeds: [embed], components: [messageRow]})

  //@ts-ignore
  const collector = new InteractionCollector(client, {message: reply, time: 30000, dispose: true})
  collector.on('collect', async buttonClick => {
    if (buttonClick.user.id !== interaction.user.id) {
      const replyEmbed = new MessageEmbed().setColor('RED').setDescription(`**${config.emotes.grverify} Nie wywołałeś tej wiadomości**`).setFooter(`🛠️ v${config.version} ┇ ⚡ RockyBot® 2021 Reply Engine`, // @ts-ignore  
        buttonClick.clicker.user.displayAvatarURL({dynamic: true}))
          
      // @ts-ignore  
      await buttonClick.reply.send({ embeds: [replyEmbed], ephemeral: true })
    } 
    // @ts-ignore  
    else if (buttonClick.customId === 'back'){
      collector.stop()
          
      main(interaction, mentioned, buttonClick, color)
      return
    }
  }) 
}

const options = {
  name: 'userinfo',
  description: '👤 Info o użytkowniku',
  type: 1,
  options: [
    {
      type: 'USER',
      name: 'użytkownik',
      description: '👥 Użytkownik, o którym wyświetlą się informacje',
      required: false
    }
  ]
}

export { execute, options }