const { MessageEmbed } = require('discord.js')

module.exports = {
  name: 'emoji',
  aliases: ['ne'],
  description: 'Wysyła emoji o podanej nazwie',
  category: 'nitro',
  utilisation: '{prefix}ne [nazwa emoji]',
  async execute(client, message, args, pf, cmd) {
    
    const reaction = await client.base.get('cmd').start(client, message, cmd)

    try {
      const embed = new MessageEmbed()
      .setColor('RANDOM')
      .setFooter(`💡 ${message.author.tag}\n🛠️ v${client.version} ┇ ⚡ RockyBot® 2021`, message.author.avatarURL({dynamic: true}))

      if(!args[0]) {
        embed.setTitle(`${client.emotes.world}  Nie napisałeś, jakiego emoji użyć`)
        .setThumbnail(client.cmds.errorImgs[Math.floor(Math.random() * client.cmds.errorImgs.length)])
        .setColor('#FFC000')
        await reaction.edit({embed: embed})
        return
      } 

      let emoji = await client.emojis.cache.find(emojii => emojii.name.toLowerCase().includes(args[0].toLowerCase()))

      if (!emoji) {
        embed.setTitle(`${client.emotes.world}  Nie znaleziono emoji o nazwie \`${args[0]}\``)
        .setThumbnail(client.cmds.errorImgs[Math.floor(Math.random() * client.cmds.errorImgs.length)])
        .setColor('#FFC000')
        await reaction.edit({embed: embed})
        return
      }

      //WebhksChk
      const webhooks = await message.channel.fetchWebhooks()
      let myWebhooks = await webhooks.filter(wbhk => wbhk.owner.id == client.user.id)
      let webhksCheck
      if (!myWebhooks.first()) {
        webhksCheck = 0
      }
      else {
        webhksCheck = 1
      }

      let webhook
      if (webhksCheck === 0) {
        //Create webhook
        webhook = await message.channel.createWebhook(message.author.username, { avatar: message.author.avatarURL() })
      }
      else {
        //Edit webhook
        webhook = await myWebhooks.first().edit({
        name: message.author.username,
        avatar: message.author.avatarURL()
        })
      }

      await webhook.send(emoji.toString())

      embed.setTitle(`${client.emotes.nitro} Wysłano emoji...`)
      .setDescription(`**...o nazwie \`${emoji.name}\`**`)
      .setThumbnail(client.cmds.doneImgs[Math.floor(Math.random() * client.cmds.doneImgs.length)])
      await reaction.edit({embed: embed})

    } catch (err) {
      await client.base.get('cmd').error(client, message, pf, cmd, reaction, err)
    }
  }
}