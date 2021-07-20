import { CommandInteraction, MessageEmbed } from 'discord.js'
import { config } from "../.."
  
async function execute(interaction: CommandInteraction) {
  await interaction.defer()

  await interaction.guild?.members.fetch()

  const embed = new MessageEmbed()
    .setTitle('Sprawdzone 💗')
    .setColor('#FFC0CB')
    .setFooter(`🛠️ v${config.version} ┇ ⚡ RockyBot® 2021`, interaction.user.displayAvatarURL({dynamic: true}))

  const optionCheck = interaction.options.getString('opcja') ? true : false

  //No options chosen
  if (!optionCheck) {
    const guildMembers = interaction.guild?.members.cache.filter((user: any) => user.id !== interaction.user.id && !user.bot).array()

    //@ts-ignore
    const userToShip = guildMembers[Math.floor(Math.random() * guildMembers.length)] 
    const ship = Math.floor(Math.random() * (100)) + 1

    embed.setDescription(interaction.user.toString() + ' + ' + userToShip.toString() + ' =  **' + ship + '%**')
      .setThumbnail(config.cmds.funImgs.ship[Math.floor(Math.random() * config.cmds.funImgs.ship.length)])
        
    await interaction.editReply({embeds: [embed]})
    return
  }

  const option2Check = interaction.options.getString('opcja2') ? true : false

  //Only 1 option chosen
  if (!option2Check) {
    const toShip = interaction.options.getString('opcja', true)
        
    const ship = Math.floor(Math.random() * (100)) + 1

    embed.setDescription(interaction.user.toString() + ' + ' + toShip.toString() + ' =  **' + ship + '%**')
      .setThumbnail(config.cmds.funImgs.ship[Math.floor(Math.random() * config.cmds.funImgs.ship.length)])
        
    await interaction.editReply({embeds: [embed]})
    return    
  }

  //Everything chosen
  const toShip1 = interaction.options.getString('opcja', true)
  const toShip2 = interaction.options.getString('opcja2', true)
  const ship = Math.floor(Math.random() * 100) + 1

  embed.setDescription(toShip1.toString() + ' + ' + toShip2.toString() + ' =  **' + ship + '%**')
    .setThumbnail(config.cmds.funImgs.ship[Math.floor(Math.random() * config.cmds.funImgs.ship.length)])
        
  await interaction.editReply({embeds: [embed]})
} 

const options = {
  name: 'ship',
  description: '💕 Zobacz, jak bardzo są w sobie zakochani',
  type: 1,
  options: [
    {
      type: "STRING",
      name: 'opcja',
      description: '🌎 Pierwsza rzecz/osoba do sprawdzenia',
      required: false
    },
    {
      type: "STRING",
      name: 'opcja2',
      description: '🌎 Druga rzecz/osoba do sprawdzenia',
      required: false
    }
  ]
}

export { execute, options }