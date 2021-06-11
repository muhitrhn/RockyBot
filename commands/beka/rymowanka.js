const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "rymowanka",
  aliases: ["br"],
  description: "Wysyła losową rymowankę",
  category: 'beka',
  utilisation: '{prefix}rymowanka',

  async execute(client, message, args, pf, cmd) {

      //Start; 1/2
      reactionEmbed = new MessageEmbed()
      .setTitle(`${client.emotes.winLoad} Praca w toku... 1/2`)
      .setDescription(`${client.emotes.google} Losowanie tekstu...`)
      .setThumbnail(`https://cdn.discordapp.com/attachments/850848194929492009/852901674997252106/1275442.png`)
      .setFooter(`💡 ${message.author.tag}\n🛠️ v${client.version} ┇ ⚡ RockyBot® 2021`, message.author.avatarURL({dynamic: true}));
      reaction = await message.lineReplyNoMention(reactionEmbed)
      errorEmbed = new MessageEmbed()
      .setTitle(`${client.emotes.warn}  Wystąpił problem z komendą \`${pf}${cmd}\``)
      .setThumbnail(`https://cdn.discordapp.com/attachments/852928154691567669/852928290045427733/753345.png`)
      .setColor('RED')
      .setFooter(`💡 ${message.author.tag}\n🛠️ v${client.version} ┇ ⚡ RockyBot® 2021`, message.author.avatarURL({dynamic: true}));
  
      //Random text
      try {
        var texts = [];
        messages = await client.channels.cache.get(client.attachments.rymowanka).messages.fetch()
        await messages.forEach(msg => texts.push(msg.content))
        text = await texts[Math.floor(Math.random() * texts.length)] 
      //Error in generation
      } catch (error) {
        errorEmbed.setDescription(`${client.emotes.x} Losowanie tekstu`)
        reaction.edit(errorEmbed)
        return;
      }
  
      //2/2
      reactionEmbed.setTitle(`${client.emotes.winLoad} Praca w toku... 2/2`)
      .setDescription(`${client.emotes.grverify} Losowanie tekstu\n${client.emotes.google} Tworzenie wiadomości...`)
      await reaction.edit(reactionEmbed)
  
      //Create embed
      try {
      embed = new MessageEmbed()
      .setTitle(`${text}`)
      .setColor('RANDOM')
      .setThumbnail(`https://cdn.discordapp.com/attachments/852622478399766528/852622869891514468/852907.png`)
      .setFooter(`💡 ${message.author.tag}\n🛠️ v${client.version} ┇ ⚡ RockyBot® 2021`, message.author.avatarURL({dynamic: true}));
      await message.lineReplyNoMention(embed)
      //Error in creating embed
      } catch (error) {
        errorEmbed.setDescription(`${client.emotes.grverify} Losowanie tekstu\n${client.emotes.x} Tworzenie wiadomości`)
        reaction.edit(errorEmbed)
        return;
      }
      //Ready
      await reaction.delete()
    }
}