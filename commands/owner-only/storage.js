const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "storage",
  aliases: ["oos"],
  description: "Info o ilosci dostepnych zasobow do komend",
  category: 'owner-only',
  utilisation: '{prefix}oos {coś}',

  async execute(client, message, args, pf, cmd) {
    
    //Start; 1/2
    const reactionEmbed = new MessageEmbed()
    .setTitle(`${client.emotes.winLoad}  Praca w toku... 1/2`)
    .setDescription(`${client.emotes.arrr} Sprawdzanie permisji...`)
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

      //Check permissions
      let permsCheck = 0
      try {
        if(client.ownerID.includes(message.author.id)) {
            permsCheck = 1
        }
      } catch (err) {
        //Error in checking
        errEmbed.setDescription(`${client.emotes.x} Sprawdzanie permisji`)
        reaction.edit(errEmbed)
        return;
      }

      try {
        if(permsCheck === 0) {
          errEmbed.setThumbnail(`https://cdn.discordapp.com/attachments/852928154691567669/852976002178220052/891399.png`)
          .setDescription(`${client.emotes.rverify} Sprawdzanie permisji: **Brakujące uprawnienia: \`WŁAŚCICIEL BOTA\`**`)
          .setTitle(`${client.emotes.x}  Znaleziono problemy z permisjami`)
          .setColor('#FFC000')
          reaction.edit(errEmbed)
          return;
        } 
      } catch (err) {}

      //2/2
      reactionEmbed.setTitle(`${client.emotes.winLoad} Praca w toku... 2/2`)
      .setDescription(`${client.emotes.grverify} Sprawdzanie permisji\n${client.emotes.arrr} Kalkulowanie informacji o komendach...`)
      await reaction.edit(reactionEmbed)

      try {
        const embed = new MessageEmbed()
        .setColor(`RANDOM`)
        .setTitle(`${client.emotes.staff}  Dostępne zasoby`)

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
        .setFooter(`💡 ${message.author.tag}\n🛠️ v${client.version} ┇ ⚡ RockyBot® 2021`, message.author.avatarURL({dynamic: true}))
        
        await reaction.edit(embed)

      } catch (err) {
        errEmbed.setDescription(`${client.emotes.grverify} Sprawdzanie permisji\n${client.emotes.x} Kalkulowanie informacji o komendach`)
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
