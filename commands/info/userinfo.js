const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "userinfo",
  aliases: ['iui', 'iu', 'ia', 'iai', 'accountinfo'],
  description: "Info o użytkowniku",
  category: 'info',
  utilisation: '{prefix}iui <wzmianka>',

  async execute(client, message, args, pf, cmd) {
    
    //Start; 1/5
    const reactionEmbed = new MessageEmbed()
    .setTitle(`${client.emotes.winLoad} Praca w toku... 1/2`)
    .setDescription(`${client.emotes.arrr} Sprawdzanie wzmianek...`)
    .setThumbnail(`https://cdn.discordapp.com/attachments/850848194929492009/852901674997252106/1275442.png`)
    .setFooter(`💡 ${message.author.tag}\n🛠️ v${client.version} ┇ ⚡ RockyBot® 2021`, message.author.avatarURL({dynamic: true}))
    .setColor(`BLUE`)
    
    const reaction = await message.lineReplyNoMention(reactionEmbed)

    try {
      const errEmbed = new MessageEmbed()
      .setTitle(`${client.emotes.warn}  Wystąpił problem z komendą \`${pf}${cmd}\``)
      .setThumbnail(`https://cdn.discordapp.com/attachments/852928154691567669/852928290045427733/753345.png`)
      .setColor('RED')
      .setFooter(`💡 ${message.author.tag}\n🛠️ v${client.version} ┇ ⚡ RockyBot® 2021`, message.author.avatarURL({dynamic: true}));    

      let ifMention = false
      let mention, mentionMember
      try {
        if (!message.mentions.members.size) {
          mention = message.author
          mentionMember = message.member
        } else {
          mention = message.mentions.users.first()
          mentionMember = message.mentions.members.first()
          ifMention = true
        }
      } catch (err) {
        errEmbed.setDescription(`${client.emotes.x} Sprawdzanie wzmianek`)
        await reaction.edit(errEmbed)
        return;
      }

      reactionEmbed.setTitle(`${client.emotes.winLoad} Praca w toku... 2/2`)
      .setDescription(`${client.emotes.grverify} ${ifMention ?  `Wzmianka: ${mention}` : `Nie znaleziono wzmianek: wybieranie ${message.author}`}\n${client.emotes.arrr} Sprawdzanie informacji o użytkowniku...`)
      await reaction.edit(reactionEmbed)

      try {
        const embed = new MessageEmbed()
        .setFooter(`💡 ${message.author.tag}\n🛠️ v${client.version} ┇ ⚡ RockyBot® 2021`, message.author.avatarURL({dynamic: true}))
        .setThumbnail(mention.avatarURL({ dynamic: true }))
        .setTitle(`${client.emotes.siri} Użytkownik \`${mention.tag}\``)
        .setColor('RANDOM')
        .addField(`🔆 Ogólne`, [
          `📎 ID: \`${mention.id}\``,
          `🛡️ ${mention}`,
          `⏲️ Konto założone (UTC): \`${mention.createdAt.getUTCHours()}:${mention.createdAt.getUTCMinutes()} ┇ ${mention.createdAt.getUTCDate()}.${mention.createdAt.getUTCMonth()+1}.${mention.createdAt.getUTCFullYear()}\``,
          '\u200b',
          ])
        .addField(`📡 Uprawnienia na tym kanale:`, [
          mentionMember.permissions.has('ADMINISTRATOR') ? `${client.emotes.grverify} \`Administrator\`` : (mentionMember.permissionsIn(message.channel).has('VIEW_CHANNEL') ? client.emotes.grverify : client.emotes.rverify) +  ' \`Wyświetlanie kanału\`',
          mentionMember.permissions.has('ADMINISTRATOR') ? '' : (mentionMember.permissionsIn(message.channel).has('CREATE_INSTANT_INVITE') ? client.emotes.grverify : client.emotes.rverify) +  ' \`Tworzenie zaproszeń\`' ,
          mentionMember.permissions.has('ADMINISTRATOR') ? '' : (mentionMember.permissionsIn(message.channel).has('SEND_MESSAGES') ? client.emotes.grverify : client.emotes.rverify) +  ' \`Wysyłanie wiadomości\`',
          mentionMember.permissions.has('ADMINISTRATOR') ? '' : (mentionMember.permissionsIn(message.channel).has('ADD_REACTIONS') ? client.emotes.grverify : client.emotes.rverify) +  ' \`Dodawanie reakcji\`',
          mentionMember.permissions.has('ADMINISTRATOR') ? '' : (mentionMember.permissionsIn(message.channel).has('SEND_TTS_MESSAGES') ? client.emotes.grverify : client.emotes.rverify) +  ' \`Wysyłanie wiadomości TTS\`',
          mentionMember.permissions.has('ADMINISTRATOR') ? '' : (mentionMember.permissionsIn(message.channel).has('MANAGE_MESSAGES') ? client.emotes.grverify : client.emotes.rverify) +  ' \`Zarządzanie wiadomościami\`',
          mentionMember.permissions.has('ADMINISTRATOR') ? '' : (mentionMember.permissionsIn(message.channel).has('ATTACH_FILES') ? client.emotes.grverify : client.emotes.rverify) +  ' \`Załączanie plików\`',
          mentionMember.permissions.has('ADMINISTRATOR') ? '' : (mentionMember.permissionsIn(message.channel).has('READ_MESSAGE_HISTORY') ? client.emotes.grverify : client.emotes.rverify) +  ' \`Wyświetlanie historii czatu\`',
          mentionMember.permissions.has('ADMINISTRATOR') ? '' : (mentionMember.permissionsIn(message.channel).has('USE_EXTERNAL_EMOJIS') ? client.emotes.grverify : client.emotes.rverify) +  ' \`Używanie zewnętrznych emoji\`',
          mentionMember.permissions.has('ADMINISTRATOR') ? '' : (mentionMember.permissionsIn(message.channel).has('MENTION_EVERYONE') ? client.emotes.grverify : client.emotes.rverify) +  ' \`Używanie wzmianki \"everyone\"\`',
        ])
        .addField(`${client.emotes.staff} Uprawnienia globalne:`, [
          mentionMember.permissions.has('ADMINISTRATOR') ? `${client.emotes.grverify} \`Administrator\`` : (mentionMember.permissions.has('KICK_MEMBERS') ? client.emotes.grverify : client.emotes.rverify) +  ' \`Wyrzucanie członków\`',
          mentionMember.permissions.has('ADMINISTRATOR') ? `` : (mentionMember.permissions.has('BAN_MEMBERS') ? client.emotes.grverify : client.emotes.rverify) +  ' \`Banowanie członków\`',
          mentionMember.permissions.has('ADMINISTRATOR') ? `` : (mentionMember.permissions.has('MANAGE_GUILD') ? client.emotes.grverify : client.emotes.rverify) +  ' \`Zarządzanie serwerem\`',
          mentionMember.permissions.has('ADMINISTRATOR') ? `` : (mentionMember.permissions.has('MANAGE_NICKNAMES') ? client.emotes.grverify : client.emotes.rverify) +  ' \`Zarządzanie pseudonimami\`',
          mentionMember.permissions.has('ADMINISTRATOR') ? `` : (mentionMember.permissions.has('MANAGE_ROLES') ? client.emotes.grverify : client.emotes.rverify) +  ' \`Zarządzanie rolami i permisjami\`',
          mentionMember.permissions.has('ADMINISTRATOR') ? `` : (mentionMember.permissions.has('MANAGE_EMOJIS') ? client.emotes.grverify : client.emotes.rverify) +  ' \`Zarządzanie emoji\`',
        ])

        await reaction.edit(embed)
      } catch (err) {
        errEmbed.setDescription(`${client.emotes.grverify} ${ifMention ?  `Wzmianka: ${mention}` : `Nie znaleziono wzmianek: wybieranie ${message.author}`}\n${client.emotes.x} Sprawdzanie informacji o użytkowniku`)
        await reaction.edit(errEmbed)
        console.log(err)
        return;
      }
      
    } catch (err) {
      const embed = new MessageEmbed()
      .setTitle(`${client.emotes.warn}  Zatrzymano komendę \`${cmd}\` z powodu wycieku błędu`)
      .setThumbnail(`https://cdn.discordapp.com/attachments/850848194929492009/854001906962530334/1810746.png`)
      .setFooter(`💡 ${message.author.tag}\n🛠️ v${client.version} ┇ ⚡ RockyBot® 2021`, message.author.avatarURL({dynamic: true}))
      .setColor('RED')
      try {await reaction.delete()} catch (err) {}
      await message.channel.send(embed)
      return;
    }
  }
}