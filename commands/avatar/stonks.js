const { MessageEmbed } = require('discord.js')
const DIG = require('discord-image-generation')

module.exports = {
  name: 'stonks',
  aliases: ['as'],
  description: 'Stonks :D',
  category: 'avatar',
  utilisation: '{prefix}as <wzmianka/id>',
  async execute(client, message, args, pf, cmd) {

    const reaction = await client.base.get('cmd').start(client, message, cmd)

    try {
      const embed = new MessageEmbed()
      .setColor('RANDOM')
      .setFooter(`💡 ${message.author.tag}\n🛠️ v${client.version} ┇ ⚡ RockyBot® 2021`, message.author.displayAvatarURL({dynamic: true}))

      const mentioned = await client.base.get('check').user(client, message, args)

      //Create DIG image and attach
      const CreateAv = await new DIG.Stonk().getImage(`${mentioned.displayAvatarURL({ dynamic: false, format: 'png' })}?size=4096`)

      await message.lineReplyNoMention({embed: embed, files: [CreateAv]})
      
      //Ready
      await reaction.delete() 

    } 
    catch (err) {
      await client.base.get('cmd').error(client, message, pf, cmd, reaction, err)
    }
  }
}