const { MessageEmbed } = require('discord.js')

module.exports = {

  async execute(client, interaction) {
    try {
      const embed = new MessageEmbed()
        .setColor('RANDOM')
        .setFooter(`🛠️ v${client.version} ┇ ⚡ RockyBot® 2021`, interaction.user.displayAvatarURL({dynamic: true}))

      let emoji = await client.emojis.cache.find(emojii => emojii.name.toLowerCase().includes(interaction.options.map(x => x.options)[0].map(x => x.value)[0].toLowerCase()))

      if (!emoji) {
        embed.setTitle(`${client.emotes.world}  Nie znaleziono emoji o nazwie \`${interaction.options.map(x => x.options)[0].map(x => x.value)[0].toLowerCase()}\``)
          .setThumbnail(client.cmds.errorImgs[Math.floor(Math.random() * client.cmds.errorImgs.length)])
          .setColor('#FFC000')

        return interaction.reply({embeds: [embed], ephemeral: true})
      }

      await interaction.defer()

      //WebhksChk
      const webhooks = await interaction.channel.fetchWebhooks()
      let myWebhooks = await webhooks.filter(wbhk => wbhk.owner.id === client.user.id)
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
        webhook = await interaction.channel.createWebhook(interaction.user.username, { avatar: interaction.user.displayAvatarURL() })
      }
      else {
        //Edit webhook
        webhook = await myWebhooks.first().edit({
          name: interaction.user.username,
          avatar: interaction.user.displayAvatarURL()
        })
      }

      await webhook.send(emoji.toString())

      embed.setTitle(`${client.emotes.nitro} Wysłano emoji...`)
        .setDescription(`**...o nazwie \`${emoji.name}\`**`)
        .setThumbnail(client.cmds.doneImgs[Math.floor(Math.random() * client.cmds.doneImgs.length)])

      return interaction.editReply({embeds: [embed]})
    } 
    catch (err) {
      return client.base.get('cmd').error(client, interaction, err)
    }
  }
}