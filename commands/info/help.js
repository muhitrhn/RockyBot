const { MessageEmbed } = require('discord.js')

module.exports = {
  name: 'help',
  aliases: ['h', 'pomoc', 'p', 'ih'],
  description: 'Pomoc dotycząca bota',
  category: 'info',
  utilisation: '{prefix}h <nazwa komendy>',
  async execute(client, message, args, pf, cmd) {
    
    const reaction = await client.base.get('cmd').start(client, message, cmd)

    try {
      const chkCmd = client.commands.get(args.join(' ').toLowerCase()) || client.commands.find(x => x.aliases && x.aliases.includes(args.join(' ').toLowerCase()))
      const emotes = client.emotes

      const embed = new MessageEmbed()
      .setFooter(`💡 ${message.author.tag}\n🛠️ v${client.version} ┇ ⚡ RockyBot® 2021`, message.author.displayAvatarURL({dynamic: true}))
      .setColor('RANDOM')

      if (!chkCmd){
        //No, write list
        embed.setTitle(`${emotes.lightSabers}  Pomoc przybyła`)
        
        const avatar = client.commands.filter(x => x.category == 'avatar').map((x) => '`' + x.name + '`').join(emotes.yellowDot)
        const fun = client.commands.filter(x => x.category == 'fun').map((x) => '`' + x.name + '`').join(emotes.yellowDot)
        const info = client.commands.filter(x => x.category == 'info').map((x) => '`' + x.name + '`').join(emotes.yellowDot)
        const nitro = client.commands.filter(x => x.category == 'nitro').map((x) => '`' + x.name + '`').join(emotes.yellowDot)
        const moderation = client.commands.filter(x => x.category == 'moderation').map((x) => '`' + x.name + '`').join(emotes.yellowDot)
        const options = client.commands.filter(x => x.category == 'options').map((x) => '`' + x.name + '`').join(emotes.yellowDot)
        const ownerOnly = client.commands.filter(x => x.category == 'owner-only').map((x) => '`' + x.name + '`').join(client.emotes.yellowDot)

        embed.addField('🤿  Avatar', avatar)
        .addField('🤣  Fun', fun)
        .addField(`${emotes.ubuntu}  Info`, info)
        .addField(`${emotes.nitro}  Nitro`, nitro)
        if(message.member.hasPermission('MANAGE_MESSAGES')){
          embed.addField(`${emotes.staff}  Moderacja`, moderation)
        }
        if(message.member.hasPermission('MANAGE_GUILD')){
          embed.addField('🛠️  Opcje', options)
        }
        if(client.ownerID.includes(message.author.id)){
          embed.addField(`${emotes.arrr}  OwnerOnly`, ownerOnly)
        }
        embed.setDescription(`${emotes.world}  **${pf}${cmd} <nazwa komendy>** ~ pomoc z konkretną komendą`)
        .setThumbnail(client.cmds.infoImgs.help)

        await reaction.edit({embed: embed})
        return
      } else {
        embed.setTitle(`${client.emotes.lightSabers}  Pomoc dotycząca **${chkCmd.name}**`)
        .addField('🧾 Opis', chkCmd.description, true)
        .addField('📌 Alias(y)', chkCmd.aliases.length < 1 ? '-' : chkCmd.aliases.join(', '), true)
        .addField('🖊️ Użycie', chkCmd.utilisation.replace('{prefix}', pf), true)
        .setDescription(`${emotes.world} Wymagane argumenty: \`[]\`, opcjonalne argumenty: \`<>\`.`)
        .setThumbnail(client.cmds.infoImgs.help)
        await reaction.edit({embed: embed})
        return
      }
    } 
    catch (err) {
      await client.base.get('cmd').error(client, message, pf, cmd, reaction, err)
    }
  }
}