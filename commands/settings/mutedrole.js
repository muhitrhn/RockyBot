const { MessageEmbed } = require('discord.js')
const settingsModel = require('../../models/settings')

module.exports = {

  async execute(client, interaction) {
    try {
      const embed = new MessageEmbed()
        .setColor('RANDOM')
        .setFooter(`🛠️ v${client.version} ┇ ⚡ RockyBot® 2021`, interaction.user.displayAvatarURL({dynamic: true}))

      if(!interaction.member.permissions.has('MANAGE_GUILD') && !client.ownerID.includes(interaction.author.id)) {
        const missingPerms = 'ZARZĄDZANIE SERWEREM'
        return client.base.get('check').missingPerms(client, interaction, missingPerms)
      }

      await interaction.defer()

      const role = interaction.options.map(x => x.options)[0].map(x => x.role)[0]

      const data = await settingsModel.findOne({
        GuildID: interaction.guild.id
      }) 
          
      if (data) {
        await settingsModel.findOneAndRemove({
          GuildID: interaction.guild.id
        }) 
      }     
      
      const newData = new settingsModel({
        MutedRole: role.id,
        GuildID: interaction.guild.id
      })

      await newData.save()

      embed.setTitle(`${client.emotes.nitro} Ustawiono rolę wyciszenia...`).setDescription(`**...na ${role}**`)
        .setThumbnail(client.cmds.doneImgs[Math.floor(Math.random() * client.cmds.doneImgs.length)])

      return interaction.editReply({embeds: [embed]})
    } 
    catch (err) {
      return client.base.get('cmd').error(client, interaction, err)
    }
  }
}
