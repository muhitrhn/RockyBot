import { MessageEmbed, MessageButton, MessageActionRow, CommandInteraction } from 'discord.js'
import { client, config } from "../.."

async function execute(interaction: CommandInteraction) {
  await interaction.defer()

  let changes: any = []
  
  // @ts-ignore  
  await client.channels.cache.get(config.cmds.ChangesChannel).messages.fetch(1).then(async (msgs: any) => msgs.forEach((msg: any) => changes.push(msg.content)))

  const embed = new MessageEmbed()
    .setFooter(`🛠️ v${config.version} ┇ ⚡ RockyBot® 2021`, interaction.user.displayAvatarURL({dynamic: true}))
    .setColor('RANDOM')
    .setTitle(`${config.emotes.cpu}  Używana wersja: ${config.version}`)
    .setThumbnail(config.cmds.infoImgs.changelog)
    if (changes[0]) embed.addField('🛠️ Aktualne prace:', `${changes[0]}`)

  const button = new MessageButton()
    .setStyle('LINK')
    .setEmoji(config.emotes.changelog_ID)
    .setLabel('CHANGELOG')
    .setURL(config.changelog)

  const buttonRow = new MessageActionRow().addComponents([button])

  await interaction.editReply({embeds: [embed], components: [buttonRow]})
} 

const options = {
  name: 'changelog',
  description: '💡 Wyświetl listę zmian',
  type: 1, 
}

export { execute, options }