const { MessageEmbed,MessageAttachment } = require('discord.js')

module.exports = {
  name: 'budowa',
  aliases: ['fb'],
  description: 'Budowa! BUDOWA!',
  category: 'fun',
  utilisation: '{prefix}fb',
  async execute(client, message, args, pf, cmd) {
    
    const reaction = await client.base.get('cmd').start(client, message, cmd)

    try {
      let files = []
      const messages = await client.channels.cache.get(client.cmds.attachments.budowa).messages.fetch()
      await messages.forEach(msg => files.push(msg.attachments.array()[0].url))
      const chosenFile = await files[Math.floor(Math.random() * files.length)] 
      
      const attachment = new MessageAttachment(chosenFile, 'wideo.mp4')
      const embed = new MessageEmbed()
      .setTitle(`${client.emotes.CMDbudowa}  Budowa!`)
      .setColor('RANDOM')
      .setFooter(`💡 ${message.author.tag}\n🛠️ v${client.version} ┇ ⚡ RockyBot® 2021`, message.author.avatarURL({dynamic: true}))
      await message.lineReplyNoMention({embed: embed, files: [attachment] })     
      
      await reaction.delete()
    } catch (err) {
      await client.base.get('cmd').error(client, message, pf, cmd, reaction, err)
    }
  }
}