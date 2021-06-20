const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "guildinfo",
  aliases: ['igi', 'ig', 'isi', 'serverinfo', 'serwerinfo'],
  description: "Info o serwerze",
  category: 'info',
  utilisation: '{prefix}igi',
  async execute(client, message, args, pf, cmd) {
    
   const reaction = await client.base.get(`cmd`).start(client, message, cmd)

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

      await reaction.edit({embed: embed})      
    } catch (err) {
      await client.base.get(`cmd`).error(client, message, pf, cmd, reaction, err)
    }
  }
}