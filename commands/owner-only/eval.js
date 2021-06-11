const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "eval",
  aliases: ["ooe"],
  description: "Eval... xD",
  category: 'owner-only',
  utilisation: '{prefix}eval {coś}',

  async execute(client, message, args, pf, cmd) {

      //Start;
      reactionEmbed = new MessageEmbed()
      .setTitle(`${client.emotes.winLoad}  Praca w toku... 1/2`)
      .setDescription(`${client.emotes.google} Sprawdzanie permisji...`)
      .setThumbnail(`https://cdn.discordapp.com/attachments/850848194929492009/852901674997252106/1275442.png`)
      .setFooter(`💡 ${message.author.tag}\n🛠️ v${client.version} ┇ ⚡ RockyBot® 2021`, message.author.avatarURL({dynamic: true}))
      .setColor(`BLUE`)
      reaction = await message.lineReplyNoMention(reactionEmbed)
      errorEmbed = new MessageEmbed()
      .setTitle(`${client.emotes.warn}  Wystąpił problem z komendą \`${pf}${cmd}\``)
      .setThumbnail(`https://cdn.discordapp.com/attachments/852928154691567669/852928290045427733/753345.png`)
      .setColor('RED')
      .setFooter(`💡 ${message.author.tag}\n🛠️ v${client.version} ┇ ⚡ RockyBot® 2021`, message.author.avatarURL({dynamic: true}));

      //Check permissions
      try {
        if(client.ownerID.includes(message.author.id)) {
            x = 1
        } else {
            x = 0
        }
      } catch (error) {
        //Error in checking
            errorEmbed.setDescription(`${client.emotes.x} Sprawdzanie permisji`)
            reaction.edit(errorEmbed)
            return;
      }

      try {
        if(x === 0) {
        errorEmbed.setThumbnail(`https://cdn.discordapp.com/attachments/852928154691567669/852976002178220052/891399.png`)
        .setDescription(`${client.emotes.grverify} Sprawdzanie permisji: **Brakujące uprawnienia: \`WŁAŚCICIEL BOTA\`**`)
        reaction.edit(reactionEmbed)
        return;
        } } catch (error) {}

      //2/2
      reactionEmbed.setTitle(`${client.emotes.winLoad} Praca w toku... 2/2`)
      .setDescription(`${client.emotes.grverify} Sprawdzanie permisji\n${client.emotes.google} Wykonywanie skryptu...`)
      await reaction.edit(reactionEmbed)

      //EVAL
      try {
        const code = args.join(" ");
        let evaled = eval(code);
   
        if (typeof evaled !== "string")
          evaled = require("util").inspect(evaled);
   
        message.channel.send(evaled, {code:"xl"});
      } catch (error) {
        errorEmbed.setDescription(`${client.emotes.grverify} Sprawdzanie permisji\n${client.emotes.x} Wykonywanie skryptu\n\n\`\`\`${error}\`\`\``)
        reaction.edit(errorEmbed)
        return;
      }

      //READY
      await reaction.delete()
    }
}