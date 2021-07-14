const { MessageEmbed } = require('discord.js')

module.exports = {

  async execute(client, interaction) {
    try {
      const embed = new MessageEmbed()
        .setColor('RANDOM')
        .setFooter(`🛠️ v${client.version} ┇ ⚡ RockyBot® 2021`, interaction.user.displayAvatarURL({dynamic: true}))

      if(!client.ownerID.includes(interaction.user.id)) {
        embed.setTitle('🔒  Nie masz wymaganych uprawnień...')
          .setDescription('**...`WŁAŚCICIEL BOTA`**')
          .setThumbnail(client.cmds.lockedImgs[Math.floor(Math.random() * client.cmds.lockedImgs.length)])
          .setColor('#FFC000')

        return interaction.reply({embeds: [embed], ephemeral: true})
      } 

      await interaction.defer()

      //EVAL
      const code = interaction.options.map(x => x.options)[0].map(x => x.value)[0]
      let evaled = await eval(code)
   
      if (typeof evaled !== 'string') {
        evaled = require('util').inspect(await evaled)
      }
   
      return interaction.editReply(evaled, {code:'xl'})
    } 
    catch (err) {
      return interaction.editReply('```' + err + '```')
    }
  }
}
