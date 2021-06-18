const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "eval",
  aliases: ["ooe"],
  description: "Eval... xD",
  category: 'owner-only',
  utilisation: '{prefix}eval {coś}',

  async execute(client, message, args, pf, cmd) {
    
    //Start;
    const reactionEmbed = new MessageEmbed()
    .setTitle(`${client.emotes.winLoad}  Praca w toku... 1/2`)
    .setDescription(`${client.emotes.arrr} Sprawdzanie permisji...`)
    .setThumbnail(`https://cdn.discordapp.com/attachments/850848194929492009/852901674997252106/1275442.png`)
    .setFooter(`💡 ${message.author.tag}\n🛠️ v${client.version} ┇ ⚡ RockyBot® 2021`, message.author.avatarURL({dynamic: true}))
    .setColor(`BLUE`)
    
    const reaction = await message.lineReplyNoMention(reactionEmbed)

    try {
      const errorEmbed = new MessageEmbed()
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
      } catch (error) {
        //Error in checking
        errorEmbed.setDescription(`${client.emotes.x} Sprawdzanie permisji`)
        reaction.edit(errorEmbed)
        return;
      }

      try {
        if(permsCheck === 0) {
          errorEmbed.setThumbnail(`https://cdn.discordapp.com/attachments/852928154691567669/852976002178220052/891399.png`)
          .setDescription(`${client.emotes.rverify} Sprawdzanie permisji: **Brakujące uprawnienia: \`WŁAŚCICIEL BOTA\`**`)
          .setTitle(`${client.emotes.warn}  Znaleziono problemy z permisjami`)
          .setColor('#FFC000')
          reaction.edit(errorEmbed)
          return;
        } 
      } catch (error) {}

      //2/2
      reactionEmbed.setTitle(`${client.emotes.winLoad} Praca w toku... 2/2`)
      .setDescription(`${client.emotes.grverify} Sprawdzanie permisji\n${client.emotes.arrr} Wykonywanie skryptu...`)
      await reaction.edit(reactionEmbed)

      //EVAL
      try {
        const code = args.join(" ");
        let evaled = eval(code);
   
        if (typeof evaled !== "string")
        evaled = require("util").inspect(evaled);
   
        reaction.edit(evaled, {code:"xl"})
      } catch (error) {
        errorEmbed.setDescription(`${client.emotes.grverify} Sprawdzanie permisji\n${client.emotes.x} Wykonywanie skryptu\n\n\`\`\`${error}\`\`\``)
        reaction.edit(errorEmbed)
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
