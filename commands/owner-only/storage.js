const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "storage",
  aliases: ["oos"],
  description: "Info o ilosci dostepnych zasobow do komend",
  category: 'owner-only',
  utilisation: '{prefix}storage {coś}',

  async execute(client, message, args) {
    embed = new MessageEmbed()
    if(!client.ownerID.includes(message.author.id)) {
        embed.setColor("RED")
        .setTitle("🔒  Komenda niedostępna")
        .setDescription(`${client.emotes.warn} Nie jesteś właścicielem bota ¯\\_(ツ)_/¯`)        
        .setThumbnail("https://cdn.discordapp.com/attachments/837601267827998770/845616959952257104/loading.gif")
        .setFooter(`💡 ${message.author.tag}\n🛠️ v${client.version}`, message.author.displayAvatarURL())
        .setTimestamp()
        message.lineReply(embed)
        .then(msg => {
          message.react(client.emotes.x)
          msg.delete({ timeout: 8000 })
        })

    } else {
        embed.setColor(`RANDOM`)
        .setTitle(`${client.emotes.staff}  Info o dostępnych zasobach`)

        const wideo = await client.channels.cache.get(client.config.attachments.wideo).messages.fetch()
        await embed.addField(`🎬  Komenda wideo: \`${wideo.size}\``, "** **")

        const tuskotronic = await client.channels.cache.get(client.config.attachments.tuskotronic).messages.fetch()
        await embed.addField(`🎃  Komenda tuskotronic: \`${tuskotronic.size}\``, "** **")

        const stonoga = await client.channels.cache.get(client.config.attachments.stonoga).messages.fetch()
        await embed.addField(`😎  Komenda stonoga: \`${stonoga.size}\``, "** **")

        const kamien = await client.channels.cache.get(client.config.attachments.kamien).messages.fetch()
        await embed.addField(`:rock:  Komenda kamien: \`${kamien.size}\``, "** **")

        const budowa = await client.channels.cache.get(client.config.attachments.budowa).messages.fetch()
        await embed.addField(`🏗️  Komenda budowa: \`${budowa.size}\``, "** **")

        const rymowanka = await client.channels.cache.get(client.config.attachments.rymowanka).messages.fetch()
        await embed.addField(`📲  Komenda rymowanka: \`${rymowanka.size}\``, "** **")

        await embed.addField(`🎈  Komenda meme: \`Powered by reddit.com\``, "** **")

        await embed.addField(`✨  Wszystkich wiadomości z których korzysta bot: \`${wideo.size + tuskotronic.size + stonoga.size + kamien.size + budowa.size + rymowanka.size}\``, "** **")

        .setThumbnail(`https://cdn.discordapp.com/attachments/850848194929492009/852225393527488533/2906274.png`)
        .setFooter(``, message.author.displayAvatarURL())
        .setTimestamp()

        await message.lineReplyNoMention(embed)
    }
  }
}