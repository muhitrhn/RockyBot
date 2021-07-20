import { MessageEmbed, MessageButton, MessageActionRow, InteractionCollector, ColorResolvable, CommandInteraction } from 'discord.js'
import { client, config } from "../.."

async function execute(this: any, interaction: CommandInteraction) {
  await interaction.defer()

  return this.main(interaction)
}

async function main(this: any, interaction: CommandInteraction, bt: MessageButton, embedColor: ColorResolvable) {
  await interaction.guild?.members.fetch(); await interaction.guild?.emojis.fetch();  await interaction.guild?.channels.fetch()
  
  const embed = new MessageEmbed().setDescription('')
    .setFooter(`🛠️ v${config.version} ┇ ⚡ RockyBot® 2021`, interaction.user.displayAvatarURL({dynamic: true}))
    //@ts-ignore
    .setThumbnail(interaction.guild.iconURL({ dynamic: true }))
    .setTitle(`🖥️  Serwer **${interaction.guild?.name}**`)
    embedColor ? embed.setColor(embedColor) : embed.setColor('RANDOM')
    embed.addField(
      '🔆 <-- Ogólne -->', 

      `📎 ID: **${interaction.guildId}**` + '\n' +
      // @ts-ignore  
      `⛳ Właściciel: **${client.users.cache.get(interaction.guild.ownerId).tag}**` + '\n' +
      //@ts-ignore
      `⏲️ Utworzono (UTC): **${interaction.guild?.createdAt.getUTCHours()}:${(interaction.guild.createdAt.getUTCMinutes()<10?'0':'')+parseInt(interaction.guild.createdAt.getUTCMinutes())}┇${(interaction.guild.createdAt.getUTCDate()<10?'0':'')+parseInt(interaction.guild.createdAt.getUTCDate())}.${((interaction.guild.createdAt.getUTCMonth()+1)<10?'0':'')+parseInt(interaction.guild.createdAt.getUTCMonth()+1)}.${interaction.guild.createdAt.getUTCFullYear()}**` +
      '\u200b'
    )
    .addField(
      `${config.emotes.world} <-- Statystyki -->`,

      `🪃 Roli: **${interaction.guild?.roles.cache.size}**` + '\n' +
      `${config.emotes.cpu} Emoji ogółem: **${interaction.guild?.emojis.cache.size}**` + '\n' +
      `${config.emotes.changelog} Normalnych emoji: **${interaction.guild?.emojis.cache.filter((emoji: any) => !emoji.animated).size}**` + '\n' +
      `${config.emotes.nitro} Animowanych emoji: **${interaction.guild?.emojis.cache.filter((emoji: any) => emoji.animated).size}**` + '\n' +
      `👥 Ludzi: **${interaction.guild?.members.cache.filter((member: any) => !member.user.bot).size}**` + '\n' +
      `🤖 Botów: **${interaction.guild?.members.cache.filter((member: any) => member.user.bot).size}**` + '\n' +
      `✍️ Kanałow tekstowych: **${interaction.guild?.channels.cache.filter((channel: any) => channel.type === 'text').size}**` + '\n' +
      `🔊 Kanałów głosowych: **${interaction.guild?.channels.cache.filter((channel: any) => channel.type === 'voice').size}**` + '\n' +
      `🔰 Boostów: **${interaction.guild?.premiumSubscriptionCount || '0'}**`
    )

  const button = new MessageButton()
    .setStyle('PRIMARY')
    .setEmoji(config.emotes.staff)
    .setLabel('Moderatorzy')
    .setCustomId('moderators')

  const buttonRow = new MessageActionRow().addComponents([button])

  // @ts-ignore
  // eslint-disable-next-line no-empty
  try {await bt.deferUpdate()} catch (err) {}

  const reply = await interaction.editReply({embeds: [embed], components: [buttonRow]})

  //@ts-ignore
  const collector = new InteractionCollector(client, {message: reply, time: 30000, dispose: true})
  collector.on('collect', async buttonClick => {
    if (buttonClick.user.id !== interaction.user.id) {
      const replyEmbed = new MessageEmbed().setColor('RED').setDescription(`**${config.emotes.grverify} Nie wywołałeś tej wiadomości**`).setFooter(`🛠️ v${config.version} ┇ ⚡ RockyBot® 2021 Reply Engine`, // @ts-ignore  
        buttonClick.clicker.user.displayAvatarURL({dynamic: true}))
         
      // @ts-ignore  
      await buttonClick.reply.send({ embeds: [replyEmbed], ephemeral: true })
    } 
    else {
      collector.stop()

      const embedColor = embed.color
      this.modders(interaction, buttonClick, embedColor)
    }
  })
}

async function modders(this: any, interaction: any, bt: MessageButton, embedColor: ColorResolvable) {
  const mods = await interaction.guild.roles.cache.filter((role: any) => role.permissions.has('MANAGE_MESSAGES') && role.members.filter((member: any) => !member.user.bot).array()[0]).map((x: any) => `\n${config.emotes.grverify} **${x}**:\n${x.members.filter((y: any) => !y.user.bot).map((y: any) => config.emotes.yellowDot + ' ' + y.user.tag).join('\n')}`).join('\n')
  
  const embed = new MessageEmbed()
    .setTitle(`${config.emotes.staff} Moderatorzy na serwerze ${interaction.guild.name}`)
    .setThumbnail(interaction.guild.iconURL({ dynamic: true }))
    .setFooter(`🛠️ v${config.version} ┇ ⚡ RockyBot® 2021`, interaction.user.displayAvatarURL({dynamic: true}))
    .setColor(embedColor)
    if (mods[0]) {
      embed.setDescription(`${config.emotes.rverify} *Role z uprawnieniami \`ZARZĄDZANIE WIADOMOŚCIAMI\`*\n\n${mods}`)
    }
    else {
      const mod = interaction.guild.members.cache.filter((member: any) => member.permissions.has('MANAGE_MESSAGES') && !member.user.bot).map((y: any) => config.emotes.yellowDot + ' ' + y.user.tag).join('\n')  
      embed.setDescription(`${config.emotes.rverify} *Użytkownicy z uprawnieniami \`ZARZĄDZANIE WIADOMOŚCIAMI\`*\n\n${mod}`)
    } 

  const button = new MessageButton()
    .setLabel('Wróć')
    .setStyle('SECONDARY')
    .setEmoji(config.emotes.arrl)
    .setCustomId('back')

  const buttonRow = new MessageActionRow().addComponents([button])

  // @ts-ignore
  await bt.deferUpdate()

  const reply = await interaction.editReply({embeds: [embed], components: [buttonRow]})

  const collector = new InteractionCollector(client, {message: reply, time: 30000, dispose: true})
  collector.on('collect', async buttonClick => {
    if (buttonClick.user.id !== interaction.user.id) {
      const replyEmbed = new MessageEmbed().setColor('RED').setDescription(`**${config.emotes.grverify} Nie wywołałeś tej wiadomości**`).setFooter(`🛠️ v${config.version} ┇ ⚡ RockyBot® 2021 Reply Engine`, // @ts-ignore 
        buttonClick.clicker.user.displayAvatarURL({dynamic: true}))
          
      // @ts-ignore  
      await buttonClick.reply.send({ embeds: [replyEmbed], ephemeral: true })
    } 
    else {
      collector.stop()

      const embedColor = embed.color
      this.main(interaction, buttonClick, embedColor)
      return
    }
  })
}

const options = {        
  name: 'guildinfo',
  description: '🚩 Info o serwerze',
  type: 1,
}

export { execute, options }