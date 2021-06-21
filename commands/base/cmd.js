const { MessageEmbed } = require('discord.js')
const { MessageButton } = require('discord-buttons')

module.exports = {
  name: 'cmd',

  async start(client, message, cmd) {
    const reactionEmbed = new MessageEmbed()
    .setTitle(`${client.emotes.winLoad} Praca w toku...`)
    .setDescription(`${client.emotes.gearspin} Poczekaj na wykonanie skryptów komendy \`${cmd}\`...`)
    .setThumbnail(client.cmds.loadingImgs[Math.floor(Math.random() * client.cmds.loadingImgs.length)])
    .setFooter(`💡 ${message.author.tag}\n🛠️ v${client.version} ┇ ⚡ RockyBot® 2021`, message.author.avatarURL({dynamic: true}))
    .setColor('BLUE')
    const reaction = await message.lineReplyNoMention({embed: reactionEmbed})
    return reaction
  },

  async error(client, message, pf, cmd, reaction, err) {
    try {
      const errEmbed = new MessageEmbed()
      .setTitle(`${client.emotes.world}  Komenda \`${pf}${cmd}\` napotkała problem`)
      .setThumbnail(client.cmds.errorImgs[Math.floor(Math.random() * client.cmds.errorImgs.length)])
      .setColor('RED')
      .setFooter(`💡 ${message.author.tag}\n🛠️ v${client.version} ┇ ⚡ RockyBot® 2021 Bugreport Engine`, message.author.avatarURL({dynamic: true}))

      const channel = await client.channels.cache.get(client.config.cmds.BugReportChannel)

      let reports = []
      const messages = await channel.messages.fetch({limit: 100})
      await messages.forEach(msg => reports.push(msg.content))

      const button = new MessageButton()
      if (reports.includes(cmd)) {
        button.setLabel('Already reported')
        .setStyle('green')
        .setEmoji('🚀')
        .setDisabled()
        .setID('alr_rep')
        errEmbed.setDescription(`${client.emotes.rverify} **Zatrzymano wykonywanie komendy**\n\n${client.emotes.gearspin} *Bug już został zgłoszony, trwają prace nad naprawieniem tej funkcji komendy*`)
      } else {
        button.setLabel('Report problem')
        .setStyle('red')
        .setEmoji('⚠️')
        .setID('report_problem')
        errEmbed.setDescription(`${client.emotes.rverify} **Zatrzymano wykonywanie komendy**`)
      }
      try {await reaction.edit({embed: errEmbed, component: button})} catch (err) {reaction = await message.channel.send({embed: errEmbed, component: button})}

      if (reports.includes(cmd)) return

      const filter = (button) => button.clicker.user.id === message.author.id && button.id === 'report_problem'
      const filter2 = (button) => button.clicker.user.id !== message.author.id
      const collector = reaction.createButtonCollector(filter, { time: 30000, dispose: true })
      const collector2 = reaction.createButtonCollector(filter2, { time: 30000, dispose: true })

      button.setLabel('Reported')
      .setStyle('green')
      .setEmoji('🚀')
      .setDisabled()

      await collector.on('collect', async button2 => {
        await collector.stop()
        await collector2.stop()
        await button2.defer()
        await reaction.edit({embed: errEmbed, component: button})

        const bugReportEmbed = new MessageEmbed()
        .setTitle(`${client.emotes.siren} Zgłoszono problem w komendzie \`${cmd}\``)
        .setDescription(`${client.emotes.arrr} **Serwer**: \`${message.guild.name}\`, \`${message.guild.id}\`\n${client.emotes.gearspin} **Log**: \`\`\`${err}\`\`\``)
        .setFooter(`💡 ${message.author.tag}\n🛠️ v${client.version} ┇ ⚡ RockyBot® 2021 Bugreport Engine`, message.author.avatarURL({dynamic: true}))
        .setColor('RED')
        .setTimestamp()
        await channel.send(cmd, {embed: bugReportEmbed})
        return
      })

      await collector2.on('collect', async button2 => {
        const replyEmbed = new MessageEmbed().setColor('RED').setDescription(`**${client.emotes.grverify} Nie wywołałeś tej wiadomości**`).setFooter(`🛠️ v${client.version} ┇ ⚡ RockyBot® Reply Engine 2021`, button2.clicker.user.avatarURL({dynamic: true}))
        await button2.reply.send({ embed: replyEmbed, ephemeral: true })
      })
    }
    catch (err) {
      await client.base.get('cmd').error(client, message, pf, cmd, reaction, err)
    }
  }
}
