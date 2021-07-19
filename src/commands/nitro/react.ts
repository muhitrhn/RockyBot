import { MessageEmbed } from 'discord.js'
import { client, config } from "../.."

async function execute(interaction: any) {
  const embed = new MessageEmbed()
    .setColor('RANDOM')
    .setFooter(`🛠️ v${config.version} ┇ ⚡ RockyBot® 2021`, interaction.user.displayAvatarURL({dynamic: true}))

  const msgNumber = interaction.options.map((x: any) => x.options)[0].map((x: any) => x.value)[0]
  const emoji = client.emojis.cache.find((emojii: any) => emojii.name.toLowerCase().includes(interaction.options.map((x: any) => x.options)[0].map((x: any) => x.value)[1].toLowerCase()))

  if (msgNumber < 1 || msgNumber > 40) {
    //Bad amount
    embed.setTitle(`${config.emotes.world}  Podano numer wiadomości...`)
      .setThumbnail(config.cmds.errorImgs[Math.floor(Math.random() * config.cmds.errorImgs.length)])
      .setColor('#FFC000')
      if (msgNumber < 1) {
        embed.setDescription('**...mniejszy od 1**')
      }
      else {
        embed.setDescription('**...większy od 40**')
      }

      await interaction.reply({embeds: [embed], ephemeral: true})
      return
  }

  if(!emoji) {
    embed.setTitle(`${config.emotes.world}  Nie znaleziono emoji`)
      .setThumbnail(config.cmds.errorImgs[Math.floor(Math.random() * config.cmds.errorImgs.length)])
      .setColor('#FFC000')

    await interaction.reply({embeds: [embed], ephemeral: true})
    return
  }

  await interaction.defer()

  const msg = await interaction.channel.messages.fetch(msgNumber + 1)
  let mess: any = []
  await msg.forEach((mssg: any) => mess.push(mssg))

  mess[parseInt(msgNumber)].react(emoji)

  //READY
  embed.setTitle(`${config.emotes.nitro} Zareagowano na wiadomość...`)
    .setDescription(`**...o id\`${mess[parseInt(msgNumber) + 1].id}\` za pomocą emoji o nazwie \`${emoji.name}\`**`)
    .setThumbnail(config.cmds.doneImgs[Math.floor(Math.random() * config.cmds.doneImgs.length)])

  await interaction.editReply({embeds: [embed]})
}

const options = {
  name: 'react',
  description: '📤 Zareaguj na wiadomość',
  type: 1,
  options: [
    {
      type: 'INTEGER',
      name: 'numer',
      description: '🔢 Numer wiadomości, NIE WIĘKSZY NIŻ 40, licząc od dołu',
      required: true
    },
    {
      type: 'STRING',
      name: 'nazwa',
      description: '📛 Nazwa lub część nazwy emoji, którego mam użyć',
      required: true
    }
  ]
}

export { execute, options }