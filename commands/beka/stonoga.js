const { MessageEmbed,MessageAttachment } = require("discord.js");

module.exports = {
  name: "stonoga",
  aliases: ["bs"],
  description: "Wysyła Zbycha Stonogę",
  category: 'beka',
  utilisation: '{prefix}bs',

  async execute(client, message, args, pf, cmd) {
    
    //Start; 1/3
    const reactionEmbed = new MessageEmbed()
    .setTitle(`${client.emotes.winLoad} Praca w toku... 1/3`)
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
        const messages = await client.channels.cache.get(client.attachments.stonoga).messages.fetch()
        await messages.forEach(msg => files.push(msg.attachments.array()[0].url))
        chosenFile = await files[Math.floor(Math.random() * files.length)] 
      //err in generation
      } catch (err) {
        errEmbed.setDescription(`${client.emotes.x} Losowanie pliku`)
        reaction.edit(errEmbed)
        return;
      }

      //2/3
      reactionEmbed.setTitle(`${client.emotes.winLoad} Praca w toku... 2/3`)
      .setDescription(`${client.emotes.grverify} Losowanie pliku\n${client.emotes.arrr} Tworzenie wiadomości...`)
      await reaction.edit(reactionEmbed)

      //Create embed
      let embed
      try {
        embed = new MessageEmbed()
        .setTitle(`${client.emotes.CMDstonoga}  Zbychol Stonoga! xD`)
        .setColor('RANDOM')
        .setFooter(`💡 ${message.author.tag}\n🛠️ v${client.version} ┇ ⚡ RockyBot® 2021`, message.author.avatarURL({dynamic: true}));
      //err in creating embed
      } catch (err) {
        errEmbed.setDescription(`${client.emotes.grverify} Losowanie pliku\n${client.emotes.x} Tworzenie wiadomości`)
        reaction.edit(errEmbed)
        return;
      }

      //3/3
      reactionEmbed.setTitle(`${client.emotes.winLoad} Praca w toku.. 3/3`)
      .setDescription(`${client.emotes.grverify} Losowanie pliku\n${client.emotes.grverify} Tworzenie wiadomości\n${client.emotes.arrr} Załączanie pliku...`)
      await reaction.edit(reactionEmbed)
      
      //Send
      try {
        const attachment = new MessageAttachment(chosenFile, `stonoga.mp4`)
        await message.lineReplyNoMention({embed, files: [attachment] })
      //err in attaching
      } catch (err) {
        errEmbed.setDescription(`${client.emotes.grverify} Losowanie pliku\n${client.emotes.grverify} Tworzenie wiadomości\n${client.emotes.x} Załączanie pliku`)
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