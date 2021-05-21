require('discord-reply');
const { MessageEmbed,MessageAttachment } = require("discord.js");

module.exports = {
  name: "stonoga",
  aliases: ["bs"],
  description: "Wysyła Zbycha Stonogę",
  category: 'beka',
  utilisation: '{prefix}stonoga',

  async execute(client, message) {
    reaction = await message.react(client.emotes.google)
    var files = [];
    messages = await client.channels.cache.get(client.config.attachments.stonoga).messages.fetch()
    await messages.forEach(msg => files.push(msg.attachments.array()[0].url))
    let chosenFile = await files[Math.floor(Math.random() * files.length)] 
    let embed = new MessageEmbed()
    embed.setColor('RANDOM')
    embed.setImage("https://cdn.discordapp.com/attachments/783091756593053726/810591417838731315/1JOZT-rbar.gif")
    embed.setDescription(`${client.emotes.system}  Użyto komendy **${message.content}**`)
    embed.setFooter(`💡 ${message.author.tag}\n🛠️ v${client.version}`, message.author.displayAvatarURL())
    embed.setTimestamp()
    attachment = new MessageAttachment(chosenFile, `ZbychuStonoga.mp4`)
    await message.lineReplyNoMention({embed, files: [attachment] })
    if(reaction) await reaction.remove()  
  }
}