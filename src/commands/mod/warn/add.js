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

      const mentioned = interaction.options.map(x => x.options)[0].map(x => x.options)[0].map(x => x.member)[0]

      const embed = new MessageEmbed()
        .setColor('RANDOM')
        .setFooter(`💡 ${mentioned.user.tag}\n🛠️ v${client.version} ┇ ⚡ RockyBot® 2021`, mentioned.user.displayAvatarURL({dynamic: true}))

      if (mentioned.permissions.has('MANAGE_MESSAGES')) {
        embed.setTitle(`${client.emotes.siren}  Użytkownik jest moderatorem...`)
          .setDescription('**...moderatorzy nie mogą być ostrzeżeni**')
          .setThumbnail(client.cmds.errorImgs[Math.floor(Math.random() * client.cmds.errorImgs.length)])
          .setColor('#FFC000')

        return interaction.reply({embeds: [embed], ephemeral: true})
      }

      await interaction.defer()

      const userWarns = await warnModel.find({ GuildID: interaction.guild.id, User: mentioned.id })
      let newData = new warnModel({
        User: mentioned.id,
        Reason: interaction.options.map(x => x.options)[0].map(x => x.options)[0].map(x => x.value)[1],
        ModID: interaction.user.id,
        GuildID: interaction.guild.id
      })

      let warnID
      await newData.save(async function(err, id) {
        warnID = id._id

        embed.setTitle(`${client.emotes.staff}  Zwarnowano użytkownika...`)
          .setDescription(`**...[${mentioned.user.tag}](https://discord.com/users/${mentioned.id})**\n${client.emotes.gearspin} Numer ostrzeżenia: **${userWarns?userWarns.length + 1:1}**\n${client.emotes.grverify} Powód: **${interaction.options.map(x => x.options)[0].map(x => x.options)[0].map(x => x.value)[1]}**\n||${client.emotes.yellowDot} ID: **${warnID}**||\n\n${client.emotes.siri} Moderator: ${interaction.user.tag}`)
          .setThumbnail(client.cmds.doneImgs[Math.floor(Math.random() * client.cmds.doneImgs.length)])

        return interaction.editReply({embeds: [embed]})
     })
    } 
    catch (err) {
      return client.base.get('cmd').error(client, interaction, err)
    }
  }
}
