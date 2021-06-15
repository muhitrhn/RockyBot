const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "guildinfo",
  aliases: ['igi', 'ig', 'isi', 'is', 'serverinfo', 'serwerinfo'],
  description: "Info o serwerze",
  category: 'info',
  utilisation: '{prefix}igi',

  async execute(client, message, args, pf, cmd) {
    
    //Start; 1/5
    const reactionEmbed = new MessageEmbed()
    .setTitle(`${client.emotes.winLoad} Praca w toku... 1/1`)
    .setDescription(`${client.emotes.arrr} Sprawdzanie informacji o serwerze...`)
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

      try {
        const embed = new MessageEmbed()
        .setFooter(`💡 ${message.author.tag}\n🛠️ v${client.version} ┇ ⚡ RockyBot® 2021`, message.author.avatarURL({dynamic: true}))
        .setThumbnail(message.guild.iconURL({ dynamic: true }))
        .setTitle(`${client.emotes.siri} Serwer \`${message.guild.name}\``)
        .setColor('RANDOM')
        .addField(`🔆 Ogólne`, [
          `📎 ID: \`${message.guild.id}\``,
          `⛳ Właściciel: ${message.guild.owner}`,
          '\u200b',
          ])
        .addField(`${client.emotes.world} Statystyki`, [
          `🪃 Liczba roli: \`${message.guild.roles.cache.size}\``,
          `${client.emotes.cpu} Liczba emoji: \`${message.guild.emojis.cache.size}\``,
          `${client.emotes.changelog} Normalnych emoji: \`${message.guild.emojis.cache.filter(emoji => !emoji.animated).size}\``,
          `${client.emotes.nitro} Animowanych emoji: \`${message.guild.emojis.cache.filter(emoji => emoji.animated).size}\``,
          `👥 Ludzi: \`${message.guild.members.cache.filter(member => !member.user.bot).size}\``,
          `🤖 Botów: \`${message.guild.members.cache.filter(member => member.user.bot).size}\``,
          `✍️ Kanałow tekstowych: \`${message.guild.channels.cache.filter(channel => channel.type === 'text').size}\``,
          `🔊 Kanałów głosowych: \`${message.guild.channels.cache.filter(channel => channel.type === 'voice').size}\``,
          `🔰 Boostów: \`${message.guild.premiumSubscriptionCount || '0'}\``
        ])
        const modRoles = message.guild.roles.cache.filter(role => role.permissions.has('MANAGE_MESSAGES') && role.members.filter(member => !member.user.bot).map(x => x)[0]).map(x => `${client.emotes.grverify}${x} ┇ \`${x.id}\``).join(`\n`)
        if (modRoles[0]) embed.addField(`${client.emotes.staff} Role moderatorów`, `${modRoles}`)

        await reaction.edit(embed)
      } catch (err) {
        errEmbed.setDescription(`${client.emotes.x} Sprawdzanie informacji o serwerze`)
        await reaction.edit(errEmbed)
        console.log(err)
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