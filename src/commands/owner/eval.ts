import { CommandInteraction, MessageEmbed } from 'discord.js'
import { config } from '../..'

async function execute(interaction: CommandInteraction) {
  const embed = new MessageEmbed()
    .setColor('RANDOM')
    .setFooter(`🛠️ v${config.version} ┇ ⚡ RockyBot® 2021`, interaction.user.displayAvatarURL({dynamic: true}))

  if(!config.discord.ownerID.includes(interaction.user.id)) {
    embed.setTitle('🔒  Nie masz wymaganych uprawnień...')
      .setDescription('**...`WŁAŚCICIEL BOTA`**')
      .setThumbnail(config.cmds.lockedImgs[Math.floor(Math.random() * config.cmds.lockedImgs.length)])
      .setColor('#FFC000')

    await interaction.reply({embeds: [embed], ephemeral: true})
    return
  } 

  await interaction.defer()

  //EVAL
  const code = interaction.options.getString('kod', true)
  let evaled: any
  try {
    evaled = await eval(code)
    
    if (typeof evaled !== 'string') {
      evaled = require('util').inspect(await evaled)
    }
  }
  catch (err) {
    evaled = `\`\`\`js\n${err}\`\`\``
  }
   
  await interaction.editReply({content: evaled})
}

const options = {
  name: 'eval',
  description: '⚠️ TYLKO DLA WŁAŚCICIELA',
  type: 1, 
  options: [
    {
      type: 'STRING',
      name: 'kod',
      description: '🆒 KOD do wykonania',
      required: true
    }
  ]
}

export { execute, options }