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

      await interaction.defer()

      const embed = new MessageEmbed()
        .setColor('RANDOM')
        .setFooter(`🛠️ v${client.version} ┇ ⚡ RockyBot® 2021`, interaction.user.displayAvatarURL({dynamic: true}))

      const mentioned = interaction.options.map(x => x.options)[0].map(x => x.options)[0].map(x => x.member)[0]

      await warnModel.deleteMany({ GuildID: interaction.guild.id, User: mentioned.id })

      embed.setTitle(`${client.emotes.staff}  Usunięto wszystkie warny...`)
        .setDescription(`**...użytkownika [${mentioned.user.tag}](https://discord.com/users/${mentioned.id})**`)
        .setThumbnail(client.cmds.doneImgs[Math.floor(Math.random() * client.cmds.doneImgs.length)])

      return interaction.editReply({embeds: [embed]})      
    } 
    catch (err) {
      return client.base.get('cmd').error(client, interaction, err)
    }
  }
}
