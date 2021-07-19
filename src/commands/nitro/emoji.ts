import { CommandInteraction, MessageEmbed } from 'discord.js'
import { client, config } from "../.."

async function execute(interaction: CommandInteraction) {
  
  const embed = new MessageEmbed()
    .setColor('RANDOM')
    .setFooter(`🛠️ v${config.version} ┇ ⚡ RockyBot® 2021`, interaction.user.displayAvatarURL({dynamic: true}))

  let emoji = client.emojis.cache.find((emojii: any) => emojii.name.toLowerCase().includes(interaction.options.getString('nazwa', true).toLowerCase()))
  
  if (!emoji) {
    embed.setTitle(`${config.emotes.world}  Nie znaleziono emoji o nazwie \`${interaction.options.getString('nazwa', true).toLowerCase()}\``)
      .setThumbnail(config.cmds.errorImgs[Math.floor(Math.random() * config.cmds.errorImgs.length)])
      .setColor('#FFC000')

    await interaction.reply({embeds: [embed], ephemeral: true})
    return
  }

  await interaction.defer()

  //WebhksChk
  // @ts-ignore
  const webhooks = await interaction.channel.fetchWebhooks()
  // @ts-ignore
  const myWebhooks = await webhooks.filter((wbhk: any) => wbhk.owner.id === client.user.id)
  let webhksCheck: any
  if (!myWebhooks.first()) {
    webhksCheck = 0
  }
  else {
    webhksCheck = 1
  }

  let webhook
  if (webhksCheck === 0) {
    //Create webhook
    // @ts-ignore
    webhook = await interaction.channel.createWebhook(interaction.user.username, { avatar: interaction.user.displayAvatarURL() })
  }
  else {
    //Edit webhook
    webhook = await myWebhooks.first().edit({
      name: interaction.user.username,
      avatar: interaction.user.displayAvatarURL()
    })
  }

  await webhook.send(emoji.toString())

  embed.setTitle(`${config.emotes.nitro} Wysłano emoji...`)
    .setDescription(`**...o nazwie \`${emoji.name}\`**`)
    .setThumbnail(config.cmds.doneImgs[Math.floor(Math.random() * config.cmds.doneImgs.length)])

  await interaction.editReply({embeds: [embed]})
}

const options = {
  name: 'emoji',
  description: '💬 Wyślij customowe emoji',
  type: 1, 
  options: [
    {
      type: 'STRING',
      name: 'nazwa',
      description: '📛 Część lub cała nazwa emoji, które mam wysłać',
      required: true
    }
  ]
}

export { execute, options }