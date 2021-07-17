import { Client, MessageEmbed, MessageButton, MessageActionRow, version } from 'discord.js'
import { base, emotes } from '../..'

async function execute(client: Client, interaction: any) {
  try {
    await interaction.defer()

    const mentioned = interaction.options.map((x: any) => x.options)[0] ? interaction.options.map((x: any) => x.options)[0].map((x: any) => x.user)[0] : interaction.user

    const button = new MessageButton()
      .setStyle('LINK')
      .setEmoji(emotes.dwnld_ID)
      .setLabel('MAŁY')
      .setURL(mentioned.displayAvatarURL({dynamic: true}))

    const button2 = new MessageButton()
      .setStyle('LINK')
      .setEmoji(emotes.dwnld_ID)
      .setLabel('DUŻY')
      .setURL(mentioned.displayAvatarURL({dynamic: true})+'?size=4096')

    const actionRow = new MessageActionRow().addComponents([button, button2])

    const embed = new MessageEmbed()
      .setColor('RANDOM')
      .setFooter(`💡 ${mentioned.tag}\n🛠️ v${version} ┇ ⚡ RockyBot® 2021`, mentioned.displayAvatarURL({dynamic: true}))

    return interaction.editReply({embeds: [embed], files: [`${mentioned.displayAvatarURL({ dynamic: true })}?size=4096`], components: [actionRow] })
  }
  catch (err) {
    return base.get('cmd').error(client, interaction, err)
  }
}

const options = {
  name: 'send',
  description: '🖼️ Wyślij czyjś avatar',
  type: 1,
  options: [
      {
        type: 'USER',
        name: 'użytkownik',
        description: '👥 Użytkownik, którego avatar chcesz zobaczyć',
        required: false
      }
  ]
}

export = { execute, options }
