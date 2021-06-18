const { MessageEmbed } = require("discord.js");
const prefixModel = require("../../models/prefix")

module.exports = {
  name: "prefix",
  aliases: [`gop`],
  description: "Zmień prefix serwera",
  category: 'options',
  utilisation: '{prefix}prefix <nowy prefix>',
  
  async execute(client, message, args, pf, cmd) {
    
    //Start; 1/3
    const reactionEmbed = new MessageEmbed()
    .setTitle(`${client.emotes.winLoad} Praca w toku... 1/3`)
    .setDescription(`${client.emotes.arrr} Sprawdzanie permisji...`)
    .setThumbnail(`https://cdn.discordapp.com/attachments/850848194929492009/852901674997252106/1275442.png`)
    .setFooter(`💡 ${message.author.tag}\n🛠️ v${client.version} ┇ ⚡ RockyBot® 2021`, message.author.avatarURL({dynamic: true}))
    .setColor(`BLUE`)
    
    const reaction = await message.lineReplyNoMention(reactionEmbed)

    try {
      const errEmbed = new MessageEmbed()
      .setTitle(`${client.emotes.warn}  Wystąpił problem z komendą \`${pf}${cmd}\``)
      .setThumbnail(`https://cdn.discordapp.com/attachments/852928154691567669/852928290045427733/753345.png`)
      .setColor('RED')
      .setFooter(`💡 ${message.author.tag}\n🛠️ v${client.version} ┇ ⚡ RockyBot® 2021`, message.author.avatarURL({dynamic: true}));

      const oldPrefix = pf

      //PermsCheck
      let permsCheck = 1
      try {
        if(!message.member.hasPermission('MANAGE_GUILD') && !client.ownerID.includes(message.author.id)) {
          permsCheck = 0
        }
      } catch (err) {
        errEmbed.setDescription(`${client.emotes.x} Sprawdzanie permisji`)
        reaction.edit(errEmbed)
        return;
      }

      try {
        if(permsCheck === 0) {
          //PermsCheck: missing user perms
          errEmbed.setThumbnail(`https://cdn.discordapp.com/attachments/852928154691567669/852976002178220052/891399.png`)
          .setDescription(`${client.emotes.warn} Sprawdzanie permisji: **Brakujące uprawnienia: \`ZARZĄDZANIE SERWEREM\`**`)
          .setTitle(`${client.emotes.rverify}  Znaleziono problemy z permisjami`)
          .setColor('#FFC000')
          reaction.edit(errEmbed)
          return;
        }
      } catch (err) {return;}

      reactionEmbed.setTitle(`${client.emotes.winLoad} Praca w toku... 2/3`)
      .setDescription(`${client.emotes.grverify} Sprawdzanie permisji\n${client.emotes.arrr} Sprawdzanie argumentów`)
      await reaction.edit(reactionEmbed)

      let ArgsCheck = 1
      try {
        if (!args[0]) ArgsCheck = 0
      } catch (err) {
        errEmbed.setDescription(`${client.emotes.grverify} Sprawdzanie permisji\n${client.emotes.x} Sprawdzanie argumentów`)
        reaction.edit(errEmbed)
        return;
      }

      try {
        if (ArgsCheck === 0){
          //ArgsCheck: missing argument
          errEmbed.setThumbnail(`https://cdn.discordapp.com/attachments/852928154691567669/852976002178220052/891399.png`)
          .setDescription(`${client.emotes.grverify} Sprawdzanie permisji\n${client.emotes.rverify} Sprawdzanie argumentów: **Nie podałeś nowego prefixu**`)
          .setTitle(`${client.emotes.rverify}  Znaleziono problemy z argumentami`)
          .setColor('#FFC000')
          reaction.edit(errEmbed)
          return;
        }
      } catch (err) {return;}

      reactionEmbed.setTitle(`${client.emotes.winLoad} Praca w toku... 3/3`)
      .setDescription(`${client.emotes.grverify} Sprawdzanie permisji\n${client.emotes.grverify} Sprawdzanie argumentów\n${client.emotes.arrr} Zmiana prefixu, używając bazy danych...`)
      await reaction.edit(reactionEmbed)
      
      try {
        const data = await prefixModel.findOne({
          GuildID: message.guild.id
        }); 
          
        if (data) {
          await prefixModel.findOneAndRemove({
            GuildID: message.guild.id
          }) 
        }

        let newData = new prefixModel({
          Prefix: args[0],
          GuildID: message.guild.id
        })

        newData.save();
      } catch (err) {
        errEmbed.setDescription(`${client.emotes.grverify} Sprawdzanie permisji\n${client.emotes.grverify} Sprawdzanie argumentów\n${client.emotes.x} Zmiana prefixu, używając bazy danych`)
        reaction.edit(errEmbed)
        return;
      }

      try {
        reactionEmbed.setColor('RANDOM')
        .setTitle(`${client.emotes.changelog}  Zmieniono prefix z \`${oldPrefix}\` na \`${args[0]}\``)
        .setThumbnail(`https://cdn.discordapp.com/attachments/850848194929492009/852278226364792893/190411.png`)
        .setDescription(`${client.emotes.grverify} Sprawdzanie permisji\n${client.emotes.grverify} Sprawdzanie argumentów\n${client.emotes.grverify} Zmiana prefixu, używając bazy danych`)
        reaction.edit(reactionEmbed)
      } catch (err) {return;}

    } catch (err) {
      const embed = new MessageEmbed()
      .setTitle(`${client.emotes.warn}  Zatrzymano komendę \`${cmd}\` z powodu wycieku błędu`)
      .setThumbnail(`https://cdn.discordapp.com/attachments/850848194929492009/854001906962530334/1810746.png`)
      .setFooter(`💡 ${message.author.tag}\n🛠️ v${client.version} ┇ ⚡ RockyBot® 2021`, message.author.avatarURL({dynamic: true}))
      .setColor('RED')
      try {await reaction.delete()} catch (err) {}
      await message.channel.send(embed)
      return;
    }
  }
}