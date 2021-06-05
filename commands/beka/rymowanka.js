const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "rymowanka",
  aliases: ["br"],
  description: "Wysyła losową rymowankę",
  category: 'beka',
  utilisation: '{prefix}rymowanka',

  async execute(client, message) {
    reaction = await message.react(client.emotes.google)
    var texts = [];
    messages = await client.channels.cache.get(client.config.attachments.rymowanka).messages.fetch()
    await messages.forEach(msg => texts.push(msg.content))
    let text = await texts[Math.floor(Math.random() * texts.length)] 
    let embed = new MessageEmbed()
    .setColor('RANDOM')
    .setTitle(text)
    .setThumbnail(client.user.displayAvatarURL())
    .setDescription(`${client.emotes.system}  Użyto komendy **${message.content}**`)
    .setFooter(`💡 ${message.author.tag}\n🛠️ v${client.version}`, message.author.displayAvatarURL())
    .setTimestamp()
    await message.lineReplyNoMention(embed)
    if(reaction) await reaction.remove()  
  }
}