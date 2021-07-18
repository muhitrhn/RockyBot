const { MessageEmbed } = require('discord.js')
const warnModel = require('../../../models/warns')

module.exports = {

  async execute(client, interaction) {
    try {
      const missingPerms = 'ZARZĄDZANIE WIADOMOŚCIAMI'

      if (!interaction.member.permissionsIn(interaction.channel).has('MANAGE_MESSAGES')  && !client.ownerID.includes(interaction.user.id)) {
        //PermsCheck: missing user perms
        return client.base.get('check').missingPerms(client, interaction, missingPerms)
      }

      const embed = new MessageEmbed()
        .setColor('RANDOM')
        .setFooter(`🛠️ v${client.version} ┇ ⚡ RockyBot® 2021`, interaction.user.displayAvatarURL({dynamic: true}))
      
      let warn
      try {
        warn = await warnModel.findOne({ GuildID: interaction.guild.id, _id: interaction.options.map(x => x.options)[0].map(x => x.options)[0].map(x => x.value)[0]})
      } catch (err) {
        warn = 0
      }
 

      if(!warn) {
        embed.setTitle(`${client.emotes.grverify}  Na tym serwerze nie znaleziono warna...`)
          .setDescription(`**...o ID ${interaction.options.map(x => x.options)[0].map(x => x.options)[0].map(x => x.value)[0]}**`)
          .setColor('RANDOM')
          .setThumbnail(client.cmds.errorImgs[Math.floor(Math.random() * client.cmds.errorImgs.length)])

        return interaction.reply({embeds: [embed], ephemeral: true})
      }

      await interaction.defer()

      await warnModel.findOneAndRemove({ GuildID: interaction.guild.id, _id: interaction.options.map(x => x.options)[0].map(x => x.options)[0].map(x => x.value)[0]})

      embed.setTitle(`${client.emotes.staff}  Usunięto warna...`)
        .setDescription(`**...użytkownika${interaction.guild.members.cache.get(warn.User) ? ` [${interaction.guild.members.cache.get(warn.User).user.tag}` : `o id [${warn.User}`}](https://discord.com/users/${warn.User})** z powodem **${warn.Reason}**\n\n*Aby usunąć wszystkie warny użytkownika, użyj \`/mod warn delete-by-user\`*`)
        .setThumbnail(client.cmds.doneImgs[Math.floor(Math.random() * client.cmds.doneImgs.length)])

      return interaction.editReply({embeds: [embed]})      
    } 
    catch (err) {
      return client.base.get('cmd').error(client, interaction, err)
    }
  }
}
