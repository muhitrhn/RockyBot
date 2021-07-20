import { MessageEmbed, MessageButton, MessageActionRow, InteractionCollector, CommandInteraction } from 'discord.js'
import { client, config } from '../..'

async function execute(interaction: CommandInteraction) {

  const embed = new MessageEmbed()
    .setFooter(`🛠️ v${config.version}\n⚡ RockyBot® 2021`, interaction.user.displayAvatarURL({dynamic: true}))

  //@ts-ignore
  if (!interaction.guild.me?.permissions.has('BAN_MEMBERS')) {
		//PermsCheck: missing bot perms
    embed.setTitle('🔒  Bot nie ma wymaganych uprawnień...').setThumbnail(config.cmds.errorImgs[Math.floor(Math.random() * config.cmds.errorImgs.length)])
    .setDescription(`**...BANOWANIE CZŁONKÓW**`)
     .setColor('RED')
    
    await interaction.reply({embeds: [embed], ephemeral: true})
    return
  }
  //@ts-ignore
  else if (!interaction.guild.me?.permissions.has('BAN_MEMBERS') && !client.ownerID.includes(interaction.author.id)) {
    embed.setTitle('🔒  Nie masz wymaganych uprawnień...').setThumbnail(config.cmds.lockedImgs[Math.floor(Math.random() * config.cmds.lockedImgs.length)])
    .setDescription(`**...BANOWANIE CZŁONKÓW**`)
     .setColor('RED')
    
    await interaction.reply({embeds: [embed], ephemeral: true})
    return
  }

  //@ts-ignore
	const mentioned = await interaction.guild?.bans.fetch(interaction.options.getString('id').trim())

  if (!mentioned) {
		embed.setTitle(`${config.emotes.warn}  Nie znalazłem bana...`)
      //@ts-ignore
			.setDescription(`**użytkownika o id ${interaction.guild?.bans.fetch(interaction.options.getString('id')).trim()}...**`)
			.setThumbnail(config.cmds.errorImgs[Math.floor(Math.random() * config.cmds.errorImgs.length)])
			.setColor('#FFC000')
          
		await interaction.reply({embeds: [embed], ephemeral: true})
    return
	}

	embed.setColor('RANDOM')

	await interaction.defer()

	let reason: any, reasonToProvide: string
	if (interaction.options.getString('powód')) {
		reason = interaction.options.getString('powód')
	  reasonToProvide = 'Mod: ' + interaction.user.tag + '┇' + interaction.user.id + ';  Reason: ' + interaction.options.getString('powód')
	} 
  else {
		reason = 0
		reasonToProvide = 'Mod: ' + interaction.user.tag + '┇' + interaction.user.id + ';  Reason not provided' 
	}

	embed.setTitle(`${config.emotes.siren}  Czy na pewno chcesz odbanować...`)
		.setThumbnail(config.cmds.loadingImgs[Math.floor(Math.random() * config.cmds.loadingImgs.length)])
	if (reason === 0) {
		embed.setDescription(`**...użytkownika [${mentioned.user.tag}](https://discord.com/users/${mentioned.user.id}), nie podając powodu?**`)
	}
	else {
		embed.setDescription(`**...użytkownika [${mentioned.user.tag}](https://discord.com/users/${mentioned.user.id}), podając powód**\n\n\`${reason}\`**?**`)
	}

	const button = new MessageButton()
		.setLabel('TAK')
		.setStyle('DANGER')
		.setEmoji(config.emotes.grverify)
		.setCustomId('mute')

	const button2 = new MessageButton()
		.setLabel('NIE')
		.setStyle('SUCCESS')
		.setEmoji(config.emotes.rverify)
		.setCustomId('cancel')

	const buttonRow = new MessageActionRow().addComponents([button, button2])

	const reply = await interaction.editReply({embeds: [embed], components: [buttonRow]})

  //@ts-ignore
  const collector = new InteractionCollector(client, {message: reply, time: 30000, dispose: true})
  //@ts-ignore
	collector.on('collect', async buttonClick => {
    //@ts-ignore
		if (buttonClick.customId === 'cancel') {
			collector.stop()

			embed.setTitle(`${config.emotes.rverify}  Anulowano odbanowanie użytkownika...`)
				.setDescription(`**...[${mentioned.user.tag}](https://discord.com/users/${mentioned.user.id})**`)
				.setThumbnail(config.cmds.errorImgs[Math.floor(Math.random() * config.cmds.errorImgs.length)])
  
		  await interaction.editReply({embeds: [embed], components: []})
      return
		} 
      //@ts-ignore
		else if (buttonClick.customId === 'mute') {

      //@ts-ignore
			await interaction.guild?.bans.remove(interaction.options.getString('id').trim(), reasonToProvide)

			embed.setTitle(`${config.emotes.staff}  Odciszono użytkownika...`)
				.setThumbnail(mentioned.user.displayAvatarURL())
			if (reason === 0) {
				embed.setDescription(`**...[${mentioned.user.tag}](https://discord.com/users/${mentioned.user.id}), nie podając powodu**`)
			}
			else {
			embed.setDescription(`**...[${mentioned.user.tag}](https://discord.com/users/${mentioned.user.id}), podając powód**\n\n\`${reason}\``)
			}

			await interaction.editReply({embeds: [embed], components: []})
		}
  })
}

const options = {
  name: 'unban',
  description: '🔐✅ Odbanuj kogoś',
  type: 1,
  options: [
    {
      type: 'STRING',
      name: 'id',
      description: '🆔 ID użytkownika, którego mam odbanować',
      required: true
    },
    {
      type: 'STRING',
      name: 'powód',
      description: '❔ Powód odbanowania',
      required: false
    }
  ]
}

export = { execute, options }