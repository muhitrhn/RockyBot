import { MessageEmbed } from 'discord.js'
import { config } from "../.."
  
async function execute(client: any, interaction: any) {
  await interaction.defer()

  let texts: any = []
  const msgs: any = await client.channels.cache.get(config.cmds.attachments.rymowanka).messages.fetch()
  msgs.forEach((msg: any) => texts.push(msg.attachments.array()[0].url))

  const text = await texts[Math.floor(Math.random() * texts.length)] 

  const embed = new MessageEmbed()
    .setTitle(text)
    .setColor('RANDOM')
    .setFooter(`🛠️ v${config.version} ┇ ⚡ RockyBot® 2021`, interaction.user.displayAvatarURL({dynamic: true}))

  await interaction.editReply({embeds: [embed]})
}

const options = {
  name: 'rymowanka',
  description: '🔡 Wyślij losową rymowankę',
  type: 1,
}

export { execute, options }