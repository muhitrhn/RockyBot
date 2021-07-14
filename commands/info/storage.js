const { MessageEmbed } = require('discord.js')

module.exports = {

  async execute(client, interaction) {
    try {
      await interaction.defer()

      const wideo = await client.channels.cache.get(client.cmds.attachments.wideo).messages.fetch()
      const tuskotronic = await client.channels.cache.get(client.cmds.attachments.tuskotronic).messages.fetch()
      const stonoga = await client.channels.cache.get(client.cmds.attachments.stonoga).messages.fetch()
      const kamien = await client.channels.cache.get(client.cmds.attachments.kamien).messages.fetch()
      const budowa = await client.channels.cache.get(client.cmds.attachments.budowa).messages.fetch()
      const rymowanka = await client.channels.cache.get(client.cmds.attachments.rymowanka).messages.fetch()

      const embed = new MessageEmbed()
        .setTitle(`${client.emotes.staff}  Dostępne zasoby`)
        .setColor('RANDOM')
        .setFooter(`🛠️ v${client.version} ┇ ⚡ RockyBot® 2021`, interaction.user.displayAvatarURL({dynamic: true}))
        .setThumbnail(client.cmds.infoImgs.storage)
        .addField('** **', '** **')
        .addField(`🎬  Komenda wideo: \`${wideo.size}\``, '** **')
        .addField(`🎃  Komenda tuskotronic: \`${tuskotronic.size}\``, '** **')
        .addField(`😎  Komenda stonoga: \`${stonoga.size}\``, '** **')
        .addField(`:rock:  Komenda kamien: \`${kamien.size}\``, '** **')
        .addField(`🏗️  Komenda budowa: \`${budowa.size}\``, '** **')
        .addField(`📲  Komenda rymowanka: \`${rymowanka.size}\``, '** **')
        .addField('🎈  Komenda meme: `Powered by reddit.com`', '** **')
        .addField(`✨  Wszystkich wiadomości z których korzysta bot: \`${wideo.size + tuskotronic.size + stonoga.size + kamien.size + budowa.size + rymowanka.size}\``, '** **')
       
      return interaction.editReply({embeds: [embed]})
    } 
    catch (err) {
      return client.base.get('cmd').error(client, interaction, err)
    }
  }
}
