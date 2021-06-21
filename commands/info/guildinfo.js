const { MessageButton } = require('discord-buttons')
const { MessageEmbed } = require('discord.js')

module.exports = {
  name: 'guildinfo',
  aliases: ['igi', 'ig', 'isi', 'serverinfo', 'serwerinfo'],
  description: 'Info o serwerze',
  category: 'info',
  utilisation: '{prefix}igi',
  async execute(client, message, args, pf, cmd) {

   const reaction = await client.base.get('cmd').start(client, message, cmd)

    try {
      client.commands.get('guildinfo').main(client, message, args, pf, cmd, reaction)
    } catch (err) {
      await client.base.get('cmd').error(client, message, pf, cmd, reaction, err)
    }
  },

  async main(client, message, args, pf, cmd, reaction, bt, embedColor) {
    try {
      const embed = new MessageEmbed()
      .setFooter(`💡 ${message.author.tag}\n🛠️ v${client.version} ┇ ⚡ RockyBot® 2021`, message.author.avatarURL({dynamic: true}))
      .setDescription('')
      .setThumbnail(message.guild.iconURL({ dynamic: true }))
      .setTitle(`🖥️  Serwer **${message.guild.name}**`)
      if (embedColor) embed.setColor(embedColor); else embed.setColor('RANDOM')
      embed.addField('🔆 <-- Ogólne -->', [
        `📎 ID: **${message.guild.id}**`,
        `⛳ Właściciel: **${message.guild.owner.user.tag}**`,
        `⏲️ Utworzono (UTC): **${message.guild.createdAt.getUTCHours()}:${(message.guild.createdAt.getUTCMinutes()<10?'0':'')+parseInt(message.guild.createdAt.getUTCMinutes())}┇${(message.guild.createdAt.getUTCDate()<10?'0':'')+parseInt(message.guild.createdAt.getUTCDate())}.${((message.guild.createdAt.getUTCMonth()+1)<10?'0':'')+parseInt(message.guild.createdAt.getUTCMonth()+1)}.${message.guild.createdAt.getUTCFullYear()}**`,
        '\u200b'
      ])
      .addField(`${client.emotes.world} <-- Statystyki -->`, [
        `🪃 Roli: **${message.guild.roles.cache.size}**`,
        `${client.emotes.cpu} Emoji ogółem: **${message.guild.emojis.cache.size}**`,
        `${client.emotes.changelog} Normalnych emoji: **${message.guild.emojis.cache.filter(emoji => !emoji.animated).size}**`,
        `${client.emotes.nitro} Animowanych emoji: **${message.guild.emojis.cache.filter(emoji => emoji.animated).size}**`,
        `👥 Ludzi: **${message.guild.members.cache.filter(member => !member.user.bot).size}**`,
        `🤖 Botów: **${message.guild.members.cache.filter(member => member.user.bot).size}**`,
        `✍️ Kanałow tekstowych: **${message.guild.channels.cache.filter(channel => channel.type === 'text').size}**`,
        `🔊 Kanałów głosowych: **${message.guild.channels.cache.filter(channel => channel.type === 'voice').size}**`,
        `🔰 Boostów: **${message.guild.premiumSubscriptionCount || '0'}**`
      ])

      const button = new MessageButton()
      .setLabel('Moderatorzy')
      .setStyle('blurple')
      .setEmoji(client.emotes.staff_ID)
      .setID('modders')
      await reaction.edit({embed: embed, component: button})

      // eslint-disable-next-line no-empty
      try {await bt.defer()} catch (err) {}
      const filter = (button) => button.clicker.user.id === message.author.id && button.id === 'modders'
      const filter2 = (button) => button.clicker.user.id !== message.author.id
      const collector = reaction.createButtonCollector(filter, { time: 30000, dispose: true })
      const collector2 = reaction.createButtonCollector(filter2, { time: 30000, dispose: true })

      collector.on('collect', async buttonClick => {
        await collector.stop()
        await collector2.stop()
        const embedColor = embed.color
        await client.commands.get('guildinfo').modders(client, message, args, pf, cmd, reaction, buttonClick, embedColor)
        return
      })

      collector2.on('collect', async buttonClick => {
        const replyEmbed = new MessageEmbed().setColor('RED').setDescription(`**${client.emotes.grverify} Nie wywołałeś tej wiadomości**`).setFooter(`🛠️ v${client.version} ┇ ⚡ RockyBot® 2021 Reply Engine`, buttonClick.clicker.user.avatarURL({dynamic: true}))
        await buttonClick.reply.send({ embed: replyEmbed, ephemeral: true })
      })
    } catch (err) {
      await client.base.get('cmd').error(client, message, pf, cmd, reaction, err)
    }
  },

  async modders(client, message, args, pf, cmd, reaction, bt, embedColor) {
    try {
      const modRoles = await message.guild.roles.cache.filter(role => role.permissions.has('MANAGE_MESSAGES') && role.members.filter(member => !member.user.bot).map(x => x)[0]).map(x => `\n${client.emotes.grverify} **${x}**:\n${x.members.filter(y => !y.user.bot).map(y => client.emotes.yellowDot + ' ' + y.user.tag).join('\n')}`).join('\n')
      const embed = new MessageEmbed()
      .setTitle(`${client.emotes.staff} Moderatorzy na serwerze ${message.guild.name}`)
      .setThumbnail(message.guild.iconURL({ dynamic: true }))
      .setFooter(`💡 ${message.author.tag}\n🛠️ v${client.version} ┇ ⚡ RockyBot® 2021`, message.author.avatarURL({dynamic: true}))
      .setColor(embedColor)
      const mods = message.guild.members.cache.filter(member => member.permissions.has('MANAGE_MESSAGES') && !member.user.bot).map(y => client.emotes.yellowDot + ' ' + y.user.tag).join('\n')
      if (modRoles[0]) embed.setDescription(`${client.emotes.rverify} *Role z uprawnieniami \`ZARZĄDZANIE WIADOMOŚCIAMI\`*\n\n${modRoles}`); else embed.setDescription(`${client.emotes.rverify} *Użytkownicy z uprawnieniami \`ZARZĄDZANIE WIADOMOŚCIAMI\`*\n\n${mods}`)

      const button = new MessageButton()
      .setLabel('Wróć')
      .setStyle('grey')
      .setEmoji(client.emotes.arrl_ID)
      .setID('back')

      await reaction.edit({embed: embed, component: button})
      // eslint-disable-next-line no-empty
      try {await bt.defer()} catch (err) {}
      const filter = (button) => button.clicker.user.id === message.author.id && button.id === 'back'
      const filter2 = (button) => button.clicker.user.id !== message.author.id
      const collector = reaction.createButtonCollector(filter, { time: 30000, dispose: true })
      const collector2 = reaction.createButtonCollector(filter2, { time: 30000, dispose: true })

      collector.on('collect', async buttonClick => {
        await collector.stop()
        await collector2.stop()
        await client.commands.get('guildinfo').main(client, message, args, pf, cmd, reaction, buttonClick, embedColor)
        return
      })

      collector2.on('collect', async buttonClick => {
        const replyEmbed = new MessageEmbed().setColor('RED').setDescription(`**${client.emotes.grverify} Nie wywołałeś tej wiadomości**`).setFooter(`🛠️ v${client.version} ┇ ⚡ RockyBot® Reply Engine 2021`, buttonClick.clicker.user.avatarURL({dynamic: true}))
        await buttonClick.reply.send({ embed: replyEmbed, ephemeral: true })
      })

    } 
    catch (err) {
      await client.base.get('cmd').error(client, message, pf, cmd, reaction, err)
    }
  }
}