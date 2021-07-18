import { MessageEmbed } from 'discord.js'
import { NotStonk } from 'discord-image-generation'
import { config } from '../..'

async function execute(interaction: any) {
  await interaction.defer()

  const mentioned = interaction.options.map((x: any) => x.options)[0] ? interaction.options.map((x: any) => x.options)[0].map((x: any) => x.user)[0] : interaction.user

  const CreateAv = await new NotStonk().getImage(`${mentioned.displayAvatarURL({ dynamic: false, format: 'png' })}?size=4096`)

  const embed = new MessageEmbed()
    .setColor('RANDOM')
    .setFooter(`💡 ${mentioned.tag}\n🛠️ v${config.version} ┇ ⚡ RockyBot® 2021`, mentioned.displayAvatarURL({dynamic: true}))

  await interaction.editReply({embeds: [embed], files: [CreateAv]})
} 

const options = {
  name: 'notstonks',
  description: '↘️ Nie stonks',
  type: 1,
  options: [
    {
      type: 'USER',
      name: 'użytkownik',
      description: '👥 Użytkownik, którego avatar chcesz przerobić na nie stonks',
      required: false
    }
  ]
}

export = { execute, options }