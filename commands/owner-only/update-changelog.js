const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "update-changelog",
  aliases: [],
  description: "Zaktualizuj changelog",
  category: 'owner-only',
  utilisation: '{prefix}update-changelog\n***Bot0wner only!***',

  execute(client, message, args) {
    if(message.author.id !== client.ownerID) {
        embed = new MessageEmbed()
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
        const changelog = client.channels.cache.get(client.config.todoList)

        changelog.bulkDelete(99)
        changelog.send(client.config.changelog)
    }
  }
}