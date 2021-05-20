require('discord-reply');
const { version } = require('../package.json');
const { MessageEmbed } = require('discord.js');
var prefix = process.env.PREFIX;
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

try {
  module.exports = {
    name: "clear",
    description: 'Clear messages', // Required for slash commands
    async execute(message,args,command) {
      const embed = new MessageEmbed()
        if(!message.member.hasPermission('MANAGE_MESSAGES') || !message.guild.me.hasPermission('MANAGE_MESSAGES')) {
              embed.setColor("#FF0000")
              embed.setTitle("🔒  Komenda niedostępna")
              embed.setDescription("<a:Warning:826731315570278461> Brakujące uprawnienia: `ZARZĄDZANIE WIADOMOŚCIAMI`\n<a:Warning:826731315570278461> Upewnij się, że **bot i Ty** macie potrzebne **uprawnienia**")        
              embed.setImage("https://cdn.discordapp.com/attachments/843892434743722044/844163249041309696/siren.gif")
              embed.setFooter(`💡 ${message.author.tag}\n🛠️ v${version}`, message.author.displayAvatarURL())
              embed.setTimestamp()
              message.lineReplyNoMention(embed)
              .then(msg => {
                msg.delete({ timeout: 8000 })
                message.delete({ timeout: 8000 })
              })
        } else {
              const amount = parseInt(args[0]);
              if (isNaN(amount) || amount < 2) {
                  embed.setColor("#FF0000")
                  embed.setTitle("❌  Ile wiadomości usunąć?")
                  embed.setDescription(`<a:Staff:843734135972691968> Napisz ile wiadomości chcesz usunąć!\n<a:Warning:826731315570278461> Poprawne użycie: \`${prefix}clear {number > 1}\``)        
                  embed.setImage("https://cdn.discordapp.com/attachments/843892434743722044/844163249041309696/siren.gif")
                  embed.setFooter(`💡 ${message.author.tag}\n🛠️ v${version}`, message.author.displayAvatarURL())
                  embed.setTimestamp()
                  message.lineReplyNoMention(embed)
                  .then(msg => {
                    msg.delete({ timeout: 8000 })
                    message.delete({ timeout: 8000 })
                  })
              } else if(amount > 99) {
                  embed.setColor("#FF0000")
                  embed.setTitle("❌  Za duża liczba!")
                  embed.setDescription("<a:Staff:843734135972691968> Możesz usunąć maksymalnie 99 wiadomości za 1 razem.")        
                  embed.setImage("https://cdn.discordapp.com/attachments/843892434743722044/844163249041309696/siren.gif")
                  embed.setFooter(`💡 ${message.author.tag}\n🛠️ v${version}`, message.author.displayAvatarURL())
                  embed.setTimestamp()
                  message.lineReplyNoMention(embed)
                  .then(msg => {
                    msg.delete({ timeout: 8000 })
                    message.delete({ timeout: 8000 })
                  })

              } else {
                embed.setFooter(`💡 ${message.author.tag}\n🛠️ v${version}`, message.author.displayAvatarURL()) 
                embed.setTimestamp()
                
                message.channel.bulkDelete(amount + 1).then((_message) => {

                embed.setColor("#32CD32")
                embed.setTitle(`<a:greenverify:837704119086612502>  Usunięto ${amount} wiadomości`) 
                embed.setThumbnail(message.client.user.displayAvatarURL())
                embed.setImage("https://cdn.discordapp.com/attachments/843892434743722044/844159446455549972/loadingsmall.gif") 
                embed.setDescription("<a:Staff:843734135972691968> *Powered by **message.channel.bulkDelete()***\n\n<:ubuntu:837617906971181057> XDDD")
    
                message.channel.send(embed).then(msg => {
                  setTimeout(() => {
                    msg.delete()
                  }, 5000);             
              })
              })
              setTimeout(() => {
                  embed.setColor("#FF0000")
                  embed.setTitle("<a:Siren:826730448289923072>  Niepowodzenie")

                  embed.setDescription("<a:redverify:837704198388056175> Nie mogę usuwać wiadomości starszych niż 14 dni")
                  embed.setImage("https://cdn.discordapp.com/attachments/843892434743722044/844163249041309696/siren.gif")
                  message.lineReply(embed).then(msg => {
                  setTimeout(() => {
                    message.delete()
                    msg.delete()
                  }, 6000); 
                }) 
              }, 1500);                       
            }
          } 
        }
      }
    } catch(error) {}