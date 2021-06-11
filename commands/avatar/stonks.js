const { MessageEmbed,MessageAttachment } = require('discord.js');
const DIG = require("discord-image-generation");

module.exports = {
    name: "stonks",
    aliases: ["as"],
    description: 'STONKS!',
    category: 'avatar',
    utilisation: '{prefix}stonks <wzmianka>',
    async execute(client, message, args, pf, cmd) {

      //Start; 1/4
      reactionEmbed = new MessageEmbed()
      .setTitle(`${client.emotes.winLoad} Praca w toku... 1/4`)
      .setDescription(`${client.emotes.google} Tworzenie wiadomości...`)
      .setThumbnail(`https://cdn.discordapp.com/attachments/850848194929492009/852901674997252106/1275442.png`)
      .setFooter(`💡 ${message.author.tag}\n🛠️ v${client.version} ┇ ⚡ RockyBot® 2021`, message.author.avatarURL({dynamic: true}));
      reaction = await message.lineReplyNoMention(reactionEmbed)
      errorEmbed = new MessageEmbed()
      .setTitle(`${client.emotes.warn}  Wystąpił problem z komendą \`${pf}${cmd}\``)
      .setThumbnail(`https://cdn.discordapp.com/attachments/852928154691567669/852928290045427733/753345.png`)
      .setColor('RED')
      .setFooter(`💡 ${message.author.tag}\n🛠️ v${client.version} ┇ ⚡ RockyBot® 2021`, message.author.avatarURL({dynamic: true}));
   
       try { 
       embed = new MessageEmbed()
       .setColor('RANDOM')
       .setFooter(`💡 ${message.author.tag}\n🛠️ v${client.version} ┇ ⚡ RockyBot® 2021`, message.author.avatarURL({dynamic: true}))
       } catch (error) {
         errorEmbed.setDescription(`${client.emotes.x} Tworzenie wiadomości`)
         reaction.edit(errorEmbed)
         return;
       }
   
         //2/4
         reactionEmbed.setTitle(`${client.emotes.winLoad} Praca w toku... 2/4`)
         .setDescription(`${client.emotes.grverify} Tworzenie wiadomości\n${client.emotes.google} Sprawdzanie wzmianek...`)
         await reaction.edit(reactionEmbed)
   
   
   //NO MENTIONS
   if (!message.mentions.members.size) {
   
        //3/4
        reactionEmbed.setTitle(`${client.emotes.winLoad} Praca w toku... 3/4`)
        .setDescription(`${client.emotes.grverify} Tworzenie wiadomości\n${client.emotes.grverify} Nie znaleziono wzmianek: wybieranie ${message.author}\n${client.emotes.google} Przerabianie avataru...`)
        await reaction.edit(reactionEmbed)
   
        //CREATE IMAGE
       try {
      doneAv = await new DIG.Stonk().getImage(`${message.author.displayAvatarURL({ dynamic: false, format: "png" })}?size=4096`)
      } catch (error) {
      errorEmbed.setDescription(`${client.emotes.grverify} Tworzenie wiadomości\n${client.emotes.grverify} Nie znaleziono wzmianek: wybieranie ${message.author}\n${client.emotes.x} Przerabianie avataru`)
      reaction.edit(errorEmbed)
      return;
      }

      //4/4
      reactionEmbed.setTitle(`${client.emotes.winLoad} Praca w toku... 4/4`)
      .setDescription(`${client.emotes.grverify} Tworzenie wiadomości\n${client.emotes.grverify} Nie znaleziono wzmianek: wybieranie ${message.author}\n${client.emotes.grverify} Przerabianie avataru\n${client.emotes.google} Załączanie avataru...`)
      await reaction.edit(reactionEmbed)

      //ATTACH AV
      try {
        let attachment = new MessageAttachment(doneAv, "stonks.png")
        await message.lineReplyNoMention({embed, files: [attachment]})
       } catch (error) {
        errorEmbed.setDescription(`${client.emotes.grverify} Tworzenie wiadomości\n${client.emotes.grverify} Nie znaleziono wzmianek: wybieranie ${message.author}\n${client.emotes.grverify} Przerabianie avataru\n${client.emotes.x} Załączanie avataru`)
        reaction.edit(errorEmbed)
         return;
       }
           
   //SOMEONE MENTIONED
     } else {
        const mentioned = message.mentions.users.first()
        //3/4
        reactionEmbed.setTitle(`${client.emotes.winLoad} Praca w toku... 3/4`)
        .setDescription(`${client.emotes.grverify} Tworzenie wiadomości\n${client.emotes.grverify} Wzmianka: ${mentioned}\n${client.emotes.google} Przerabianie avataru...`)
        await reaction.edit(reactionEmbed)
   
        //CREATE IMAGE
       try {
      doneAv = await new DIG.Stonk().getImage(`${mentioned.displayAvatarURL({ dynamic: false, format: "png" })}?size=4096`)
      } catch (error) {
      errorEmbed.setDescription(`${client.emotes.grverify} Tworzenie wiadomości\n${client.emotes.grverify} Wzmianka: ${mentioned}\n${client.emotes.x} Przerabianie avataru`)
      reaction.edit(errorEmbed)
      return;
      }

      //4/4
      reactionEmbed.setTitle(`${client.emotes.winLoad} Praca w toku... 4/4`)
      .setDescription(`${client.emotes.grverify} Tworzenie wiadomości\n${client.emotes.grverify} Wzmianka: ${mentioned}\n${client.emotes.grverify} Przerabianie avataru\n${client.emotes.google} Załączanie avataru...`)
      await reaction.edit(reactionEmbed)

      //ATTACH AV
      try {
        let attachment = new MessageAttachment(doneAv, "stonks.png")
        await message.lineReplyNoMention({embed, files: [attachment]})
       } catch (error) {
        errorEmbed.setDescription(`${client.emotes.grverify} Tworzenie wiadomości\n${client.emotes.grverify} Wzmianka: ${mentioned}\n${client.emotes.grverify} Przerabianie avataru\n${client.emotes.x} Załączanie avataru`)
        reaction.edit(errorEmbed)
         return;
       }
        
       }
   
      //READY
      await reaction.delete() 
   
     }
}