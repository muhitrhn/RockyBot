import { CommandInteraction, MessageEmbed } from 'discord.js'
import warnModel from '../../../models/warns'
import { client, config } from '../../..'

async function execute(interaction: CommandInteraction) {
  const embed = new MessageEmbed()
	  .setColor('RANDOM')
		.setFooter(`🛠️ v${config.version} ┇ ⚡ RockyBot® 2021`, interaction.user.displayAvatarURL({dynamic: true}))

  //@ts-ignore
	if (!interaction.member?.permissionsIn(interaction.channel).has('MANAGE_MESSAGES')  && !client.ownerID.includes(interaction.user.id)) {
		embed.setTitle('🔒  Nie masz wymaganych uprawnień...').setThumbnail(config.cmds.lockedImgs[Math.floor(Math.random() * config.cmds.lockedImgs.length)])
      .setDescription(`**...ZARZĄDZANIE WIADOMOŚCIAMI na kanale ${interaction.channel?.toString()}**`)
     .setColor('RED')
    
    await interaction.reply({embeds: [embed], ephemeral: true})
    return
	}
      
	let warn
	try {
		warn = await warnModel.findOne({ GuildID: interaction.guildId, _id: interaction.options.getString('id')})
	} 
  catch (err) {
		warn = 0
	}
  
  if(!warn) {
		embed.setTitle(`${config.emotes.grverify}  Na tym serwerze nie znaleziono warna...`)
			.setDescription(`**...o ID ${interaction.options.getString('id')}**`)
			.setColor('RANDOM')
			.setThumbnail(config.cmds.errorImgs[Math.floor(Math.random() * config.cmds.errorImgs.length)])

		await interaction.reply({embeds: [embed], ephemeral: true})
    return
	}

	await interaction.defer()

	await warnModel.findOneAndRemove({ GuildID: interaction.guildId, _id: interaction.options.getString('id')})

	embed.setTitle(`${config.emotes.staff}  Usunięto warna...`)
		.setDescription(`**...użytkownika${interaction.guild?.members.cache.get(warn.User) ? ` [${interaction.guild?.members.cache.get(warn.User)?.user.tag}` : `o id [${warn.User}`}](https://discord.com/users/${warn.User})** z powodem **${warn.Reason}**\n\n*Aby usunąć wszystkie warny użytkownika, użyj \`/mod warn delete-by-user\`*`)
		.setThumbnail(config.cmds.doneImgs[Math.floor(Math.random() * config.cmds.doneImgs.length)])

	await interaction.editReply({embeds: [embed]})      
}

const options = {
  name: 'delete-by-id',
  description: '🔐♻️ Usuń ostrzeżenie',
  type: 1,
  options: [
    {
      type: 'STRING',
      name: 'id',
      description: '🆔 ID warna',
      required: true
    }
  ]
}

export { execute, options }