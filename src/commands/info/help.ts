import { Client, MessageEmbed } from 'discord.js'
import { config } from '../..'

async function execute(o: Client, interaction: any) {
  
  const embed = new MessageEmbed()
    .setColor('#FFC000')
    .setFooter(`🛠️ v${config.version} ┇ ⚡ RockyBot® 2021`, interaction.user.displayAvatarURL({dynamic: true}))
    .setTitle(`${config.emotes.google} Komenda w trakcie przebudowy`)
    .setDescription(`${config.emotes.warn} Z powodu wprowadzenia komend z ukosnikiem, całe wnętrze bota zostało przebudowane przez co komenda help nie działa, niedługo zostanie wypuszczona jej nowa wersja\n\n${config.emotes.grverify} **Przydatne informacje:**\nUżyj /[kategoria] [komenda], teraz discord sam podpowie jej nazwę i argumenty`)

  await interaction.reply({embeds: [embed], ephemeral: true})
}

const options = {        
  name: 'help',
  description: '❔ Pomoc z botem',
  type: 1,
}

export { execute, options }