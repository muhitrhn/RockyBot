const { MessageEmbed } = require('discord.js');

  module.exports = {
    name: "clear",
    aliases: ["mc"],
    description: "Czyści podaną liczbę wiadomości; PRZESTARZALE, UZYJ KOMENDY CLEAR",
    category: 'moderation',
    utilisation: '{prefix}clear [liczba >1 i <99]',

    async execute(client, message, args, pf, cmd) {
          emotes = client.emotes
          embed = new MessageEmbed()
            if(!message.member.hasPermission('MANAGE_MESSAGES') || !message.guild.me.hasPermission('MANAGE_MESSAGES') && !client.ownerID.includes(message.author.id)) {
                  embed.setColor("#FF0000")
                  embed.setTitle("🔒  Komenda niedostępna")
                  embed.setDescription(`${emotes.siren} Brakujące uprawnienia: \`ZARZĄDZANIE WIADOMOŚCIAMI\`\n${emotes.warn} Upewnij się, że **bot i Ty** macie potrzebne **uprawnienia**`) 
              
              //That link not work, that's why embed is broken on mobile app
              //on pc simply embed don't have image
              
                  embed.setImage("https://cdn.discordapp.com/attachments/843892434743722044/844163249041309696/siren.gif")
              
              
              
                  embed.setFooter(`💡 ${message.author.tag}\n🛠️ v${client.version}`, message.author.displayAvatarURL({dynamic: true}))
                  embed.setTimestamp()
                  message.lineReply(embed)
                  .then(msg => {
                    message.react(emotes.x)
                  })
            } else {
                  amount = await parseInt(args[0]);
                  if (isNaN(amount) || amount < 2 || amount > 99) {
                    
                    embed.setColor("RED")
                    embed.setTitle(`${emotes.siren}  PRZESTARZALE, UZYJ \`${pf}newclear\``) 
                    embed.setThumbnail("https://cdn.discordapp.com/attachments/837601267827998770/845616959952257104/loading.gif") 
    
                    msg = await message.lineReply(embed)  
                  } else {                

                    embed.setColor("RED")
                    embed.setTitle(`${emotes.siren}  PRZESTARZALE, UZYJ \`${pf}newclear\``) 
                    embed.setThumbnail("https://cdn.discordapp.com/attachments/837601267827998770/845616959952257104/loading.gif") 
    
                    msg = await message.lineReply(embed)                     
                }
            }
        }
}
