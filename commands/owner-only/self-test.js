const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "test",
  aliases: ["oost", "oot", "selftest"],
  description: "Test bota",
  category: 'owner-only',
  utilisation: '{prefix}oot',

  async execute(client, message, args, pf, cmd) {
    
    //Start;
    const reactionEmbed = new MessageEmbed()
    .setTitle(`${client.emotes.winLoad}  Przygotowania do testu...`)
    .setDescription(`${client.emotes.arrr} Sprawdzanie permisji...`)
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

      //Check permissions
      let permsCheck = 0
      try {
      if(client.ownerID.includes(message.author.id)) {
        permsCheck = 1
      }
      } catch (err) {
        //Error in checking
        errEmbed.setDescription(`${client.emotes.x} Sprawdzanie permisji`)
        reaction.edit(errEmbed)
        return;
      }
      //NO PERMS
      try {
        if(permsCheck === 0) {
          errEmbed.setThumbnail(`https://cdn.discordapp.com/attachments/852928154691567669/852976002178220052/891399.png`)
          .setDescription(`${client.emotes.rverify} Sprawdzanie permisji: **Brakujące uprawnienia: \`WŁAŚCICIEL BOTA\`**`)
          .setTitle(`${client.emotes.warn}  Znaleziono problemy z permisjami`)
          .setColor('#FFC000')
          reaction.edit(errEmbed)
          return;
        } 
      } catch (err) {}
      
      reactionEmbed.setTitle(`${client.emotes.siren}  Przeprowadzanie self-testu...`)
      .setDescription(`**${client.emotes.winLoad} NIE pisz NIC na kanale przeprowadzania self-testu**`)
      .setThumbnail(`https://cdn.discordapp.com/attachments/850848194929492009/852994981027643442/993845.png`)
      await reaction.edit(reactionEmbed)

      //Test fetching
      let fetching, fetchingStatus
      try {
        await message.channel.send(`${client.emotes.warn} fetching messages test, do NOT delete`)
        await message.channel.messages.fetch({ limit: 1 }).then(msgs => msgs.forEach(msg => fetchingStatus = msg))
        fetching = 1
      } catch (err) {
        fetching = 0
        fetchingStatus = err
      }
      await reactionEmbed.addField(`${fetching ? client.emotes.grverify : client.emotes.warn}  messages.fetch()`, fetching ? `Brak problemów:\nID: \`${fetchingStatus.id}\`\nTreść: \`${fetchingStatus.content}\`` : `\`\`\`${fetchingStatus}\`\`\``)

      //Test deleting
      let deleting, deletingStatus
      try {
        await message.channel.send(`${client.emotes.warn} autodelete test, do NOT delete`)
        await message.channel.messages.fetch({ limit: 2}).then(msgs => msgs.forEach(msg => {msg.delete()}))
        deleting = 1
      } catch (err) {
        deleting = 0
        deletingStatus = err
      }
      await reactionEmbed.addField(`${deleting ? client.emotes.grverify : client.emotes.warn}  messages.delete()`, deleting ? `Brak problemów: usunięto` : `\`\`\`${deletingStatus}\`\`\``)

      //Test finding guild
      let findingGuild, findingGuildStatus
      try {
        findingGuildStatus = await client.guilds.cache.get(message.guild.id)
        findingGuild = 1
      } catch (err) {
          findingGuild = 0
          findingGuildStatus = err
      }
      await reactionEmbed.addField(`${findingGuild ? client.emotes.grverify : client.emotes.warn}  guilds.cache.get()`, findingGuild ? `Brak problemów:\nID: \`${findingGuildStatus.id}\`\nNazwa: \`${findingGuildStatus.name}\`` : `\`\`\`${findingGuildStatus}\`\`\``)

      //Test finding channel
      let findingChannel, findingChannelStatus
      try {
        findingChannelStatus = await client.channels.cache.get(message.channel.id)
        findingChannel = 1
      } catch (err) {
        findingChannel = 0
        findingChannelStatus = err
      }
      await reactionEmbed.addField(`${findingChannel ? client.emotes.grverify : client.emotes.warn}  channels.cache.get()`, findingChannel ? `Brak problemów:\nID: \`${findingChannelStatus.id}\`\nNazwa: \`${findingChannelStatus.name}\`` : `\`\`\`${findingChannelStatus}\`\`\``)
      
      //Test finding user
      let findingUser, findingUserStatus
      try {
        findingUserStatus = await client.users.cache.get(message.author.id)
        findingUser = 1
      } catch (err) {
        findingUser = 0
        findingUserStatus = err
      }
      await reactionEmbed.addField(`${findingUser ? client.emotes.grverify : client.emotes.warn}  users.cache.get()`, findingUser ? `Brak problemów:\nID: \`${findingUserStatus.id}\`\nTag: \`${findingUserStatus.tag}\`` : `\`\`\`${findingUserStatus}\`\`\``)

      //Ready
      reactionEmbed.setTitle(`${client.emotes.siri}  Self-test: ukończono`)
      .setDescription(``)
      .setThumbnail(`https://cdn.discordapp.com/attachments/850848194929492009/852278226364792893/190411.png`)
      await reaction.edit(reactionEmbed)
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
