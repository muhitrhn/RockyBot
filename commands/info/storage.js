const { MessageEmbed } = require('discord.js')

module.exports = {
  name: 'storage',
  aliases: ['is'],
  description: 'Info o ilosci dostepnych zasobow do komend',
  category: 'info',
  utilisation: '{prefix}is',
  async execute(client, message, args, pf, cmd) {
    
    const reaction = await client.base.get('cmd').start(client, message, cmd)

    try {
      const embed = new MessageEmbed()
      .setTitle(`${client.emotes.staff}  Dostępne zasoby`)
      .setColor('RANDOM')
      .setFooter(`💡 ${message.author.tag}\n🛠️ v${client.version} ┇ ⚡ RockyBot® 2021`, message.author.displayAvatarURL({dynamic: true}))
      
      embed.addField('** **', '** **')

      const wideo = await client.channels.cache.get(client.cmds.attachments.wideo).messages.fetch()
      embed.addField(`🎬  Komenda wideo: \`${wideo.size}\``, '** **')

      const tuskotronic = await client.channels.cache.get(client.cmds.attachments.tuskotronic).messages.fetch()
      embed.addField(`🎃  Komenda tuskotronic: \`${tuskotronic.size}\``, '** **')

      const stonoga = await client.channels.cache.get(client.cmds.attachments.stonoga).messages.fetch()
      embed.addField(`😎  Komenda stonoga: \`${stonoga.size}\``, '** **')

      const kamien = await client.channels.cache.get(client.cmds.attachments.kamien).messages.fetch()
      embed.addField(`:rock:  Komenda kamien: \`${kamien.size}\``, '** **')

      const budowa = await client.channels.cache.get(client.cmds.attachments.budowa).messages.fetch()
      embed.addField(`🏗️  Komenda budowa: \`${budowa.size}\``, '** **')

      const rymowanka = await client.channels.cache.get(client.cmds.attachments.rymowanka).messages.fetch()
      embed.addField(`📲  Komenda rymowanka: \`${rymowanka.size}\``, '** **')

      embed.addField('🎈  Komenda meme: `Powered by reddit.com`', '** **')

      embed.addField(`✨  Wszystkich wiadomości z których korzysta bot: \`${wideo.size + tuskotronic.size + stonoga.size + kamien.size + budowa.size + rymowanka.size}\``, '** **')

      .setThumbnail(client.cmds.infoImgs.storage)
       
      await reaction.edit({embed: embed})

    } 
    catch (err) {
      await client.base.get('cmd').error(client, message, pf, cmd, reaction, err)
    }
  }
}
