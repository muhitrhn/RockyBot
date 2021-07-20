import { MessageEmbed, MessageButton, MessageActionRow, InteractionCollector, CommandInteraction } from 'discord.js'
import warnModel from '../../../models/warns'
import { client, config } from '../../..'

async function execute(interaction: CommandInteraction) {
  await interaction.defer()

  const mentioned = interaction.options.getUser('użytkownik') ? interaction.guild?.members.fetch(interaction.options.getUser('użytkownik', true)) : interaction.member

	return list(interaction, mentioned, null, null, null)
}
  
async function list(interaction: CommandInteraction, mentioned: any, page: any, bt: any, embedColor: any){
  const embed = new MessageEmbed()
		.setThumbnail(mentioned.user.displayAvatarURL({ dynamic: true }))
		.setFooter(`💡 ${mentioned.user.tag}\n🛠️ v${config.version} ┇ ⚡ RockyBot® 2021`, mentioned.user.displayAvatarURL({dynamic: true}))

	if (!page) page = 1
	let num = (page*5)-4

	const warnDatas = await warnModel.find({ User: mentioned.user.id, GuildID: interaction.guildId })
	if (!warnDatas.length) {
		embed.setTitle(`${config.emotes.grverify}  Użytkownik...`)
			.setDescription(`**...[${mentioned.user.tag}](https://discord.com/users/${mentioned.user.id}) nie posiada warnów**`)
			.setColor('RANDOM')

		return interaction.editReply({embeds: [embed]})
	}

	let maxPage
	if (warnDatas.length <= 5) maxPage = 1
	else maxPage = Math.ceil(warnDatas.length/5)

	let warns: any = [] 
	const warnsPage = warnDatas.slice(5*(page-1), page*5)
	warnsPage.forEach((y: any) => {
		warns.push(`**#${num}**: Moderator${interaction.guild?.members.cache.get(y.ModID) ? `: **[${interaction.guild?.members.cache.get(y.ModID)?.user.tag}` : `o id: **[${y.ModID}`}](https://discord.com/users/${y.ModID})**\n${config.emotes.grverify} Powód: **${y.Reason}**\n||${config.emotes.yellowDot} ID: **${y._id}**||\n\n`)
		num = num + 1
	})  

	const embedDesc = warns.array().join(' ')

	embed.setTitle(`${config.emotes.world}  Lista warnów użytkownika...`)
		.setDescription(`**...[${mentioned.user.tag}](https://discord.com/users/${mentioned.user.id})**\n\n` + embedDesc + `${config.emotes.gearspin} ***Strona*** ***${page}***/***${maxPage}***`)
		embedColor ? embed.setColor(embedColor) : embed.setColor('RANDOM')

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
        
	// eslint-disable-next-line no-empty
	try {await bt.deferUpdate()} catch (err) {}

	if (maxPage === 1) {
		return
	}

  //@ts-ignore
	const collector = new InteractionCollector(client, {message: reply, time: 30000, dispose: true})
  //@ts-ignore
	collector.on('collect', async buttonClick => {
		if (buttonClick.user.id !== interaction.user.id) {
			const replyEmbed = new MessageEmbed().setColor('RED').setDescription(`**${config.emotes.grverify} Nie wywołałeś tej wiadomości**`).setFooter(`🛠️ v${config.version} ┇ ⚡ RockyBot® 2021 Reply Engine`, //@ts-ignore
        buttonClick.clicker.user.displayAvatarURL({dynamic: true}))
          
      //@ts-ignore
			await buttonClick.reply.send({ embeds: [replyEmbed], ephemeral: true })
		} 
    //@ts-ignore
		else if (buttonClick.customId === 'next') {
			collector.stop()
          
			const pageToProv = page + 1
		  return list(interaction, mentioned, pageToProv, buttonClick, embed.color)
		} 
    //@ts-ignore
	  else if (buttonClick.customId === 'back') {
			collector.stop()

			const pageToProv = page - 1
			return list(interaction, mentioned, pageToProv, buttonClick, embed.color)
		}
	})
}

const options = {
  name: 'list',
  description: '🧾 Czyjaś lub Twoja lista ostrzeżeń',
  type: 1,
  options: [
    {
      type: 'USER',
      name: 'użytkownik',
      description: '👥 Użytkownik, którego listę warnów chcesz zobaczyć',
      required: false
    }
  ]
}

export { execute, options }