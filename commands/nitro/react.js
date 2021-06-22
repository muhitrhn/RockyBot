const { MessageEmbed } = require('discord.js')

module.exports = {
  name: 'react',
  aliases: ['nr'],
  description: 'Reaguje na podaną wiadomość',
  category: 'nitro',
  utilisation: '{prefix}nr [numer wiadomosci, liczac od dolu, mniejszy niż 40] [nazwa emoji]',
  async execute(client, message, args, pf, cmd) {

    const reaction = await client.base.get('cmd').start(client, message, cmd)

    try {
      const embed = new MessageEmbed()
      .setColor('RANDOM')
      .setFooter(`💡 ${message.author.tag}\n🛠️ v${client.version} ┇ ⚡ RockyBot® 2021`, message.author.displayAvatarURL({dynamic: true}))

      if(!args[0]) {
        embed.setTitle(`${client.emotes.world}  Brak informacji na którą wiadomość odpowiedzieć`)
        .setThumbnail(client.cmds.errorImgs[Math.floor(Math.random() * client.cmds.errorImgs.length)])
        .setColor('#FFC000')
        await reaction.edit({embed: embed})
        return
      }
      
      if(!args[1]) {
        embed.setTitle(`${client.emotes.world}  Brak informacji jakiego emoji użyć`)
        .setThumbnail(client.cmds.errorImgs[Math.floor(Math.random() * client.cmds.errorImgs.length)])
        .setColor('#FFC000')
        await reaction.edit({embed: embed})
        return
      }

      const msgNumber = parseInt(args[0])
      const emoji = await client.emojis.cache.find(emojii => emojii.name.toLowerCase().includes(args[1].toLowerCase()))

      if (msgNumber > 40 || msgNumber < 1 || !msgNumber) {
        embed.setTitle(`${client.emotes.world}  Podano zły numer wiadomości...`)
        .setDescription('**...większy od 40, miejszy od 1 lub niewłaściwa liczba**')
        .setThumbnail(client.cmds.errorImgs[Math.floor(Math.random() * client.cmds.errorImgs.length)])
        .setColor('#FFC000')
        await reaction.edit({embed: embed})
        return
      }

      if(!emoji) {
        embed.setTitle(`${client.emotes.world}  Nie znaleziono emoji`)
        .setThumbnail(client.cmds.errorImgs[Math.floor(Math.random() * client.cmds.errorImgs.length)])
        .setColor('#FFC000')
        await reaction.edit({embed: embed})
        return
      }

      const msg = await message.channel.messages.fetch(msgNumber + 2)
      let mess = []
      await msg.forEach(mssg => mess.push(mssg))
               
      mess[parseInt(msgNumber) + 1].react(emoji)

      //READY
      embed.setTitle(`${client.emotes.nitro} Zareagowano na wiadomość...`)
      .setDescription(`**...o id\`${mess[parseInt(msgNumber) + 1].id}\` za pomocą emoji o nazwie \`${emoji.name}\`**`)
      .setThumbnail(client.cmds.doneImgs[Math.floor(Math.random() * client.cmds.doneImgs.length)])
      await reaction.edit({embed: embed})
    } 
    catch (err) {
      await client.base.get('cmd').error(client, message, pf, cmd, reaction, err)
    }
  }
}