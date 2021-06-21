const { MessageButton, MessageActionRow } = require('discord-buttons');
const { MessageEmbed } = require('discord.js');

module.exports = {
  name: "ban",
  aliases: ["mb"],
  description: 'Zbanuj kogoś',
  category: 'moderation',
  utilisation: '{prefix}mb [wzmianka/id]',
  async execute(client, message, args, pf, cmd) {
    
    const reaction = await client.base.get(`cmd`).start(client, message, cmd)

    try {

      const button = new MessageButton()

      let permsCheck = 2
      if (!message.guild.me.permissionsIn(message.channel).has('BAN_MEMBERS')) {
        permsCheck = 0
      } else if (!message.member.permissionsIn(message.channel).has('BAN_MEMBERS')  && !client.ownerID.includes(message.author.id)) {
        permsCheck = 1
      }

      const missingPerms = 'BANOWANIE CZŁONKÓW'
      if (permsCheck === 0) {
        //PermsCheck: missing bot perms
        const ifBot = 1
        await client.base.get(`check`).missingPerms(client, message, reaction, missingPerms, ifBot)
        return;
      } else if (permsCheck === 1) {
        //PermsCheck: missing user perms
        await client.base.get(`check`).missingPerms(client, message, reaction, missingPerms)
        return;
      }
        
      const mentioned = await client.base.get(`check`).member(client, message, args)
      const embed = new MessageEmbed()
      .setColor('RANDOM')
      .setFooter(`💡 ${message.author.tag}\n🛠️ v${client.version} ┇ ⚡ RockyBot® 2021`, message.author.avatarURL({dynamic: true}))

      if (mentioned === message.member) {
        embed.setTitle(`${client.emotes.siren}  Nie podano właściwego użytkownika...`)
        .setDescription(`**...podaj id lub oznacz użytkownika**`)
        .setThumbnail(client.cmds.errorImgs[Math.floor(Math.random() * client.cmds.errorImgs.length)])
        .setColor('#FFC000')
        await reaction.edit({embed: embed})
        return;
      }

      if (!mentioned.bannable) {
        embed.setTitle(`${client.emotes.warn}  Nie mogę zbanować użytkownika...`)
        .setDescription(`**...${mentioned}, prawdopodobnie ma rolę wyższą od mojej**`)
        .setThumbnail(client.cmds.errorImgs[Math.floor(Math.random() * client.cmds.errorImgs.length)])
        .setColor('#FFC000')
        await reaction.edit({embed: embed})
        return;
      }

      let reason, reasonToProvide

      if (args[0] === mentioned.id || args[0] === `<@${mentioned.id}>` || args[0] === `<@!${mentioned.id}>` ) {
        if (args[1]) {
          reason = args.slice(1).join(" ")
          reasonToProvide = "Mod: " + message.author.tag + "┇" + message.author.id + ";  Reason: " + args.slice(1).join(" ")
        } else {
          reason = 0
          reasonToProvide = "Mod: " + message.author.tag + "┇" + message.author.id + ";  Reason not provided"
        }
      } else {
        if (args[0]) {
          reason = args.join(" ")
          reasonToProvide = "Mod: " + message.author.tag + "┇" + message.author.id + ";  Reason: " + args.join(" ")
        } else {
          reason = 0
          reasonToProvide = "Mod: " + message.author.tag + "┇" + message.author.id + ";  Reason not provided"
        }
      }

      embed.setTitle(`${client.emotes.siren}  Czy na pewno chcesz zbanować...`)

      if (reason === 0)
        embed.setDescription(`**...użytkownika ${mentioned}, nie podając powodu?**`)
      else {
        embed.setDescription(`**...użytkownika ${mentioned}, podając powód**\n\n\`${reason}\`**?**`)
      }

      embed.setThumbnail(client.cmds.loadingImgs[Math.floor(Math.random() * client.cmds.loadingImgs.length)])

      button.setLabel("TAK")
      .setStyle("red")
      .setEmoji(client.emotes.grverify_ID)
      .setID(`ban`)
      const button2 = new MessageButton()
      .setLabel("NIE")
      .setStyle("green")
      .setEmoji(client.emotes.rverify_ID)
      .setID('cancel')
      const buttonRow = new MessageActionRow()
      .addComponent(button)
      .addComponent(button2)

      reaction.edit({embed: embed, component: buttonRow})

      const filter = (button) => button.clicker.user.id === message.author.id && button.id === 'ban';
      const filter2 = (button) => button.clicker.user.id === message.author.id && button.id === 'cancel';
      const filter3 = (button) => button.clicker.user.id !== message.author.id;
      const collector = reaction.createButtonCollector(filter, { time: 30000, dispose: true });
      const collector2 = reaction.createButtonCollector(filter2, { time: 30000, dispose: true });
      const collector3 = reaction.createButtonCollector(filter3, { time: 30000, dispose: true });

      collector.on('collect', buttonClick => {
        collector.stop()
        collector2.stop()
        collector3.stop()
        
        mentioned.ban({ reason: reasonToProvide })

        embed.setTitle(`${client.emotes.staff}  Zbanowano użytkownika...`)
        if (reason === 0)
          embed.setDescription(`**...[${mentioned.user.tag}](https://discord.com/users/${mentioned.id}), nie podając powodu**`)
        else {
          embed.setDescription(`**...[${mentioned.user.tag}](https://discord.com/users/${mentioned.id}), podając powód**\n\n\`${reason}\``)
        }
        embed.setThumbnail(client.cmds.doneImgs[Math.floor(Math.random() * client.cmds.doneImgs.length)])
        .setImage(client.cmds.moderationImgs.ban[Math.floor(Math.random() * client.cmds.moderationImgs.ban.length)])

        reaction.edit({embed: embed})
        return;
      })

      collector2.on('collect', buttonClick => {
        collector.stop()
        collector2.stop()
        collector3.stop()

        embed.setTitle(`${client.emotes.rverify}  Anulowano banowanie użytkownika...`)
        .setDescription(`**...${mentioned}**`)
        .setThumbnail(client.cmds.errorImgs[Math.floor(Math.random() * client.cmds.errorImgs.length)])

        reaction.edit({embed: embed})
        return;
      })

      collector3.on('collect', buttonClick => {
        const replyEmbed = new MessageEmbed().setColor('RED').setDescription(`**${client.emotes.grverify} Nie wywołałeś tej wiadomości**`).setFooter(`🛠️ v${client.version} ┇ ⚡ RockyBot® 2021 Reply Engine`, buttonClick.clicker.user.avatarURL({dynamic: true}))
        buttonClick.reply.send({ embed: replyEmbed, ephemeral: true })   
      })

    } catch (err) {
      await client.base.get(`cmd`).error(client, message, pf, cmd, reaction, err)
    }
  }
}