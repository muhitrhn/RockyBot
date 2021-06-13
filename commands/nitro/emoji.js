const { MessageEmbed } = require('discord.js');

module.exports = {
    name: "emoji",
    aliases: ["ne"],
    description: 'Wysyła emoji o podanej nazwie',
    category: 'nitro',
    utilisation: '{prefix}emoji <nazwa emoji>',
    async execute(client, message, args, pf, cmd) {

   //Start; 1/5
   reactionEmbed = new MessageEmbed()
   .setTitle(`${client.emotes.winLoad} Praca w toku... 1/5`)
   .setDescription(`${client.emotes.google} Sprawdzanie argumentów...`)
   .setThumbnail(`https://cdn.discordapp.com/attachments/850848194929492009/852901674997252106/1275442.png`)
   .setFooter(`💡 ${message.author.tag}\n🛠️ v${client.version} ┇ ⚡ RockyBot® 2021`, message.author.avatarURL({dynamic: true}))
   .setColor(`BLUE`)
   const reaction = await message.lineReplyNoMention(reactionEmbed)
   errorEmbed = new MessageEmbed()
   .setTitle(`${client.emotes.warn}  Wystąpił problem z komendą \`${pf}${cmd}\``)
   .setThumbnail(`https://cdn.discordapp.com/attachments/852928154691567669/852928290045427733/753345.png`)
   .setColor('RED')
   .setFooter(`💡 ${message.author.tag}\n🛠️ v${client.version} ┇ ⚡ RockyBot® 2021`, message.author.avatarURL({dynamic: true}));

    try { 
        if (!args[0]) {
            x = 0
        } else {
            x = 1
        }

    } catch (error) {
      errorEmbed.setDescription(`${client.emotes.x} Sprawdzanie argumentów`)
      reaction.edit(errorEmbed)
      return;
    }

    try {
        if(x === 0) {
        errorEmbed.setDescription(`${client.emotes.rverify} Sprawdzanie argumentów: **Nie napisałeś nazwy emoji**`)
        .setTitle(`${client.emotes.x}  Znaleziono problemy z argumentami`)
        .setColor('#FFC000')
        reaction.edit(errorEmbed)
        return;
        } } catch (err) {}

      //2/5
      reactionEmbed.setTitle(`${client.emotes.winLoad} Praca w toku... 2/5`)
      .setDescription(`${client.emotes.grverify} Sprawdzanie argumentów\n${client.emotes.google} Wyszukiwanie emoji...`)
      await reaction.edit(reactionEmbed)

      try {

        emoji = await client.emojis.cache.find(emojii => emojii.name.toLowerCase().includes(args[0].toLowerCase()))

       } catch (err) {
        errorEmbed.setDescription(`${client.emotes.grverify} Sprawdzanie argumentów\n${client.emotes.x} Wyszukiwanie emoji`)
        reaction.edit(errorEmbed)
        return;
       }

    if (!emoji) {
        errorEmbed.setDescription(`${client.emotes.grverify} Sprawdzanie argumentów\n${client.emotes.rverify} Wyszukiwanie emoji: **Nie znaleziono emoji**`)
        .setTitle(`${client.emotes.x}  Znaleziono problemy z emoji`)
        .setColor('#FFC000')
        reaction.edit(errorEmbed)
        return;
    }

    //3/5
    reactionEmbed.setTitle(`${client.emotes.winLoad} Praca w toku... 3/5`)
    .setDescription(`${client.emotes.grverify} Sprawdzanie argumentów\n${client.emotes.grverify} Wyszukiwanie emoji\n${client.emotes.google} Sprawdzanie webhooków...`)
    await reaction.edit(reactionEmbed)

    try {
      const webhooks = await message.channel.fetchWebhooks()
      myWebhooks = await webhooks.filter(wbhk => wbhk.owner.id == client.user.id)
      if (!myWebhooks.first()) {
        x = 0
      }
      else {
        x = 1
      }
    } catch (err) {
      errorEmbed.setDescription(`${client.emotes.grverify} Sprawdzanie argumentów\n${client.emotes.grverify} Wyszukiwanie emoji\n${client.emotes.x} Sprawdzanie webhooków`)
      reaction.edit(errorEmbed)
      console.log(err)
      return;
    }

    //4/5
    reactionEmbed.setTitle(`${client.emotes.winLoad} Praca w toku... 4/5`)
    .setDescription(`${client.emotes.grverify} Sprawdzanie argumentów\n${client.emotes.grverify} Wyszukiwanie emoji\n${client.emotes.grverify} Sprawdzanie webhooków\n${client.emotes.google} ${x ? `Edytowanie` : `Tworzenie`} webhooka...`)
    await reaction.edit(reactionEmbed)

    try {
      if (x === 0) {
      webhook = await message.channel.createWebhook(message.author.username, { avatar: message.author.avatarURL() })
      }
      else {
      webhook = await myWebhooks.first().edit({
          name: message.author.username,
          avatar: message.author.avatarURL(),
        })
      }
    } catch (err) {
      errorEmbed.setDescription(`${client.emotes.grverify} Sprawdzanie argumentów\n${client.emotes.grverify} Wyszukiwanie emoji\n${client.emotes.grverify} Sprawdzanie webhooków\n${client.emotes.x} ${x ? `Edytowanie` : `Tworzenie`} webhooka`)
      reaction.edit(errorEmbed)
      console.log(err)
      return;
    }

    //5/5
    reactionEmbed.setTitle(`${client.emotes.winLoad} Praca w toku... 5/5`)
    .setDescription(`${client.emotes.grverify} Sprawdzanie argumentów\n${client.emotes.grverify} Wyszukiwanie emoji\n${client.emotes.grverify} Sprawdzanie webhooków\n${client.emotes.grverify} ${x ? `Edytowanie` : `Tworzenie`} webhooka\n${client.emotes.google} Sprawdzanie uprawnień webhooka...`)
    await reaction.edit(reactionEmbed)
    try {
    if (message.guild.roles.everyone.permissions.has('USE_EXTERNAL_EMOJIS')) {
      await webhook.send(emoji.toString())
    } else {
    reactionEmbed.setTitle(`${client.emotes.x}  Znaleziono problemy z uprawnieniami`)
    .setDescription(`${client.emotes.grverify} Sprawdzanie argumentów\n${client.emotes.grverify} Wyszukiwanie emoji\n${client.emotes.grverify} Sprawdzanie webhooków\n${client.emotes.grverify} ${x ? `Edytowanie` : `Tworzenie`} webhooka\n${client.emotes.rverify} Sprawdzanie uprawnień webhooka: **Webhook nie może używać emoji z innych serwerów**`)
    await reaction.edit(reactionEmbed)
    return;
    }
    } catch (err) {
    errorEmbed.setDescription(`${client.emotes.grverify} Sprawdzanie argumentów\n${client.emotes.grverify} Wyszukiwanie emoji\n${client.emotes.grverify} Sprawdzanie webhooków\n${client.emotes.grverify} ${x ? `Edytowanie` : `Tworzenie`} webhooka\n${client.emotes.x} Sprawdzanie uprawnień webhooka`)
    await reaction.edit(errorEmbed)
    console.log(err)
    return;
    }

     
   //READY
   reactionEmbed.setTitle(`${client.emotes.nitro}  Wysłano emoji`)
   .setDescription(`${client.emotes.grverify} Sprawdzanie argumentów\n${client.emotes.grverify} Wyszukiwanie emoji\n${client.emotes.grverify} Sprawdzanie webhooków\n${client.emotes.grverify} ${x ? `Edytowanie` : `Tworzenie`} webhooka\n${client.emotes.grverify} Sprawdzanie uprawnień webhooka`)
   await reaction.edit(reactionEmbed)
  }
}