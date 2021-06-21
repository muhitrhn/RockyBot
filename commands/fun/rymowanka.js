const { MessageEmbed } = require('discord.js')

module.exports = {
  name: 'rymowanka',
  aliases: ['fr'],
  description: 'Losowa rymowanka xD',
  category: 'fun',
  utilisation: '{prefix}fr',
  async execute(client, message, args, pf, cmd) {
    
    const reaction = await client.base.get('cmd').start(client, message, cmd)

    try {
      let texts = []
      const messages = await client.channels.cache.get(client.cmds.attachments.rymowanka).messages.fetch()
      await messages.forEach(msg => texts.push(msg.content))
      let text = await texts[Math.floor(Math.random() * texts.length)] 
      
      const embed = new MessageEmbed()
      .setTitle(text)
      .setColor('RANDOM')
      .setFooter(`💡 ${message.author.tag}\n🛠️ v${client.version} ┇ ⚡ RockyBot® 2021`, message.author.avatarURL({dynamic: true}))
      .setThumbnail(client.cmds.funImgs.rymowanka)
      await message.lineReplyNoMention({embed: embed})     
      
      await reaction.delete()
    } catch (err) {
      await client.base.get('cmd').error(client, message, pf, cmd, reaction, err)
    }
  }
}