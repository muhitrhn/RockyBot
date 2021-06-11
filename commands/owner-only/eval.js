const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "eval",
  aliases: ["ooe"],
  description: "Eval... xD",
  category: 'owner-only',
  utilisation: '{prefix}eval {coś}',

  execute(client, message, args) {
    if(!client.ownerID.includes(message.author.id)) {
        embed = new MessageEmbed()
        embed.setColor("RED")
        .setTitle("🔒  Komenda niedostępna")
        .setDescription(`${client.emotes.warn} Nie jesteś właścicielem bota ¯\\_(ツ)_/¯`)        
        .setThumbnail("https://cdn.discordapp.com/attachments/837601267827998770/845616959952257104/loading.gif")
        .setFooter(`💡 ${message.author.tag}\n🛠️ v${client.version}`, message.author.displayAvatarURL({dynamic: true}))
        .setTimestamp()
        message.lineReply(embed)
        .then(msg => {
          message.react(client.emotes.x)
          msg.delete({ timeout: 8000 })
        })

    } else {
    try {
        const code = args.join(" ");
        let evaled = eval(code);
   
        if (typeof evaled !== "string")
          evaled = require("util").inspect(evaled);
   
        message.channel.send(evaled, {code:"xl"});
      } catch (err) {
        message.channel.send(`\`ERROR\` \`\`\`xl\n${err}\n\`\`\``);
      }
    }
  }
}