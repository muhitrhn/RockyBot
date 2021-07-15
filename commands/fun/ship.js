const { MessageEmbed } = require('discord.js')

module.exports = {
  
  async execute(client, interaction) {
    try {
      await interaction.defer()

      await interaction.guild.members.fetch()

      const embed = new MessageEmbed()
        .setTitle('Sprawdzone 💗')
        .setColor('#FFC0CB')
        .setFooter(`🛠️ v${client.version} ┇ ⚡ RockyBot® 2021`, interaction.user.displayAvatarURL({dynamic: true}))

      const optionCheck = interaction.options.map(x => x.options)[0] ? interaction.options.map(x => x.options)[0].map(x => x.value)[0] ? true : false : false

      //No options chosen
      if (!optionCheck) {
        const guildMembers = interaction.guild.members.cache.filter(user => user.id !== interaction.user.id && !user.bot).map(x => x)

        const userToShip = guildMembers[Math.floor(Math.random() * guildMembers.length)] 
        const ship = Math.floor(Math.random() * (100)) + 1

        embed.setDescription(interaction.user.toString() + ' + ' + userToShip.toString() + ' =  **' + ship + '%**')
          .setThumbnail(client.cmds.funImgs.ship[Math.floor(Math.random() * client.cmds.funImgs.ship.length)])
        
        return interaction.editReply({embeds: [embed]})
      }

      const option2Check = interaction.options.map(x => x.options)[0].map(x => x)[1] ? interaction.options.map(x => x.options)[0].map(x => x.value)[1] ? true : false : false

      //Only 1 option chosen
      if (!option2Check) {
        const toShip = interaction.options.map(x => x.options)[0].map(x => x.value)[0]
        
        const ship = Math.floor(Math.random() * (100)) + 1

        embed.setDescription(interaction.user.toString() + ' + ' + toShip.toString() + ' =  **' + ship + '%**')
          .setThumbnail(client.cmds.funImgs.ship[Math.floor(Math.random() * client.cmds.funImgs.ship.length)])
        
        return interaction.editReply({embeds: [embed]})
      }

      //Everything chosen
      const toShip1 = interaction.options.map(x => x.options)[0].map(x => x.value)[0]
      const toShip2 = interaction.options.map(x => x.options)[0].map(x => x.value)[1]
      let ship = Math.floor(Math.random() * (100)) + 1

      let ships = []
      await client.channels.cache.get(client.cmds.funOptions.shipsChannel).messages.fetch().then(async msgs => msgs.forEach(msg => ships.push(msg.content)))

      if (ships.includes(toShip1.toLowerCase() + ' x ' + toShip2.toLowerCase()) || ships.includes(toShip2.toLowerCase() + ' x ' + toShip1.toLowerCase())) {
          ship = Math.floor(Math.random() * (5)) + 91
      }

      embed.setDescription(toShip1.toString() + ' + ' + toShip2.toString() + ' =  **' + ship + '%**')
        .setThumbnail(client.cmds.funImgs.ship[Math.floor(Math.random() * client.cmds.funImgs.ship.length)])
        
      return interaction.editReply({embeds: [embed]})
    } 
    catch (err) {
      return client.base.get('cmd').error(client, interaction, err)
    }
  }
}