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

  await interaction.guild?.members.fetch()
  //@ts-ignore
	const mentioned = interaction.guild?.members.cache.get(interaction.options.getUser('użytkownik').id)

  if (!mentioned?.bannable || mentioned?.permissions.has('MANAGE_MESSAGES')) {
    embed.setTitle(`${config.emotes.warn}  Użytkownik nie może być zbanowany...`)
      .setDescription('**..., ma on uprawnienie ZARZĄDZANIE WIADOMOŚCIAMI lub mam za niską rolę**')
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

	embed.setTitle(`${config.emotes.siren}  Czy na pewno chcesz zbanować...`)
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

			embed.setTitle(`${config.emotes.rverify}  Anulowano banowanie użytkownika...`)
				.setDescription(`**...[${mentioned.user.tag}](https://discord.com/users/${mentioned.user.id})**`)
				.setThumbnail(config.cmds.errorImgs[Math.floor(Math.random() * config.cmds.errorImgs.length)])
  
		  await interaction.editReply({embeds: [embed], components: []})
      return
		} 
      //@ts-ignore
		else if (buttonClick.customId === 'mute') {
	
      //@ts-ignore
			await mentioned.kick(reasonToProvide)
			
			embed.setTitle(`${config.emotes.staff}  Zbanowano użytkownika...`)
        .setThumbnail(mentioned.user.displayAvatarURL())
				.setImage(config.cmds.moderationImgs.ban[Math.floor(Math.random() * config.cmds.moderationImgs.ban.length)])
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
  name: 'ban',
  description: '🔐🚷 Zbanuj oznaczonego użytkownika',
  type: 1, 
  options: [
    {
      type: 'USER',
      name: 'użytkownik',
      description: '👥 Użytkownik, którego mam zbanować',
      required: true
    },
    {
      type: 'STRING',
      name: 'powód',
      description: '❔ Powód bana',
      required: false
    }
  ]
}

export { execute, options }