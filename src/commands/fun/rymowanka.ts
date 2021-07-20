import { CommandInteraction, MessageEmbed } from 'discord.js'
import {client, config } from "../.."
  
async function execute(interaction: CommandInteraction) {
  await interaction.defer()

  let texts: any = []
  // @ts-ignore  
  await client.channels.cache.get(config.cmds.attachments.rymowanka).messages.fetch().then(msgs => msgs.forEach((msg: any) => texts.push(msg.content)))

  const text = await texts[Math.floor(Math.random() * texts.length)] 

  const embed = new MessageEmbed()
    .setTitle(text)
    .setColor('RANDOM')
    .setThumbnail(config.cmds.funImgs.rymowanka)
    .setFooter(`🛠️ v${config.version} ┇ ⚡ RockyBot® 2021`, interaction.user.displayAvatarURL({dynamic: true}))

  await interaction.editReply({embeds: [embed]})
}

const options = {
  name: 'rymowanka',
  description: '🔡 Wyślij losową rymowankę',
  type: 1,
}

export { execute, options }