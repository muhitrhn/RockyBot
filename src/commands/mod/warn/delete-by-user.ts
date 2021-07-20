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

	await interaction.defer()

	const mentioned = interaction.options.getUser('użytkownik')

	await warnModel.deleteMany({ GuildID: interaction.guildId, User: mentioned?.id })

	embed.setTitle(`${config.emotes.staff}  Usunięto wszystkie warny...`)
		.setDescription(`**...użytkownika [${mentioned?.tag}](https://discord.com/users/${mentioned?.id})**`)
		.setThumbnail(config.cmds.doneImgs[Math.floor(Math.random() * config.cmds.doneImgs.length)])

  await interaction.editReply({embeds: [embed]})      
  return
}

const options = {
  name: 'delete-by-user',
  description: '🔐♻️ Wyczyść czyjeś ostrzeżenia',
  type: 1,
  options: [
    {
      type: 'USER',
      name: 'użytkownik',
      description: '👥 Użytkownik, którego listę warnów chcesz wyczyścić',
      required: true
    }
  ]
}

export { execute, options }