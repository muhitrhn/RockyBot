const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "eval",
  aliases: ["ooe"],
  description: "Eval... xD",
  category: 'owner-only',
  utilisation: '{prefix}eval {coś}',
  async execute(client, message, args, pf, cmd) {
    
    const reaction = await client.base.get(`cmd`).start(client, message, cmd)

    try {
      const embed = new MessageEmbed()
      .setColor('RANDOM')
      .setFooter(`💡 ${message.author.tag}\n🛠️ v${client.version} ┇ ⚡ RockyBot® 2021`, message.author.avatarURL({dynamic: true}))

      if(!client.ownerID.includes(message.author.id)) {
        embed.setTitle(`🔒  Nie masz wymaganych uprawnień...`)
        .setDescription(`**...\`WŁAŚCICIEL BOTA\`**`)
        .setThumbnail(client.cmds.lockedImgs[Math.floor(Math.random() * client.cmds.lockedImgs.length)])
        .setColor('#FFC000')
        await reaction.edit({embed: embed})
        return;
      } 

      //EVAL
      const code = args.join(" ");
      let evaled = eval(code);
   
      if (typeof evaled !== "string")
      evaled = require("util").inspect(evaled);
   
      reaction.edit(evaled, {code:"xl"})

    } catch (err) {
      await client.base.get(`cmd`).error(client, message, pf, cmd, reaction, err)
    }
  }
}
