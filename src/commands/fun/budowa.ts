import { MessageEmbed, MessageAttachment } from 'discord.js'
import { config } from "../.."
  
async function execute(client: any, interaction: any) {
  await interaction.defer()

  let files: any = []
  const msgs: any = await client.channels.cache.get(config.cmds.attachments.budowa).messages.fetch()
  msgs.forEach((msg: any) => files.push(msg.attachments.array()[0].url))

  const chosenFile = await files[Math.floor(Math.random() * files.length)] 
  const attachment = new MessageAttachment(chosenFile, 'wideo.mp4')

  const embed = new MessageEmbed()
    .setTitle(`${config.emotes.CMDbudowa}  Budowa!`)
    .setColor('RANDOM')
    .setFooter(`🛠️ v${config.version} ┇ ⚡ RockyBot® 2021`, interaction.user.displayAvatarURL({dynamic: true}))

  await interaction.editReply({embeds: [embed], files: [attachment]})
}

const options = {
  name: 'budowa',
  description: '🏗️ Budowa! BUDOWA!',
  type: 1, 
}

export { execute, options }