const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "rymowanka",
  aliases: ["br"],
  description: "Wysyła losową rymowankę",
  category: 'beka',
  utilisation: '{prefix}br',

  async execute(client, message, args, pf, cmd) {
    
    //Start
    const reactionEmbed = new MessageEmbed()
    .setTitle(`${client.emotes.winLoad} Praca w toku... 1/1`)
    .setDescription(`${client.emotes.arrr} Losowanie tekstu...`)
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
    
      //Random text
      let texts = []
      try {
        const messages = await client.channels.cache.get(client.attachments.rymowanka).messages.fetch()
        await messages.forEach(msg => texts.push(msg.content))
        let text = await texts[Math.floor(Math.random() * texts.length)] 
        const embed = new MessageEmbed()
        .setTitle(`${text}`)
        .setColor('RANDOM')
        .setThumbnail(`https://cdn.discordapp.com/attachments/852622478399766528/852622869891514468/852907.png`)
        .setFooter(`💡 ${message.author.tag}\n🛠️ v${client.version} ┇ ⚡ RockyBot® 2021`, message.author.avatarURL({dynamic: true}));
        await message.lineReplyNoMention(embed)
      //err in generation
      } catch (err) {
        errEmbed.setDescription(`${client.emotes.x} Losowanie tekstu`)
        reaction.edit(errEmbed)
        return;
      }

      //Ready
      await reaction.delete()
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