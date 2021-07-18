import { Client, version } from "discord.js"

import { base } from "../.."

import { MessageEmbed } from 'discord.js'
import DIG from 'discord-image-generation'

async function execute(client: Client, interaction: any) {
  try {
    await interaction.defer()

    const mentioned = interaction.options.map((x: any) => x.options)[0] ? interaction.options.map((x: any) => x.options)[0].map((x: any) => x.user)[0] : interaction.user

    const CreateAv = await new DIG.Delete().getImage(`${mentioned.displayAvatarURL({ dynamic: false, format: 'png' })}?size=4096`)

    const embed = new MessageEmbed()
      .setColor('RANDOM')
      .setFooter(`💡 ${mentioned.tag}\n🛠️ v${version} ┇ ⚡ RockyBot® 2021`, mentioned.displayAvatarURL({dynamic: true}))

    return interaction.editReply({embeds: [embed], files: [CreateAv]})
  }
  catch (err) {
    return base.get('cmd').error(client, interaction, err)
  }
}

const options = {
  name: 'delete',
  description: '❌ Nie lubisz kogoś? To usuń jego lub siebie xD',
  type: 1,
  options: [
      {
        type: 'USER',
        name: 'użytkownik',
        description: '👥 Użytkownik, którego chcesz usunąć',
        required: false
      }
  ]
}

export { execute, options }
