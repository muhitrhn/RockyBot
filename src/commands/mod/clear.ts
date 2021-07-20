import { MessageEmbed, MessageButton, MessageActionRow, InteractionCollector, CommandInteraction } from 'discord.js'
import { client, config } from '../..'

async function execute(interaction: CommandInteraction) {
  const embed = new MessageEmbed()
	  .setColor('RANDOM')
		.setFooter(`🛠️ v${config.version} ┇ ⚡ RockyBot® 2021`, interaction.user.displayAvatarURL({dynamic: true}))

  //@ts-ignore
	if (!interaction.guild?.me?.permissionsIn(interaction.channel).has('MANAGE_MESSAGES')) {
    //PermsCheck: missing bot perms
    embed.setTitle('🔒  Bot nie ma wymaganych uprawnień...').setThumbnail(config.cmds.errorImgs[Math.floor(Math.random() * config.cmds.errorImgs.length)])
      .setDescription(`**...ZARZĄDZANIE WIADOMOŚCIAMI na kanale ${interaction.channel?.toString()}**`)
     .setColor('RED')
    
    await interaction.reply({embeds: [embed], ephemeral: true})
    return
	} 
  //@ts-ignore
	else if (!interaction.member?.permissionsIn(interaction.channel).has('MANAGE_MESSAGES')  && !client.ownerID.includes(interaction.user.id)) {
		embed.setTitle('🔒  Nie masz wymaganych uprawnień...').setThumbnail(config.cmds.lockedImgs[Math.floor(Math.random() * config.cmds.lockedImgs.length)])
      .setDescription(`**...ZARZĄDZANIE WIADOMOŚCIAMI na kanale ${interaction.channel?.toString()}**`)
     .setColor('RED')
    
    await interaction.reply({embeds: [embed], ephemeral: true})
    return
	}
  
  //ArgsCheck
	const amount = interaction.options.getInteger('liczba', true)

	if (amount < 1 || amount > 1000) {
    //Bad amount
		embed.setTitle(`${config.emotes.world}  Podano liczbę wiadomości...`)
			.setThumbnail(config.cmds.errorImgs[Math.floor(Math.random() * config.cmds.errorImgs.length)])
			.setColor('#FFC000')
		  if (amount < 1) {
				embed.setDescription('**...mniejszą od 1**')
			}
			else {
				embed.setDescription('**...większą od 1000**')
			}

		await interaction.reply({embeds: [embed], ephemeral: true})
    return
	}

	await interaction.defer()

	embed.setTitle(`${config.emotes.siren}  Czy na pewno chcesz usunąć...`)
		.setDescription(`**...\`${amount}\` wiadomości?**`)
		.setThumbnail(config.cmds.loadingImgs[Math.floor(Math.random() * config.cmds.loadingImgs.length)])

	const button = new MessageButton()
		.setLabel('TAK')
		.setStyle('DANGER')
		.setEmoji(config.emotes.grverify)
				.setCustomId('delete')

	const button2 = new MessageButton()
		.setLabel('NIE')
		.setStyle('SUCCESS')
		.setEmoji(config.emotes.rverify)
		.setCustomId('cancel')

	const buttonRow = new MessageActionRow().addComponents([button, button2])

	const reply = await interaction.editReply({embeds: [embed], components: [buttonRow]})

  //@ts-ignore
	const collector = new InteractionCollector(client, {message: reply, time: 30000, dispose: true })
	collector.on('collect', async buttonClick => {
		if (buttonClick.user.id !== interaction.user.id) {
			const replyEmbed = new MessageEmbed().setColor('RED').setDescription(`**${config.emotes.grverify} Nie wywołałeś tej wiadomości**`).setFooter(`🛠️ v${config.version} ┇ ⚡ RockyBot® 2021 Reply Engine`, buttonClick.user.displayAvatarURL({dynamic: true}))
          
      //@ts-ignore
			await buttonClick.reply({ embeds: [replyEmbed], ephemeral: true })
		} 
    //@ts-ignore
		else if (buttonClick.customId === 'cancel') {
			collector.stop()
          
		  embed.setTitle(`${config.emotes.rverify}  Anulowano usuwanie...`)
				.setDescription(`**...\`${amount}\` wiadomości**`)
				.setThumbnail(config.cmds.errorImgs[Math.floor(Math.random() * config.cmds.errorImgs.length)])

			await interaction.editReply({embeds: [embed], components: []})
      return
		} 
    //@ts-ignore
		else if (buttonClick.customId === 'delete') {
			collector.stop()
          
			return clear(interaction, reply, embed, amount)
		}
	})
}

async function clear(interaction: CommandInteraction, reply: any, embed: any, amount: any) {
		embed.setTitle(`${config.emotes.winLoad}  Usuwanie wiadomości...`)
			.setDescription('')
			.setThumbnail(config.cmds.moderationImgs.clearInProg[Math.floor(Math.random() * config.cmds.moderationImgs.clearInProg.length)])

	await interaction.editReply({embeds: [embed], components: []})

			//FastDelete
	let deleted = 0, toDelete: any = []
	let deletingCache = amount
	let deleting: any

	for (;deletingCache > 99;) {
		await interaction.channel?.messages.fetch({ limit: 100}).then(msgs => msgs.forEach(msg => toDelete.push(msg)))
		const deletable = toDelete.filter((mssg: any) => mssg.id !== reply.id)

    //@ts-ignore
		deleting = await interaction.channel?.bulkDelete(deletable, true)
		deleted = deleted*1 + deleting.size
		toDelete = []
		deletingCache = deletingCache - deleting.size
		if (deleting.size < 99) {
			break
		}
	}

	if (deletingCache < 100) {
		await interaction.channel?.messages.fetch({ limit: deletingCache + 1 }).then(msgs => msgs.forEach(msg => toDelete.push(msg)))
		const deletable = toDelete.filter((mssg: any) => mssg.id !== reply.id)

    //@ts-ignore
		deleting = await interaction.channel?.bulkDelete(deletable, true)
		deleted = deleted*1 + deleting.size
		toDelete = []
	}

	embed.setTitle(`${config.emotes.trash}  Usunięto \`${deleted}\`/\`${amount}\` wiadomości`)
		.setDescription(`*${config.emotes.gearspin} Wiadomości starsze niż 14 dni nie mogą zostać usunięte*`)
		.setThumbnail(config.cmds.moderationImgs.clear[Math.floor(Math.random() * config.cmds.moderationImgs.clear.length)])

	await interaction.editReply({embeds: [embed]})      
}

const options = {
  name: 'clear',
  description: '🔐♻️ Wyczyść wiadomości',
  type: 1,
  options: [
    {
      type: 'INTEGER',
      name: 'liczba',
      description: '🔢 Liczba między 1 a 1000 (liczba wiadomości do usunięcia)',
      required: true
    }
  ]
}

export { execute, options }