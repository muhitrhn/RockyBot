import { MessageEmbed, MessageButton, MessageActionRow, InteractionCollector,  CommandInteraction } from 'discord.js'
import { client, queue, config } from '../../..'

async function execute(interaction: CommandInteraction) {
  const serverQueue = queue.get(interaction.guildId)
  const embed = new MessageEmbed()
    .setColor('RANDOM')
    .setFooter(`🛠️ v${config.version} ┇ ⚡ RockyBot® 2021`, interaction.user.displayAvatarURL({dynamic: true}))

  //@ts-ignore
  if (!interaction.member.voice.channel) {
    embed.setTitle(`${config.emotes.world}  Nie jesteś na kanale głosowym`)
      .setThumbnail(config.cmds.errorImgs[Math.floor(Math.random() * config.cmds.errorImgs.length)])
      .setColor('#FFC000')

    await interaction.reply({embeds: [embed], ephemeral: true})
    return
  }
      
  if (!serverQueue) {
    embed.setTitle(`${config.emotes.world}  Nie gram na tym kanale`)
      .setThumbnail(config.cmds.errorImgs[Math.floor(Math.random() * config.cmds.errorImgs.length)])
      .setColor('#FFC000')

    await interaction.reply({embeds: [embed], ephemeral: true})
    return
  }
    
  await interaction.defer()

  await list(interaction, null, null, null, null)
}

async function list(interaction: CommandInteraction, page: any, bt: any, embedColor: any, embedThumbnail: any){

  if (!page) page = 1
  let num = (page*5)-4

  const nowPlay = await queue.get(interaction.guildId).songs[0]
  const thisQueue = await queue.get(interaction.guildId).songs.slice(1)

  let maxPage
  if (thisQueue.length <= 5) maxPage = 1
  else maxPage = Math.ceil(thisQueue.length/5)

  let songs: any = [] 
  const songsPage = thisQueue.slice(5*(page-1), page*5)
  for (const y of songsPage) {
    songs.push(`**${config.emotes.yellowDot} ${num}**: ${y.title}┇*${y.length}*\n\n`)
    num = num + 1
  }

  const embedDesc = songs.map((x: any) => x).join(' ')
  
  const embed = new MessageEmbed()
    .setTitle(`${config.emotes.grverify}  Kolejka...`)
    .setDescription(`**...kanału ${queue.get(interaction.guildId).voiceChannel}**\n\n🔁 Powtarzanie kolejki: ${queue.get(interaction.guildId).repeatMode === 'queue' ? config.emotes.grverify : config.emotes.rverify}\n🔂 Powtarzanie utworu: ${queue.get(interaction.guildId).repeatMode === 'track' ? config.emotes.grverify : config.emotes.rverify}\n\n${config.emotes.boombox} Teraz gram: **${nowPlay.title}**┇***${nowPlay.length}***\n\n` + embedDesc + `${config.emotes.gearspin} ***Strona*** ***${page}***/***${maxPage}***`)
    .setFooter(`💡 Utworów w kolejce: ${thisQueue.length + 1}\n🛠️ v${config.version} ┇ ⚡ RockyBot® 2021`, interaction.user.displayAvatarURL({dynamic: true}))
    embedColor ? embed.setColor(embedColor) : embed.setColor('RANDOM')
    embedThumbnail ? embed.setThumbnail(embedThumbnail) : embed.setThumbnail(config.cmds.musicImgs.queue[Math.floor(Math.random() * config.cmds.musicImgs.queue.length)])

  const button = new MessageButton()
    .setLabel('')
    .setEmoji(config.emotes.arrl)
    .setCustomId('back')
    if (page === 1) {
      button.setStyle('SECONDARY')
        .setDisabled(true)
    } 
    else {
      button.setStyle('PRIMARY')
    }

  const button2 = new MessageButton()
    .setLabel('')
    .setEmoji(config.emotes.arrr)
    .setCustomId('next')
    if (maxPage - page === 0) {
      button2.setStyle('SECONDARY')
        .setDisabled(true)
    } 
    else {
      button2.setStyle('PRIMARY')
    }

  const buttonRow = new MessageActionRow().addComponents([button, button2])

  const reply = await interaction.editReply({ embeds: [embed], components: [buttonRow] })
        
  // @ts-ignore
  // eslint-disable-next-line no-empty
  try {await bt.deferUpdate()} catch (err) {}

  if (maxPage === 1) {
    return
  }

  //@ts-ignore
  const collector = new InteractionCollector(client, {message: reply, time: 30000, dispose: true})
  collector.on('collect', async buttonClick => {
    if (buttonClick.user.id !== interaction.user.id) {
      const replyEmbed = new MessageEmbed().setColor('RED').setDescription(`**${config.emotes.grverify} Nie wywołałeś tej wiadomości**`).setFooter(`🛠️ v${config.version} ┇ ⚡ RockyBot® 2021 Reply Engine`, //@ts-ignore
        buttonClick.clicker.user.displayAvatarURL({dynamic: true}))
          
      // @ts-ignore
      await buttonClick.reply.send({ embeds: [replyEmbed], ephemeral: true })
    } 
    // @ts-ignore
    else if (buttonClick.customId === 'next') {
      collector.stop()
          
      const pageToProv = page + 1
      return list(interaction, pageToProv, buttonClick, embed.color, // @ts-ignore
        embed.thumbnail.url)
    } 
    // @ts-ignore
    else if (buttonClick.customId === 'back') {
      collector.stop()

      const pageToProv = page - 1
      return list(interaction, pageToProv, buttonClick, embed.color,      // @ts-ignore
        embed.thumbnail.url)
    }
  }) 
}

const options = {
  name: 'view',
  description: '🔢 Wyświetl kolejkę odtwarzania',
  type: 1
}

export { execute, options }