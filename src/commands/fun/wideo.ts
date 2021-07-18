import { MessageEmbed, MessageAttachment, Client } from 'discord.js'
import { config } from "../.."
  
async function execute(client: Client, interaction: any) {
  await interaction.defer()

  let files: any = []
  // @ts-ignore  
  await client.channels.cache.get(config.cmds.attachments.wideo).messages.fetch().forEach((msg: any) => files.push(msg.attachments.array()[0].url))

  const chosenFile = await files[Math.floor(Math.random() * files.length)] 
  const attachment = new MessageAttachment(chosenFile, 'wideo.mp4')

  const embed = new MessageEmbed()
    .setTitle(`${config.emotes.CMDwideo}  Losowe wideo`)
    .setColor('RANDOM')
    .setFooter(`🛠️ v${config.version} ┇ ⚡ RockyBot® 2021`, interaction.user.displayAvatarURL({dynamic: true}))

  await interaction.editReply({embeds: [embed], files: [attachment]})
}

const options = {
  name: 'wideo',
  description: '🎬 Wyślij śmieszne wideo',
  type: 1,
}

export { execute, options }