import { MessageEmbed, MessageAttachment, Client } from 'discord.js'
import { config } from "../.."
  
async function execute(client: Client, interaction: any) {
  await interaction.defer()

  let files: any = []
  // @ts-ignore  
  await client.channels.cache.get(config.cmds.attachments.kamien).messages.fetch().forEach((msg: any) => files.push(msg.attachments.array()[0].url))

  const chosenFile = await files[Math.floor(Math.random() * files.length)] 
  const attachment = new MessageAttachment(chosenFile, 'kamien.png')

  const embed = new MessageEmbed()
    .setTitle(`${config.emotes.CMDkamien}  Kamień xD`)
    .setColor('RANDOM')
    .setFooter(`🛠️ v${config.version} ┇ ⚡ RockyBot® 2021`, interaction.user.displayAvatarURL({dynamic: true}))

  await interaction.editReply({embeds: [embed], files: [attachment]})
}

const options = {        
  name: 'kamień',
  description: '🪨 Wyślij kamień',
  type: 1,
}

export { execute, options }