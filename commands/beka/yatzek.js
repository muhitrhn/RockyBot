require('discord-reply');
const { version } = require('../../package.json');
const { MessageEmbed } = require('discord.js');

try {
module.exports = {
  name: "yatzek",
  description: 'Yatzeek', // Required for slash commands
  execute(message) {
    if (message.guild.id !== "839986554381402172") return;
    var images = ["https://cdn.discordapp.com/attachments/841236531662028800/841236551429914634/unknown.png", 
                  "https://cdn.discordapp.com/attachments/841236531662028800/841236938504667186/hruped.PNG", 
                  "https://cdn.discordapp.com/attachments/841236531662028800/841237080326799370/unknown.png", 
                  "https://cdn.discordapp.com/attachments/841236531662028800/841237157875417098/unknown.png", 
                  "https://cdn.discordapp.com/attachments/841236531662028800/841237306509754389/unknown.png", 
                  "https://cdn.discordapp.com/attachments/841236531662028800/841237406463819796/unknown.png", 
                  "https://cdn.discordapp.com/attachments/841236531662028800/841237702103007252/unknown.png",
                  "https://cdn.discordapp.com/attachments/841236531662028800/841238238864605184/unknown.png",
                  "https://cdn.discordapp.com/attachments/841236531662028800/841238376212594688/unknown.png",
                  "https://cdn.discordapp.com/attachments/841236531662028800/841238540423266304/unknown.png",
                  "https://cdn.discordapp.com/attachments/841236531662028800/841238649580683264/unknown.png",
                  "https://cdn.discordapp.com/attachments/841236531662028800/841238970717437992/unknown.png",
                  "https://cdn.discordapp.com/attachments/841236531662028800/841239446187671573/unknown.png",
                  "https://cdn.discordapp.com/attachments/841236531662028800/841241084268642325/unknown.png",
                  "https://cdn.discordapp.com/attachments/841236531662028800/841241758817583124/unknown.png",
                  "https://cdn.discordapp.com/attachments/841236531662028800/842720115165888572/Aha.png",
                  "https://cdn.discordapp.com/attachments/841236531662028800/842720120701845514/Aa.png",
                  "https://cdn.discordapp.com/attachments/841236531662028800/842720132127785020/amasz.png",
                  "https://cdn.discordapp.com/attachments/841236531662028800/842720140126846996/Czo.png",
                  "https://cdn.discordapp.com/attachments/841236531662028800/842720153556090900/Filozof.png",
                  "https://cdn.discordapp.com/attachments/841236531662028800/842720161785839647/NaHaju.png",
                  "https://cdn.discordapp.com/attachments/841236531662028800/842720169683320852/niemamsily.png",
                  "https://cdn.discordapp.com/attachments/841236531662028800/842720177074339840/trigerred.png",
                  "https://cdn.discordapp.com/attachments/841236531662028800/842720192929071144/Yatzeek.png"
                ];
    var image = Math.floor(Math.random() * images.length);
    let embed = new MessageEmbed()
    .setColor('RANDOM')
    .setTitle(`A oto Pan Yatzek`)
    .setImage(String([images[image]]))
    .setTimestamp()
    .setFooter(`💡 ${message.author.tag}\n🛠️ v${version}`, message.author.displayAvatarURL())

    message.lineReplyNoMention(embed)

  }
}} catch (error) {
  console.log(error)
}
