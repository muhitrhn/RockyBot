const { MessageEmbed } = require('discord.js');

  module.exports = {
    name: "clear",
    aliases: ["mc"],
    description: "Czyści podaną liczbę wiadomości",
    category: 'moderation',
    utilisation: '{prefix}clear [liczba >2 i <99]',

    async execute(client, message, args) {
      emotes = client.emotes
      reaction = await message.react(client.emotes.google)
      embed = new MessageEmbed()
        if(!message.member.hasPermission('MANAGE_MESSAGES') || !message.guild.me.hasPermission('MANAGE_MESSAGES')) {
              embed.setColor("#FF0000")
              embed.setTitle("🔒  Komenda niedostępna")
              embed.setDescription(`${emotes.siren} Brakujące uprawnienia: \`ZARZĄDZANIE WIADOMOŚCIAMI\`\n${emotes.warn} Upewnij się, że **bot i Ty** macie potrzebne **uprawnienia**`)        
              embed.setImage("https://cdn.discordapp.com/attachments/843892434743722044/844163249041309696/siren.gif")
              embed.setFooter(`💡 ${message.author.tag}\n🛠️ v${client.version}`, message.author.displayAvatarURL())
              embed.setTimestamp()
              message.lineReply(embed)
              .then(msg => {
                if(reaction) reaction.remove()
                message.react(emotes.x)
                msg.delete({ timeout: 8000 })
              })
        } else {
              amount = await parseInt(args[0]);
              if (isNaN(amount) || amount < 2 || amount > 99) {
                msg = await message.lineReply(emotes.x)
                 await message.react(emotes.x)
                 await msg.react(emotes.timer6)
                  if(reaction) await reaction.remove()
                      setTimeout(() => {
                        msg.delete()
                      }, 5500);
              } else {                

                await message.channel.bulkDelete(amount + 1)

                embed.setColor("#32CD32")
                embed.setTitle(`${emotes.grverify}  Usunięto ${amount} wiadomości`) 
                embed.setThumbnail(message.client.user.displayAvatarURL())
                embed.setImage("https://cdn.discordapp.com/attachments/837601267827998770/845616959952257104/loading.gif") 
                embed.setDescription(`${emotes.rverify} *Jeśli któraś z wiadomości była starsza niż 14 dni komenda nie powiodła się*\n${client.emotes.staff} *Powered by **message.channel.bulkDelete()***\n\n${client.emotes.ubuntu} XDDD`)
    
                msg = await message.channel.send(embed)
                setTimeout(async () => {
                await msg.delete()
                }, 5000);                     
            }
           }
    }
}