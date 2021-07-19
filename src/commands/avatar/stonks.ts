import { CommandInteraction, MessageEmbed } from 'discord.js'
import { Stonk } from 'discord-image-generation'
import { config } from "../.."

async function execute(interaction: CommandInteraction) {
  await interaction.defer()

  const mentioned = interaction.options.getUser('użytkownik') ? interaction.options.getUser('użytkownik', true) : interaction.user

  const CreateAv = await new Stonk().getImage(`${mentioned.displayAvatarURL({ dynamic: false, format: 'png' })}?size=4096`)
      
  const embed = new MessageEmbed()
    .setColor('RANDOM')
    .setFooter(`💡 ${mentioned.tag}\n🛠️ v${config.version} ┇ ⚡ RockyBot® 2021`, mentioned.displayAvatarURL({dynamic: true}))

  await interaction.editReply({embeds: [embed], files: [CreateAv]})
}

const options = {
  name: 'stonks',
  description: '↗️ Stonks!',
  type: 1,
  options: [
    {
      type: 'USER',
      name: 'użytkownik',
      description: '👥 Użytkownik, którego avatar chcesz przerobić na stonks',
      required: false
    }
  ]
}

export { execute, options }