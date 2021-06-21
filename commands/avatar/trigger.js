const { MessageEmbed, MessageAttachment } = require('discord.js')
const DIG = require('discord-image-generation')

module.exports = {
  name: 'trigger',
  aliases: ['at', 'triggered'],
  description: 'Ktos się wkurzył...',
  category: 'avatar',
  utilisation: '{prefix}at <wzmianka/id>',
  async execute(client, message, args, pf, cmd) {

    const reaction = await client.base.get('cmd').start(client, message, cmd)

    try {
      const embed = new MessageEmbed()
      .setColor('RANDOM')
      .setFooter(`💡 ${message.author.tag}\n🛠️ v${client.version} ┇ ⚡ RockyBot® 2021`, message.author.avatarURL({dynamic: true}))

      const mentioned = await client.base.get('check').user(client, message, args)

      //Create DIG image and attach
      const CreateAv = await new DIG.Triggered().getImage(`${mentioned.avatarURL({ dynamic: false, format: 'png' })}?size=4096`)
      const attachment = new MessageAttachment(CreateAv, 'triggered.gif')

<<<<<<< HEAD
      await message.lineReplyNoMention({embed: embed, files: [attachment]})

=======
      await message.lineReplyNoMention({embed: embed, files: [attachment]})

>>>>>>> 0332dc8ba050f70feb11b93b9bfd26f6522c45a5
      //Ready
      await reaction.delete()

    } catch (err) {
      await client.base.get('cmd').error(client, message, pf, cmd, reaction, err)
    }
  }
}