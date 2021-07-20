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

	const mentioned = await interaction.guild?.members.fetch(interaction.options.getUser('użytkownik', true))
	
  if (!mentioned?.permissions.has('MANAGE_MESSAGES')) {
    embed.setTitle(`${config.emotes.warn}  Użytkownik jest moderatorem...`)
			.setDescription('**...moderatorzy nie mogą być ostrzeżeni**')
			.setThumbnail(config.cmds.errorImgs[Math.floor(Math.random() * config.cmds.errorImgs.length)])
			.setColor('#FFC000')

			await interaction.reply({embeds: [embed], ephemeral: true})
      return
			}

	await interaction.defer()

	const userWarns = await warnModel.find({ GuildID: interaction.guildId, User: mentioned?.id })
	let newData = new warnModel({
		User: mentioned?.id,
		Reason: interaction.options.getString('powód'),
		ModID: interaction.user.id,
		GuildID: interaction.guildId
	})

	let warnID
	await newData.save(async function(o: any, id: any) {
		warnID = id._id

		embed.setTitle(`${config.emotes.staff}  Ostrzeżono użytkownika...`)
			.setDescription(`**...[${mentioned?.user.tag}](https://discord.com/users/${mentioned?.id})**\n${config.emotes.gearspin} Numer ostrzeżenia: **${userWarns?userWarns.length + 1:1}**\n${config.emotes.grverify} Powód: **${interaction.options.getString('powód')}**\n||${config.emotes.yellowDot} ID: **${warnID}**||\n\n${config.emotes.siri} Moderator: ${interaction.user.tag}`)
			.setThumbnail(config.cmds.doneImgs[Math.floor(Math.random() * config.cmds.doneImgs.length)])

    const warnEmbed = new MessageEmbed()
      .setTitle(`${config.emotes.staff}  Otrzymujesz ostrzeżenie...`)
      .setDescription(`**...na kanale ${interaction.channel?.toString()} serwera \`${interaction.guild?.name}\` od moderatora [${interaction.user.tag}](https://discord.com/users/${interaction.user.id})**\n**${config.emotes.yverify} To twoje ${userWarns?userWarns.length + 1:1} ostrzeżenie||, ma ID **${warnID}**||\n**${config.emotes.siri} Powód:** \`\`\`${interaction.options.getString('powód')}\`\`\``)
      .setColor('DARK_RED')
      .setFooter(`🛠️ v${config.version} ┇ ⚡ RockyBot® 2021`, interaction.user.displayAvatarURL({dynamic: true}))

    try {
      //@ts-ignore
      const channel = await client.users.fetch(mentioned?.user.id)
      //@ts-ignore
      await channel.send({content: `<@${mentioned?.user.id}> ostrzeżenie!`,embeds: [warnEmbed]})
    } 
    catch (err) {
      interaction.channel?.send({content: `<@${mentioned?.user.id}> ostrzeżenie!`, embeds: [warnEmbed]})
    }

		await interaction.editReply({embeds: [embed]})
	})
}

const options = {
  name: 'add',
  description: '🔐❗ Ostrzeż kogoś',
  type: 1,
  options: [
    {
      type: 'USER',
      name: 'użytkownik',
      description: '👥 Użytkownik, którego mam ostrzec',
      required: true
    },
    {
      type: 'STRING',
      name: 'powód',
      description: '❔ Powód ostrzeżenia',
      required: true
    }
  ]
}

export { execute, options }