import { MessageEmbed, MessageAttachment, CommandInteraction } from 'discord.js'
import { client, config } from "../.."
  
async function execute(interaction: CommandInteraction) {
  await interaction.defer()

  let files: any = []
  // @ts-ignore  
  await client.channels.cache.get(config.cmds.attachments.stonoga).messages.fetch().then(msgs => msgs.forEach((msg: any) => files.push(msg.attachments.array()[0].url)))

  const chosenFile = await files[Math.floor(Math.random() * files.length)] 
  const attachment = new MessageAttachment(chosenFile, 'wideo.mp4')

  const embed = new MessageEmbed()
    .setTitle(`${config.emotes.CMDstonoga}  Zbyszek!`)
    .setColor('RANDOM')
    .setFooter(`🛠️ v${config.version} ┇ ⚡ RockyBot® 2021`, interaction.user.displayAvatarURL({dynamic: true}))

  await interaction.editReply({embeds: [embed], files: [attachment]})
}

const options = {
  name: 'stonoga',
  description: '🛃 Zbychu Stonoga, kto go nie zna xD',
  type: 1,
}

export { execute, options }