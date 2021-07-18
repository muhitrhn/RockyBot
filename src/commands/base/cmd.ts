import { MessageEmbed } from 'discord.js'
import { config } from '../..'

async function error(interaction: any, err: any) {
  const errEmbed = new MessageEmbed()
    .setTitle(`${config.emotes.world}  Komenda napotkała problem`)
    .setThumbnail(config.cmds.errorImgs[Math.floor(Math.random() * config.cmds.errorImgs.length)])
    .setDescription('`'+err+'`')
    .setColor('RED')
    .setFooter(`🛠️ v${config.version} ┇ ⚡ RockyBot® 2021 ErrorReport Engine`, interaction.user.displayAvatarURL({dynamic: true}))

    try {
      await interaction.editReply({embeds: [errEmbed], components: []})
    } catch (err) {
      await interaction.channel.send({embeds: [errEmbed], components: []})
    }
} 

export { error }
