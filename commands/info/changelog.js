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
    .setFooter(`💡 ${message.author.tag}\n🛠️ v${client.version} ┇ ⚡ RockyBot® 2021`, message.author.displayAvatarURL({dynamic: true}))
    .setColor("RANDOM")
    .setTitle(`${client.emotes.cpu}  Używana wersja: ${client.version}`)
    .setThumbnail(`https://cdn.discordapp.com/attachments/850848194929492009/850848222787403836/4334039.png`)
    .setDescription(`${client.emotes.changelog} **Changelog dostępny [TUTAJ](${client.config.changelog})**`)
    .addField(`🛠️ Notka od autora:`, `${changes}` || `-`)
    await message.lineReplyNoMention(embed)
    if(reaction) await reaction.remove()

}
}