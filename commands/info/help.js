require('discord-reply');
const { MessageEmbed } = require("discord.js");


  module.exports = {
    name: "help",
    aliases: ['h', 'pomoc', 'p'],
    description: "Pomoc dotycząca bota",
    category: 'info',
    utilisation: '{prefix}help <nazwa komendy>',

    async execute(client, message, args) {  
        const emotes = client.emotes
        reaction = await message.react(emotes.google)
        const embed = new MessageEmbed()
        .setColor('RANDOM')
        .setFooter(`💡 ${message.author.tag}\n🛠️ v${client.version}`, message.author.displayAvatarURL())
        .setImage("https://cdn.discordapp.com/attachments/783091756593053726/810591417838731315/1JOZT-rbar.gif")
        .setTimestamp()
        if (!args[0]) {
            embed.setTitle(`${emotes.google}  Pomoc przybyła xD`)

            const avatar = client.commands.filter(x => x.category == 'avatar').map((x) => `\`` + x.name + '`').join(client.emotes.yellowDot);
            const beka = client.commands.filter(x => x.category == 'beka').map((x) => `\`` + x.name + '`').join(client.emotes.yellowDot);
            const muzyka = client.commands.filter(x => x.category == 'muzyka').map((x) => `\`` + x.name + '`').join(client.emotes.yellowDot);
            const info = client.commands.filter(x => x.category == 'info').map((x) => `\`` + x.name + '`').join(client.emotes.yellowDot);
            const moderacja = client.commands.filter(x => x.category == "moderacja").map((x) => `\`` + x.name + '`').join(client.emotes.yellowDot);

            embed.addField(`🤿  Avatar`, avatar)
            embed.addField(`🤣  Beka`, beka)
            embed.addField(`${emotes.rbverify}  Muzyka`, `${muzyka} ${emotes.magentaDot}  **Dostępne filtry muzyczne | *Użycie filtrów: ${client.prefix}filter <filtr>***\n${client.playerFilters.map((x) => `\`` + x + '`').join(` | `)}`)
            embed.addField(`${emotes.ubuntu}  Info`, info)
            if(message.member.hasPermission('MANAGE_MESSAGES')){
                embed.addField(`${emotes.staff}  Moderacja`, moderacja)
            }

            embed.setDescription(`${emotes.system}  Użyto komendy **${message.content}**\n${emotes.magentaDot}  **${client.prefix}help <nazwa komendy>** ~ pomoc z konkretną komendą`)
            await message.lineReplyNoMention(embed)
            if(reaction) await reaction.remove()
        } else {
            const command = client.commands.get(args.join(" ").toLowerCase()) || client.commands.find(x => x.aliases && x.aliases.includes(args.join(" ").toLowerCase()));
            
            if (!command) {
                  msg = await message.lineReply(emotes.x)
                  message.react(emotes.x)
                  if(reaction) await reaction.remove()
                  await msg.react("<a:timer6:844672772169138197>")
                  setTimeout(() => {
                      msg.delete()
                  }, 5500);
                
            } else {
              embed.setTitle(`${client.emotes.siri}  Pomoc dotycząca **${command.name}**, już się robi xD`)
              embed.addField(`Opis`, command.description, true)
                embed.addField(`Alias(y)`, command.aliases.length < 1 ? '-' : command.aliases.join(', '), true)
                embed.addField(`Użycie`, command.utilisation.replace(`{prefix}`, client.prefix), true)
                embed.setDescription(`${emotes.system}  Użyto komendy **${message.content}**\n${emotes.world}Wymagane argumenty: \`[]\`, opcjonalne argumenty: \`<>\`.`)
              await message.lineReplyNoMention(embed)
              if(reaction) reaction.remove()
            }
      } 
  }
}