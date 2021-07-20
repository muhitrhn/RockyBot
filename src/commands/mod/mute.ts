import { MessageEmbed, MessageButton, MessageActionRow, InteractionCollector, CommandInteraction } from 'discord.js'
import { client, config } from '../..'
import mutedSchema from '../../models/settings'

async function execute(interaction: CommandInteraction) {

  const embed = new MessageEmbed()
    .setFooter(`🛠️ v${config.version}\n⚡ RockyBot® 2021`, interaction.user.displayAvatarURL({dynamic: true}))

  //@ts-ignore
  if (!interaction.guild.me.permissionsIn(interaction.channel).has('MANAGE_ROLES')) {
		//PermsCheck: missing bot perms
    embed.setTitle('🔒  Bot nie ma wymaganych uprawnień...').setThumbnail(config.cmds.errorImgs[Math.floor(Math.random() * config.cmds.errorImgs.length)])
    .setDescription(`**...ZARZĄDZANIE ROLAMI**`)
     .setColor('RED')
    
    await interaction.reply({embeds: [embed], ephemeral: true})
    return
  }
  //@ts-ignore
  else if (!interaction.member.permissionsIn(interaction.channel).has('MANAGE_MESSAGES')  && !client.ownerID.includes(interaction.author.id)) {
    embed.setTitle('🔒  Nie masz wymaganych uprawnień...').setThumbnail(config.cmds.lockedImgs[Math.floor(Math.random() * config.cmds.lockedImgs.length)])
    .setDescription(`**...ZARZĄDZANIE WIADOMOŚCIAMI**`)
     .setColor('RED')
    
    await interaction.reply({embeds: [embed], ephemeral: true})
    return
  }

  await interaction.guild?.members.fetch()
  //@ts-ignore
	const mentioned = interaction.guild?.members.cache.get(interaction.options.getUser('użytkownik').id)

	embed.setColor('RANDOM')

	if (!mentioned?.manageable || mentioned.permissions.has('MANAGE_MESSAGES')) {
		embed.setTitle(`${config.emotes.warn}  Użytkownik nie może być wyciszony...`)
      .setDescription('**..., ma on uprawnienie ZARZĄDZANIE WIADOMOŚCIAMI lub mam za niską rolę**')
      .setThumbnail(config.cmds.errorImgs[Math.floor(Math.random() * config.cmds.errorImgs.length)])
      .setColor('#FFC000')

		await interaction.reply({embeds: [embed], ephemeral: true})
    return
	}

	const data = await mutedSchema.findOne({
		GuildID: interaction.guildId
	})

	let role: any
	if(data){
		await interaction.guild?.roles.fetch()
		role = interaction.guild?.roles.cache.get(data.MutedRole)
	} 

	if(!role) {
		embed.setTitle(`${config.emotes.warn}  Ten serwer nie ma ustawionej...`)
			.setDescription('**...roli wyciszenia, użyj `/settings mutedrole` jeśli masz uprawnienie \'ZARZĄDZANIE SERWEREM\', aby ustawić rolę**')
			.setThumbnail(config.cmds.errorImgs[Math.floor(Math.random() * config.cmds.errorImgs.length)])
			.setColor('#FFC000')

	  await interaction.reply({embeds: [embed], ephemeral: true})
    return
	}

	if (mentioned.roles.cache.some(role => role.id === data.MutedRole)) {
		embed.setTitle(`${config.emotes.warn}  Użytkownik jest wyciszony,...`)
			.setDescription('**...użyj `/mod mute` aby go odciszyć**')
			.setThumbnail(config.cmds.errorImgs[Math.floor(Math.random() * config.cmds.errorImgs.length)])
			.setColor('#FFC000')
          
		await interaction.reply({embeds: [embed], ephemeral: true})
    return
	}

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

	embed.setTitle(`${config.emotes.siren}  Czy na pewno chcesz wyciszyć...`)
		.setThumbnail(config.cmds.loadingImgs[Math.floor(Math.random() * config.cmds.loadingImgs.length)])
	if (reason === 0) {
		embed.setDescription(`**...użytkownika [${mentioned.user.tag}](https://discord.com/users/${mentioned.id}), nie podając powodu?**`)
	}
	else {
		embed.setDescription(`**...użytkownika [${mentioned.user.tag}](https://discord.com/users/${mentioned.id}), podając powód**\n\n\`${reason}\`**?**`)
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

			embed.setTitle(`${config.emotes.rverify}  Anulowano wyciszanie użytkownika...`)
				.setDescription(`**...[${mentioned.user.tag}](https://discord.com/users/${mentioned.id})**`)
				.setThumbnail(config.cmds.errorImgs[Math.floor(Math.random() * config.cmds.errorImgs.length)])
  
		  await interaction.editReply({embeds: [embed], components: []})
      return
		} 
      //@ts-ignore
		else if (buttonClick.customId === 'mute') {
			try {
				await mentioned.roles.add(role, reasonToProvide)
			} 
			catch (err) {
				embed.setTitle(`${config.emotes.warn}  Nie mogę wyciszyć użytkownika...`)
					.setDescription(`**...[${mentioned.user.tag}](https://discord.com/users/${mentioned.id}), rola wyciszenia jest wyższa od mojej, jeśli masz odpowiednie uprawnienia, przestaw w ustawieniach moją rolę ponad rolę wyciszenia**`)
					.setThumbnail(config.cmds.errorImgs[Math.floor(Math.random() * config.cmds.errorImgs.length)])
					.setColor('#FFC000')
				return interaction.editReply({embeds: [embed], components: []})
			}

			embed.setTitle(`${config.emotes.staff}  Wyciszono użytkownika...`)
				.setThumbnail(mentioned.user.displayAvatarURL())
			if (reason === 0) {
				embed.setDescription(`**...[${mentioned.user.tag}](https://discord.com/users/${mentioned.id}), nie podając powodu**`)
			}
			else {
			embed.setDescription(`**...[${mentioned.user.tag}](https://discord.com/users/${mentioned.id}), podając powód**\n\n\`${reason}\``)
			}

			await interaction.editReply({embeds: [embed], components: []})
		}
  })
}

const options = {
  name: 'mute',
  description: '🔐🔇 Wycisz oznaczonego użytkownika',
  type: 1,
  options: [
    {
      type: 'USER',
      name: 'użytkownik',
      description: '👥 Użytkownik, którego mam wyciszyć',
      required: true
    },
    {
      type: 'STRING',
      name: 'powód',
      description: '❔ Powód wyciszenia',
      required: false
    }
  ]
}

export { execute, options }