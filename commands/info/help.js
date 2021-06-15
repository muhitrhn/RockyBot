const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "help",
  aliases: ['h', 'pomoc', 'p', 'ih'],
  description: "Pomoc dotycząca bota",
  category: 'info',
  utilisation: '{prefix}h <nazwa komendy>',

  async execute(client, message, args, pf, cmd) {
    
    //Start; 1/5
    const reactionEmbed = new MessageEmbed()
    .setTitle(`${client.emotes.winLoad} Praca w toku... 1/1`)
    .setDescription(`${client.emotes.arrr} Sprawdzanie argumentów...`)
    .setThumbnail(`https://cdn.discordapp.com/attachments/850848194929492009/852901674997252106/1275442.png`)
    .setFooter(`💡 ${message.author.tag}\n🛠️ v${client.version} ┇ ⚡ RockyBot® 2021`, message.author.avatarURL({dynamic: true}))
    .setColor(`BLUE`)
    
    const reaction = await message.lineReplyNoMention(reactionEmbed)

    try {
      const errEmbed = new MessageEmbed()
      .setTitle(`${client.emotes.warn}  Wystąpił problem z komendą \`${pf}${cmd}\``)
      .setThumbnail(`https://cdn.discordapp.com/attachments/852928154691567669/852928290045427733/753345.png`)
      .setColor('RED')
      .setFooter(`💡 ${message.author.tag}\n🛠️ v${client.version} ┇ ⚡ RockyBot® 2021`, message.author.avatarURL({dynamic: true}));    
      const emotes = client.emotes

      //Check if cmd exists
      let chkCmd
      try {
        chkCmd = client.commands.get(args.join(" ").toLowerCase()) || client.commands.find(x => x.aliases && x.aliases.includes(args.join(" ").toLowerCase()));
      } catch (err) {
        errEmbed.setDescription(`${client.emotes.x} Sprawdzanie argumentów`)
        reaction.edit(errEmbed)
        return;
      }

      const embed = new MessageEmbed()
      .setFooter(`💡 ${message.author.tag}\n🛠️ v${client.version} ┇ ⚡ RockyBot® 2021`, message.author.avatarURL({dynamic: true}))
      .setColor('RANDOM')
      if (!chkCmd){
        //No, write list
        embed.setTitle(`${emotes.lightSabers}  Pomoc przybyła`)
        
        const avatar = client.commands.filter(x => x.category == 'avatar').map((x) => `\`` + x.name + '`').join(emotes.yellowDot);
        const beka = client.commands.filter(x => x.category == 'beka').map((x) => `\`` + x.name + '`').join(emotes.yellowDot);
        const info = client.commands.filter(x => x.category == 'info').map((x) => `\`` + x.name + '`').join(emotes.yellowDot);
        const nitro = client.commands.filter(x => x.category == "nitro").map((x) => `\`` + x.name + '`').join(emotes.yellowDot);
        const moderation = client.commands.filter(x => x.category == "moderation").map((x) => `\`` + x.name + '`').join(emotes.yellowDot);
        const options = client.commands.filter(x => x.category == "options").map((x) => `\`` + x.name + '`').join(emotes.yellowDot);
        const ownerOnly = client.commands.filter(x => x.category == "owner-only").map((x) => `\`` + x.name + '`').join(client.emotes.yellowDot);

        embed.addField(`🤿  Avatar`, avatar)
        .addField(`🤣  Beka`, beka)
        .addField(`${emotes.ubuntu}  Info`, info)
        .addField(`${emotes.nitro}  Nitro`, nitro)
        if(message.member.hasPermission('MANAGE_MESSAGES')){
          embed.addField(`${emotes.staff}  Moderacja`, moderation)
        }
        if(message.member.hasPermission('MANAGE_GUILD')){
          embed.addField(`🛠️  Opcje`, options)
        }
        if(client.ownerID.includes(message.author.id)){
          embed.addField(`${emotes.arrr}  OwnerOnly`, ownerOnly)
        }
        embed.setDescription(`${emotes.world}  **${pf}${cmd} <nazwa komendy>** ~ pomoc z konkretną komendą`)
        
        await reaction.edit(embed)
        return;

      } else {
        embed.setTitle(`${client.emotes.lightSabers}  Pomoc dotycząca **${chkCmd.name}**`)
        .addField(`🧾 Opis`, chkCmd.description, true)
        .addField(`📌 Alias(y)`, chkCmd.aliases.length < 1 ? '-' : chkCmd.aliases.join(', '), true)
        .addField(`🖊️ Użycie`, chkCmd.utilisation.replace(`{prefix}`, pf), true)
        .setDescription(`${emotes.world} Wymagane argumenty: \`[]\`, opcjonalne argumenty: \`<>\`.`)
        
        await reaction.edit(embed)
        return;
      }
    } catch (err) {
      const embed = new MessageEmbed()
      .setTitle(`${client.emotes.warn}  Zatrzymano komendę \`${cmd}\` z powodu wycieku błędu`)
      .setThumbnail(`https://cdn.discordapp.com/attachments/850848194929492009/854001906962530334/1810746.png`)
      .setFooter(`💡 ${message.author.tag}\n🛠️ v${client.version} ┇ ⚡ RockyBot® 2021`, message.author.avatarURL({dynamic: true}))
      .setColor('RED')
      try {await reaction.delete()} catch (err) {}
      await message.channel.send(embed)
      return;
    }
  }
}