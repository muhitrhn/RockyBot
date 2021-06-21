const { MessageButton } = require('discord-buttons')
const { MessageEmbed } = require('discord.js')

module.exports = {
  name: 'check',

  async user(client, message, args) {
    let mentioned
    //NO MENTIONS
    if (message.mentions.members.size) {
      mentioned = message.mentions.users.first()
    //SOMEONE MENTIONED BY ID
    } else if (message.guild.member(args[0])) {
      mentioned = client.users.cache.get(args[0])
    } else {
      mentioned = message.author
    }
    return mentioned
  },

  async member(client, message, args) {
    let mentionMember = message.guild.member(args[0]), mentioned
    if (message.mentions.members.size) {
      mentioned = message.mentions.members.first()
    } else if (!mentionMember) {
      mentioned = message.member
    } else {
      mentioned = message.guild.member(args[0])
    }
    return mentioned
  },

  async missingPerms(client, message, reaction, missingPerms, ifBot) {
    const embed = new MessageEmbed()
    if (ifBot)  embed.setTitle('🔒  Bot nie ma wymaganych uprawnień...').setThumbnail(client.cmds.errorImgs[Math.floor(Math.random() * client.cmds.errorImgs.length)])
    if (!ifBot) embed.setTitle('🔒  Nie masz wymaganych uprawnień...').setThumbnail(client.cmds.lockedImgs[Math.floor(Math.random() * client.cmds.lockedImgs.length)])
    embed.setFooter(`💡 ${message.author.tag}\n🛠️ v${client.version} ┇ ⚡ RockyBot® 2021`, message.author.avatarURL({dynamic: true}))
    .setDescription(`**...\`${missingPerms}\`**`)
    .setColor('RED')

    const button = new MessageButton()
    if (!ifBot) button.setLabel('OK')
    .setStyle('green')
    .setEmoji(client.emotes.rverify_ID)
    .setID('ok')
    else button.setLabel('ADD BOT PERMS')
    .setStyle('url')
    .setEmoji(client.emotes.siren_ID)
    .setURL(`https://discord.com/api/oauth2/authorize?client_id=${client.myID}&permissions=8&scope=bot%20applications.commands`)

    await reaction.edit({embed: embed, component: button})

    if (!ifBot) {
      const filter = (button) => button.clicker.user.id === message.author.id && button.id === 'ok'
      const filter2 = (button) => button.clicker.user.id !== message.author.id

      const collector = reaction.createButtonCollector(filter, { time: 30000, dispose: true })
      const collector2 = reaction.createButtonCollector(filter2, { time: 30000, dispose: true })

      await collector.on('collect', async () => {
        await collector.stop()
        await collector2.stop()

        await reaction.delete()
        await message.delete()
        return
      })

      await collector2.on('collect', async buttonClick => {
        const replyEmbed = new MessageEmbed().setColor('RED').setDescription(`**${client.emotes.grverify} Nie wywołałeś tej wiadomości**`).setFooter(`🛠️ v${client.version} ┇ ⚡ RockyBot® 2021 Reply Engine`, buttonClick.clicker.user.avatarURL({dynamic: true}))
        await buttonClick.reply.send({ embed: replyEmbed, ephemeral: true })
      })
    }
  }
}