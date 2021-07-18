import { MessageEmbed, MessageAttachment } from 'discord.js'
import { config } from "../.."
  
async function execute(client: any, interaction: any) {
  await interaction.defer()

  let files: any = []
  const msgs: any = await client.channels.cache.get(config.cmds.attachments.tuskotronic).messages.fetch()
  msgs.forEach((msg: any) => files.push(msg.attachments.array()[0].url))

  const chosenFile = await files[Math.floor(Math.random() * files.length)] 
  const attachment = new MessageAttachment(chosenFile, 'wideo.mp4')

  const embed = new MessageEmbed()
    .setTitle(`${config.emotes.CMDtuskotronic}  Kurczaki, ziemniaki`)
    .setColor('RANDOM')
    .setFooter(`🛠️ v${config.version} ┇ ⚡ RockyBot® 2021`, interaction.user.displayAvatarURL({dynamic: true}))

  await interaction.editReply({embeds: [embed], files: [attachment]})
}

const options = {
  name: 'tuskotronic',
  description: '🥔 Kurczaki, ziemniaki... Kto nie zna tej piosenki? xD',
  type: 1,
}

export { execute, options }