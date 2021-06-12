const { MessageEmbed,MessageAttachment } = require("discord.js");

module.exports = {
  name: "kamień",
  aliases: ["bk", "kamien"],
  description: "Wysyła kamień. Po prostu.",
  category: 'beka',
  utilisation: '{prefix}kamien',

  async execute(client, message, args, pf, cmd) {

    //Start; 1/3
    reactionEmbed = new MessageEmbed()
    .setTitle(`${client.emotes.winLoad} Praca w toku... 1/3`)
    .setDescription(`${client.emotes.google} Losowanie pliku...`)
    .setThumbnail(`https://cdn.discordapp.com/attachments/850848194929492009/852901674997252106/1275442.png`)
    .setFooter(`💡 ${message.author.tag}\n🛠️ v${client.version} ┇ ⚡ RockyBot® 2021`, message.author.avatarURL({dynamic: true}))
    .setColor(`BLUE`)
    const reaction = await message.lineReplyNoMention(reactionEmbed)
    errorEmbed = new MessageEmbed()
    .setTitle(`${client.emotes.warn}  Wystąpił problem z komendą \`${pf}${cmd}\``)
    .setThumbnail(`https://cdn.discordapp.com/attachments/852928154691567669/852928290045427733/753345.png`)
    .setColor('RED')
    .setFooter(`💡 ${message.author.tag}\n🛠️ v${client.version} ┇ ⚡ RockyBot® 2021`, message.author.avatarURL({dynamic: true}));

    //Random rock
    try {
    var files = [];
    messages = await client.channels.cache.get(client.attachments.kamien).messages.fetch()
    await messages.forEach(msg => files.push(msg.attachments.array()[0].url))
    chosenFile = await files[Math.floor(Math.random() * files.length)] 
    //Error in generation
    } catch (error) {
      errorEmbed.setDescription(`${client.emotes.x} Losowanie pliku`)
      reaction.edit(errorEmbed)
      return;
    }

    //2/3
    reactionEmbed.setTitle(`${client.emotes.winLoad} Praca w toku... 2/3`)
    .setDescription(`${client.emotes.grverify} Losowanie pliku\n${client.emotes.google} Tworzenie wiadomości...`)
    await reaction.edit(reactionEmbed)

    //Create embed
    try {
    embed = new MessageEmbed()
    .setTitle(`${client.emotes.CMDkamien}  Kamień xD`)
    .setColor('RANDOM')
    .setFooter(`💡 ${message.author.tag}\n🛠️ v${client.version} ┇ ⚡ RockyBot® 2021`, message.author.avatarURL({dynamic: true}));
    //Error in creating embed
    } catch (error) {
      errorEmbed.setDescription(`${client.emotes.grverify} Losowanie pliku\n${client.emotes.x} Tworzenie wiadomości`)
      reaction.edit(errorEmbed)
      return;
    }

    //3/3
    reactionEmbed.setTitle(`${client.emotes.winLoad} Praca w toku.. 3/3`)
    .setDescription(`${client.emotes.grverify} Losowanie pliku\n${client.emotes.grverify} Tworzenie wiadomości\n${client.emotes.google} Załączanie pliku...`)
    await reaction.edit(reactionEmbed)
    
    //Send 
    try {
    attachment = new MessageAttachment(chosenFile, `kamien.png`)
    await message.lineReplyNoMention({embed, files: [attachment] })
    //Error in attaching
    } catch (error) {
      errorEmbed.setDescription(`${client.emotes.grverify} Losowanie pliku\n${client.emotes.grverify} Tworzenie wiadomości\n${client.emotes.x} Załączanie pliku`)
      reaction.edit(errorEmbed)
      return;
    }

    //Ready
    await reaction.delete()
  }
}