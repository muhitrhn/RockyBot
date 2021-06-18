const { MessageEmbed,MessageAttachment } = require("discord.js");

module.exports = {
  name: "kamień",
  aliases: ["bk", "kamien"],
  description: "Wysyła kamień. Po prostu.",
  category: 'beka',
  utilisation: '{prefix}bk',

  async execute(client, message, args, pf, cmd) {
    
    //Start
    const reactionEmbed = new MessageEmbed()
    .setTitle(`${client.emotes.winLoad} Praca w toku... 1/2`)
    .setDescription(`${client.emotes.arrr} Losowanie pliku...`)
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

      //Random rock
      let files = [], chosenFile
      try {
        const messages = await client.channels.cache.get(client.attachments.kamien).messages.fetch()
        await messages.forEach(msg => files.push(msg.attachments.array()[0].url))
        chosenFile = await files[Math.floor(Math.random() * files.length)] 
      //err in generation
      } catch (err) {
        errEmbed.setDescription(`${client.emotes.x} Losowanie pliku`)
        reaction.edit(errEmbed)
        return;
      }

      reactionEmbed.setTitle(`${client.emotes.winLoad} Praca w toku.. 2/2`)
      .setDescription(`${client.emotes.grverify} Losowanie pliku\n${client.emotes.arrr} Załączanie pliku...`)
      await reaction.edit(reactionEmbed)
      
      //Send 
      try {
        const attachment = new MessageAttachment(chosenFile, `kamien.png`)
        const embed = new MessageEmbed()
        .setTitle(`${client.emotes.CMDkamien}  Kamień xD`)
        .setColor('RANDOM')
        .setFooter(`💡 ${message.author.tag}\n🛠️ v${client.version} ┇ ⚡ RockyBot® 2021`, message.author.avatarURL({dynamic: true}));
        await message.lineReplyNoMention({embed, files: [attachment] })
      //err in attaching
      } catch (err) {
        errEmbed.setDescription(`${client.emotes.grverify} Losowanie pliku\n${client.emotes.x} Załączanie pliku`)
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