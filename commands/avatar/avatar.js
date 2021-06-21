const { MessageButton, MessageActionRow } = require('discord-buttons')
const { MessageEmbed } = require('discord.js')

module.exports = {
  name: 'avatar',
  aliases: ['aa'],
  description: 'Wyślij kogoś avatar',
  category: 'avatar',
  utilisation: '{prefix}aa <wzmianka/id>',
  async execute(client, message, args, pf, cmd) {
    
    const reaction = await client.base.get('cmd').start(client, message, cmd)

    try {
      const embed = new MessageEmbed()
      .setColor('RANDOM')
      .setFooter(`💡 ${message.author.tag}\n🛠️ v${client.version} ┇ ⚡ RockyBot® 2021`, message.author.avatarURL({dynamic: true}))

      const mentioned = await client.base.get('check').user(client, message, args)
      
      if (!mentioned.avatarURL()) {
        embed.setTitle(`\`${client.emotes.world}  Nie znaleziono avataru użytkownika...`)
        .setDescription(`**... ${mentioned}**`)
        .setThumbnail(client.cmds.errorImgs[Math.floor(Math.random() * client.cmds.errorImgs.length)])
        .setColor('#FFC000')
        await reaction.edit({embed: embed})
        return
      }

      const button = new MessageButton()
      .setLabel('MAŁY')
      .setStyle('url')
      .setEmoji(client.emotes.dwnld_ID)
      .setURL(mentioned.avatarURL({dynamic: true}))
      const button2 = new MessageButton()
      .setLabel('DUŻY')
      .setStyle('url')
      .setEmoji(client.emotes.dwnld_ID)
      .setURL(mentioned.avatarURL({dynamic: true})+'?size=4096')
      const buttonRow = new MessageActionRow()
      .addComponent(button)
      .addComponent(button2)

      let reply = await message.lineReplyNoMention({embed: embed, files: [mentioned.avatarURL({dynamic: true})+'?size=4096']})
      await reaction.delete()
      reply.edit({embed: embed, component: buttonRow})

    } catch (err) {
      await client.base.get('cmd').error(client, message, pf, cmd, reaction, err)
    }
  }
}