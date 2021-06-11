const { MessageEmbed,MessageAttachment } = require("discord.js");

module.exports = {
  name: "test",
  aliases: ["oost", "oot", "selftest"],
  description: "Test bota",
  category: 'owner-only',
  utilisation: '{prefix}test',

  async execute(client, message, args, pf, cmd) {

    //Start;
    reactionEmbed = new MessageEmbed()
    .setTitle(`${client.emotes.winLoad}  Przygotowania do testu...`)
    .setDescription(`${client.emotes.google} Sprawdzanie permisji...`)
    .setThumbnail(`https://cdn.discordapp.com/attachments/850848194929492009/852901674997252106/1275442.png`)
    .setFooter(`💡 ${message.author.tag}\n🛠️ v${client.version} ┇ ⚡ RockyBot® 2021`, message.author.avatarURL({dynamic: true}))
    .setColor(`BLUE`)
    reaction = await message.lineReplyNoMention(reactionEmbed)
    errorEmbed = new MessageEmbed()
    .setTitle(`${client.emotes.warn}  Wystąpił problem z komendą \`${pf}${cmd}\``)
    .setThumbnail(`https://cdn.discordapp.com/attachments/852928154691567669/852928290045427733/753345.png`)
    .setColor('RED')
    .setFooter(`💡 ${message.author.tag}\n🛠️ v${client.version} ┇ ⚡ RockyBot® 2021`, message.author.avatarURL({dynamic: true}));

    //Check permissions
    try {
    if(client.ownerID.includes(message.author.id)) {
        x = 1
    } else {
        x = 0
    }
    } catch (error) {
        //Error in checking
        errorEmbed.setDescription(`${client.emotes.x} Sprawdzanie permisji`)
        reaction.edit(errorEmbed)
        return;
    }
    //NO PERMS
    try {
    if(x === 0) {
    reactionEmbed.setTitle(`${client.emotes.staff}  Komenda niedostępna`)
    .setThumbnail(`https://cdn.discordapp.com/attachments/852928154691567669/852976002178220052/891399.png`)
    .setDescription(`${client.emotes.rverify} Brakujące uprawnienia: \`WŁAŚCICIEL BOTA\``)
    reaction.edit(reactionEmbed)
    return;
    } } catch (error) {}
    
    reactionEmbed.setTitle(`${client.emotes.siren}  Przeprowadzanie self-testu...`)
    .setDescription(`**${client.emotes.winLoad} NIE pisz NIC na kanale przeprowadzania self-testu**`)
    .setThumbnail(`https://cdn.discordapp.com/attachments/850848194929492009/852994981027643442/993845.png`)
    await reaction.edit(reactionEmbed)

    //Test fetching
    try {
        await message.channel.send(`${client.emotes.warn} fetching messages test, do NOT delete`)
        await message.channel.messages.fetch({ limit: 1 }).then(msgs => msgs.forEach(msg => fetchingStatus = msg))
        fetching = 1
    } catch (error) {
      fetching = 0
      fetchingStatus = error
    }
    await reactionEmbed.addField(`${fetching ? client.emotes.grverify : client.emotes.warn}  messages.fetch()`, fetching ? `Brak problemów:\nID: \`${fetchingStatus.id}\`\nTreść: \`${fetchingStatus.content}\`` : `\`\`\`${fetchingStatus}\`\`\``)

    //Test deleting
    try {
        await message.channel.send(`${client.emotes.warn} autodelete test, do NOT delete`)
        await message.channel.messages.fetch({ limit: 2}).then(msgs => msgs.forEach(msg => {msg.delete()}))
        deleting = 1
    } catch (error) {
        deleting = 0
        deletingStatus = error
    }
    await reactionEmbed.addField(`${deleting ? client.emotes.grverify : client.emotes.warn}  messages.delete()`, deleting ? `Brak problemów: usunięto` : `\`\`\`${deletingStatus}\`\`\``)

    //Test finding guild
    try {
        findingGuildStatus = await client.guilds.cache.get(message.guild.id)
        findingGuild = 1
    } catch (error) {
        findingGuild = 0
        findingGuildStatus = error
    }
    await reactionEmbed.addField(`${findingGuild ? client.emotes.grverify : client.emotes.warn}  guilds.cache.get()`, findingGuild ? `Brak problemów:\nID: \`${findingGuildStatus.id}\`\nNazwa: \`${findingGuildStatus.name}\`` : `\`\`\`${findingGuildStatus}\`\`\``)

    //Test finding channel
    try {
        findingChannelStatus = await client.channels.cache.get(message.channel.id)
        findingChannel = 1
    } catch (error) {
        findingChannel = 0
        findingChannelStatus = error
    }
    await reactionEmbed.addField(`${findingChannel ? client.emotes.grverify : client.emotes.warn}  channels.cache.get()`, findingChannel ? `Brak problemów:\nID: \`${findingChannelStatus.id}\`\nNazwa: \`${findingChannelStatus.name}\`` : `\`\`\`${findingChannelStatus}\`\`\``)
    
    //Test finding user
    try {
    findingUserStatus = await client.users.cache.get(message.author.id)
    findingUser = 1
    } catch (error) {
    findingUser = 0
    findingUserStatus = error
    }
    await reactionEmbed.addField(`${findingUser ? client.emotes.grverify : client.emotes.warn}  users.cache.get()`, findingUser ? `Brak problemów:\nID: \`${findingUserStatus.id}\`\nTag: \`${findingUserStatus.tag}\`` : `\`\`\`${findingUserStatus}\`\`\``)

    //Ready
    await reactionEmbed.setTitle(`${client.emotes.siri}  Self-test: ukończono`)
    await reactionEmbed.setDescription(``)
    await reactionEmbed.setThumbnail(`https://cdn.discordapp.com/attachments/850848194929492009/853002523400208394/1689039.png`)
    await reaction.edit(reactionEmbed)
  } 
}