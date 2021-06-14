const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "changelog",
  aliases: [`ic`],
  description: "Pokaż changelog",
  category: 'info',
  utilisation: '{prefix}ic',

  async execute(client, message, args, pf, cmd) {
      
    //Start; 1/2
    const reactionEmbed = new MessageEmbed()
    .setTitle(`${client.emotes.winLoad} Praca w toku... 1/2`)
    .setDescription(`${client.emotes.arrr} Sprawdzanie aktualnych prac...`)
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

      //Version
      let changes = []
      try {
        const messages = await client.channels.cache.get(client.config.ChangesChannel).messages.fetch(1)
        await messages.forEach(msg => changes.push(msg.content))
      //err in check
      } catch (err) {
        errEmbed.setDescription(`${client.emotes.x} Sprawdzanie aktualnych prac`)
        reaction.edit(errEmbed)
        return;
      }

      //2/2
      reactionEmbed.setTitle(`${client.emotes.winLoad} Praca w toku... 2/2`)
      .setDescription(`${changes[0] ? client.emotes.grverify : client.emotes.rverify} Sprawdzanie aktualnych prac\n${client.emotes.arrr} Tworzenie wiadomości...`)
      await reaction.edit(reactionEmbed)

      //Create embed
      try {
        const embed = new MessageEmbed()
        .setFooter(`💡 ${message.author.tag}\n🛠️ v${client.version} ┇ ⚡ RockyBot® 2021`, message.author.avatarURL({dynamic: true}))
        .setColor("RANDOM")
        .setTitle(`${client.emotes.cpu}  Używana wersja: ${client.version}`)
        .setThumbnail(`https://cdn.discordapp.com/attachments/850848194929492009/850848222787403836/4334039.png`)
        .setDescription(`${client.emotes.changelog} **Changelog dostępny [TUTAJ](${client.config.changelog})**`)
        if (changes[0]) embed.addField(`🛠️ Aktualne prace:`, `${changes[0]}`)
        await reaction.edit(embed)
      //err in creating embed
      } catch (err) {
        errEmbed.setDescription(`${changes[0] ? client.emotes.grverify : client.emotes.rverify} Sprawdzanie aktualnych prac\n${client.emotes.x} Tworzenie wiadomości`)
        reaction.edit(errEmbed)
        return;
      }

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