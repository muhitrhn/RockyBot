const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "changelog",
  aliases: [`ic`],
  description: "Pokaż changelog",
  category: 'info',
  utilisation: '{prefix}changelog',

  async execute(client, message, args) {

    reaction = await message.react(client.emotes.google)

    var changes = [];
    messages = await client.channels.cache.get(client.config.ChangesChannel).messages.fetch(1)
    await messages.forEach(msg => changes.push(msg.content))

    const embed = new MessageEmbed()
    .setFooter(`💡 ${message.author.tag}\n🛠️ v${client.version}`, message.author.displayAvatarURL())
    .setTimestamp()
    .setColor("RANDOM")
    .setTitle(`${client.emotes.grverify}  Aktualna wersja: ${client.version}`)
    .setThumbnail(`https://cdn.discordapp.com/attachments/850848194929492009/850848222787403836/4334039.png`)
    .setDescription(`${client.emotes.system}  Użyto komendy **${message.content}**\n\n${client.emotes.gearspin}  **Changelog dostępny [TUTAJ](${client.config.changelog})**`)
    .addField(`🛠️ Aktualne prace`, `${changes}`)
    .setImage(`https://cdn.discordapp.com/attachments/850848194929492009/851473820748349490/y8zxKNpR6ftlI55CHZM1IykU2X8LjdFp8fJ1uQMtLKncVWF2ESz9Wm5XCdR21TDXRgnQbdUztU2WS9PQdz43TAO1n9dopdWd9whw.png`)    
    await message.lineReplyNoMention(embed)
    if(reaction) await reaction.remove()

}
}