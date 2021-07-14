const { MessageEmbed } = require('discord.js')

module.exports = {

  async execute(client, interaction) {
    try {
      const embed = new MessageEmbed()
        .setColor('RANDOM')
        .setFooter(`🛠️ v${client.version} ┇ ⚡ RockyBot® 2021`, interaction.user.displayAvatarURL({dynamic: true}))

      const msgNumber = interaction.options.map(x => x.options)[0].map(x => x.value)[0]
      const emoji = await client.emojis.cache.find(emojii => emojii.name.toLowerCase().includes(interaction.options.map(x => x.options)[0].map(x => x.value)[1].toLowerCase()))

      if (msgNumber < 1 || msgNumber > 40) {
        //Bad amount
        embed.setTitle(`${client.emotes.world}  Podano numer wiadomości...`)
          .setThumbnail(client.cmds.errorImgs[Math.floor(Math.random() * client.cmds.errorImgs.length)])
          .setColor('#FFC000')
          if (msgNumber < 1) {
            embed.setDescription('**...mniejszy od 1**')
          }
          else {
            embed.setDescription('**...większy od 40**')
          }

        return interaction.reply({embeds: [embed], ephemeral: true})
      }

      if(!emoji) {
        embed.setTitle(`${client.emotes.world}  Nie znaleziono emoji`)
          .setThumbnail(client.cmds.errorImgs[Math.floor(Math.random() * client.cmds.errorImgs.length)])
          .setColor('#FFC000')

        return interaction.reply({embeds: [embed], ephemeral: true})
      }

      await interaction.defer()

      const msg = await interaction.channel.messages.fetch(msgNumber + 1)
      let mess = []
      await msg.forEach(mssg => mess.push(mssg))

      mess[parseInt(msgNumber)].react(emoji)

      //READY
      embed.setTitle(`${client.emotes.nitro} Zareagowano na wiadomość...`)
        .setDescription(`**...o id\`${mess[parseInt(msgNumber) + 1].id}\` za pomocą emoji o nazwie \`${emoji.name}\`**`)
        .setThumbnail(client.cmds.doneImgs[Math.floor(Math.random() * client.cmds.doneImgs.length)])

      return interaction.editReply({embeds: [embed]})
    } 
    catch (err) {
      return client.base.get('cmd').error(client, interaction, err)
    }
  }
}