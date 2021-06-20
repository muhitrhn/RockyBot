const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "changelog",
  aliases: [`ic`],
  description: "Pokaż changelog",
  category: 'info',
  utilisation: '{prefix}ic',
  async execute(client, message, args, pf, cmd) {

    const reaction = await client.base.get(`cmd`).start(client, message, cmd)

    try {
      let changes = []
      const messages = await client.channels.cache.get(client.config.ChangesChannel).messages.fetch(1)
      await messages.forEach(msg => changes.push(msg.content))

      const embed = new MessageEmbed()
      .setFooter(`💡 ${message.author.tag}\n🛠️ v${client.version} ┇ ⚡ RockyBot® 2021`, message.author.avatarURL({dynamic: true}))
      .setColor("RANDOM")
      .setTitle(`${client.emotes.cpu}  Używana wersja: ${client.version}`)
      .setThumbnail(client.cmds.infoImgs.changelog)
      .setDescription(`${client.emotes.changelog} **Changelog dostępny [TUTAJ](${client.config.changelog})**`)
      if (changes[0]) embed.addField(`🛠️ Aktualne prace:`, `${changes[0]}`)

      await reaction.edit({embed: embed})
    } catch (err) {
      await client.base.get(`cmd`).error(client, message, pf, cmd, reaction, err)
    }
  }
}