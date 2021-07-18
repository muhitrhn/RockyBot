import { Client, MessageEmbed } from 'discord.js'
import { config } from '../..'

async function execute(client: Client, interaction: any) {
  await interaction.defer()

  // @ts-ignore 
  const wideo = await client.channels.cache.get(config.cmds.attachments.wideo).messages.fetch() // @ts-ignore  
  const tuskotronic = await client.channels.cache.get(config.cmds.attachments.tuskotronic).messages.fetch() // @ts-ignore  
  const stonoga = await client.channels.cache.get(config.cmds.attachments.stonoga).messages.fetch() // @ts-ignore  
  const kamien = await client.channels.cache.get(config.cmds.attachments.kamien).messages.fetch() // @ts-ignore  
  const budowa = await client.channels.cache.get(config.cmds.attachments.budowa).messages.fetch() // @ts-ignore  
  const rymowanka = await client.channels.cache.get(config.cmds.attachments.rymowanka).messages.fetch()

  const embed = new MessageEmbed()
    .setTitle(`${config.emotes.staff}  Dostępne zasoby`)
    .setColor('RANDOM')
    .setFooter(`🛠️ v${config.version} ┇ ⚡ RockyBot® 2021`, interaction.user.displayAvatarURL({dynamic: true}))
    .setThumbnail(config.cmds.infoImgs.storage)
    .addField('** **', '** **')
    .addField(`🎬  Komenda wideo: \`${wideo.size}\``, '** **')
    .addField(`🎃  Komenda tuskotronic: \`${tuskotronic.size}\``, '** **')
    .addField(`😎  Komenda stonoga: \`${stonoga.size}\``, '** **')
    .addField(`:rock:  Komenda kamien: \`${kamien.size}\``, '** **')
    .addField(`🏗️  Komenda budowa: \`${budowa.size}\``, '** **')
    .addField(`📲  Komenda rymowanka: \`${rymowanka.size}\``, '** **')
    .addField('🎈  Komenda meme: `Powered by reddit.com`', '** **')
    .addField(`✨  Wszystkich wiadomości z których korzysta bot: \`${wideo.size + tuskotronic.size + stonoga.size + kamien.size + budowa.size + rymowanka.size}\``, '** **')
       
  await interaction.editReply({embeds: [embed]})
} 

const options = {
  name: 'storage',
  description: '📪 Info o ilosci dostepnych zasobow do komend',
  type: 1,
}

export { execute, options }