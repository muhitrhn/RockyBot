import { Client, MessageEmbed, MessageAttachment, version } from "discord.js"
import { Triggered } from 'discord-image-generation'
import { base } from "../.."

async function execute(client: Client, interaction: any) {
  try {
    await interaction.defer()

    const mentioned = interaction.options.map((x: any) => x.options)[0] ? interaction.options.map((x: any) => x.options)[0].map((x: any) => x.user)[0] : interaction.user

    const CreateAv = await new Triggered().getImage(`${mentioned.displayAvatarURL({ dynamic: false, format: 'png' })}?size=4096`)
    const attachment = new MessageAttachment(CreateAv, 'triggered.gif')

    const embed = new MessageEmbed()
      .setColor('RANDOM')
      .setFooter(`💡 ${mentioned.tag}\n🛠️ v${version} ┇ ⚡ RockyBot® 2021`, mentioned.displayAvatarURL({dynamic: true}))

    return interaction.editReply({embeds: [embed], files: [attachment]})
  }

  catch (err) {
    return base.get('cmd').error(client, interaction, err)
  }
}

const options = {
  name: 'trigger',
  description: '🤬 Wkurz siebie lub kogoś xD',
  type: 1,
  options: [
    {
      type: 'USER',
      name: 'użytkownik',
      description: '👥 Użytkownik, którego chcesz wkurzyć',
      required: false
    }
  ]
}

export { execute, options }
