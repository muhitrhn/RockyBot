const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "test",
  aliases: ["oost", "oot", "selftest"],
  description: "Test bota",
  category: 'owner-only',
  utilisation: '{prefix}oot',
  async execute(client, message, args, pf, cmd) {
    
    const reaction = await client.base.get(`cmd`).start(client, message, cmd)
    
    try {
      const embed = new MessageEmbed()
      .setColor('RANDOM')
      .setFooter(`💡 ${message.author.tag}\n🛠️ v${client.version} ┇ ⚡ RockyBot® 2021`, message.author.avatarURL({dynamic: true}))

      if(!client.ownerID.includes(message.author.id)) {
        embed.setTitle(`🔒  Nie masz wymaganych uprawnień...`)
        .setDescription(`**...\`WŁAŚCICIEL BOTA\`**`)
        .setThumbnail(client.cmds.lockedImgs[Math.floor(Math.random() * client.cmds.lockedImgs.length)])
        .setColor('#FFC000')
        await reaction.edit({embed: embed})
        return;
      } 
      
      embed.setTitle(`${client.emotes.winLoad}  Przeprowadzanie self-testu...`)
      .setDescription(`**${client.emotes.siren} NIE pisz NIC na kanale przeprowadzania self-testu**`)
      .setThumbnail(client.cmds.loadingImgs[Math.floor(Math.random() * client.cmds.loadingImgs.length)])
      await reaction.edit({embed: embed})

      //Test fetching
      let fetching, fetchingStatus
      try {
        await message.channel.send(`Fetching messages test, do NOT delete`)
        await message.channel.messages.fetch({ limit: 1 }).then(msgs => msgs.forEach(msg => fetchingStatus = msg))
        fetching = 1
      } catch (err) {
        fetching = 0
        fetchingStatus = err
      }

      embed.addField(`${fetching ? client.emotes.grverify : client.emotes.warn}  messages.fetch()`, fetching ? `Brak problemów:\nID: \`${fetchingStatus.id}\`\nTreść: \`${fetchingStatus.content}\`` : `\`\`\`${fetchingStatus}\`\`\``)

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
     
      embed.addField(`${deleting ? client.emotes.grverify : client.emotes.warn}  messages.delete()`, deleting ? `Brak problemów: usunięto` : `\`\`\`${deletingStatus}\`\`\``)

      //Test finding guild
      let findingGuild, findingGuildStatus
      try {
        findingGuildStatus = await client.guilds.cache.get(message.guild.id)
        findingGuild = 1
      } catch (err) {
          findingGuild = 0
          findingGuildStatus = err
      }
     
      embed.addField(`${findingGuild ? client.emotes.grverify : client.emotes.warn}  guilds.cache.get()`, findingGuild ? `Brak problemów:\nID: \`${findingGuildStatus.id}\`\nNazwa: \`${findingGuildStatus.name}\`` : `\`\`\`${findingGuildStatus}\`\`\``)

      //Test finding channel
      let findingChannel, findingChannelStatus
      try {
        findingChannelStatus = await client.channels.cache.get(message.channel.id)
        findingChannel = 1
      } catch (err) {
        findingChannel = 0
        findingChannelStatus = err
      }
      
      embed.addField(`${findingChannel ? client.emotes.grverify : client.emotes.warn}  channels.cache.get()`, findingChannel ? `Brak problemów:\nID: \`${findingChannelStatus.id}\`\nNazwa: \`${findingChannelStatus.name}\`` : `\`\`\`${findingChannelStatus}\`\`\``)
      
      //Test finding user
      let findingUser, findingUserStatus
      try {
        findingUserStatus = await client.users.cache.get(message.author.id)
        findingUser = 1
      } catch (err) {
        findingUser = 0
        findingUserStatus = err
      }
      embed.addField(`${findingUser ? client.emotes.grverify : client.emotes.warn}  users.cache.get()`, findingUser ? `Brak problemów:\nID: \`${findingUserStatus.id}\`\nTag: \`${findingUserStatus.tag}\`` : `\`\`\`${findingUserStatus}\`\`\``)

      //Ready
      embed.setTitle(`${client.emotes.siri}  Self-test: ukończono`)
      .setDescription(``)
      .setThumbnail(client.cmds.doneImgs[Math.floor(Math.random() * client.cmds.doneImgs.length)])
      try {await reaction.edit({ embed: embed })} catch (err) {await message.channel.send({embed: embed})}
    } catch (err) {
      await client.base.get(`cmd`).error(client, message, pf, cmd, reaction, err)
    }
  } 
}
