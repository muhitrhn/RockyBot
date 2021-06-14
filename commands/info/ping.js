const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "ping",
  aliases: ["ip"],
  description: "Sprawdza ping bota",
  category: 'info',
  utilisation: '{prefix}ip',

  async execute(client, message, args, pf, cmd) {
        
    //Start; 1/2
    const reactionEmbed = new MessageEmbed()
    .setTitle(`${client.emotes.winLoad} Praca w toku... 1/1`)
    .setDescription(`${client.emotes.arrr} Testowanie łącza...`)
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

      //Ping
      try {
        const embed = new MessageEmbed()
        .setColor("GREEN")
        .setTitle(`🏓  Ping: \`${client.ws.ping}\`ms`)
        .setFooter(`💡 ${message.author.tag}\n🛠️ v${client.version} ┇ ⚡ RockyBot® 2021`, message.author.avatarURL({dynamic: true}))
        .setDescription(`${client.emotes.grverify} Testowanie łącza`)
        .setThumbnail(`https://cdn.discordapp.com/attachments/850848194929492009/853742046288543764/1545670.png`)
        await reaction.edit(embed)
      //Err
      } catch (err) {
        errEmbed.setDescription(`${client.emotes.x} Testowanie łącza`)
        reaction.edit(errEmbed)
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