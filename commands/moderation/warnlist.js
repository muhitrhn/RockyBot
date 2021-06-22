const { MessageButton, MessageActionRow } = require('discord-buttons')
const { MessageEmbed } = require('discord.js')
const warnModel = require('../../models/warns')

module.exports = {
  name: 'warnlist',
  aliases: ['mwl'],
  description: 'Wyświetl ostrzeżenia',
  category: 'moderation',
  utilisation: '{prefix}mwl [wzmianka/id]',
  async execute(client, message, args, pf, cmd) {
    const reaction = await client.base.get('cmd').start(client, message, cmd)

    try {
      const mentioned = await client.base.get('check').member(client, message, args)
      await client.commands.get('warnlist').list(client, message, args, pf, cmd, mentioned, reaction)
    }
    catch (err) {
      await client.base.get('cmd').error(client, message, pf, cmd, reaction, err)
    }
  },

  async list(client, message, args, pf, cmd, mentioned, reaction, page, bt, embedColor){
    try {
      const embed = new MessageEmbed()
      .setThumbnail(mentioned.user.displayAvatarURL({ dynamic: true }))
      .setFooter(`💡 ${message.author.tag}\n🛠️ v${client.version} ┇ ⚡ RockyBot® 2021`, message.author.displayAvatarURL({dynamic: true}))

      if (!page) {page = 1}
      let num = (page*5)-4
      const warnDatas = await warnModel.find({ User: mentioned.id, GuildID: message.guild.id })
      if (!warnDatas.length) {
        embed.setTitle(`${client.emotes.grverify}  Użytkownik...`)
        .setDescription(`**...[${mentioned.user.tag}](https://discord.com/users/${mentioned.id}) nie posiada warnów**`)
        .setColor('RANDOM')
        await reaction.edit({ embed: embed })
        return
      }
      let maxPage
      if (warnDatas.length <= 5) {maxPage = 1}
      else {maxPage = Math.ceil(warnDatas.length/5)}
      let warns = [] 
      const warnsPage = warnDatas.slice(5*(page-1), page*5)
      warnsPage.forEach(y => {
        warns.push(`**#${num}**: Moderator${message.guild.member(y.ModID) ? `: **[${message.guild.member(y.ModID).user.tag}` : `o id: **[${y.ModID}`}](https://discord.com/users/${y.ModID})**\n${client.emotes.grverify} Powód: **${y.Reason}**\n||${client.emotes.yellowDot} ID: **${y._id}**||\n\n`)
        num = num + 1
      })  
      const embedDesc = warns.map(x => x).join(' ')
      embed.setTitle(`${client.emotes.world}  Lista warnów użytkownika...`)
      .setDescription(`**...[${mentioned.user.tag}](https://discord.com/users/${mentioned.id})**\n\n` + embedDesc + `${client.emotes.gearspin} *Strona **${page}**/**${maxPage}***`)
      if (embedColor) {
        embed.setColor(embedColor)
      }
      else {
        embed.setColor('RANDOM')
      }

      const button = new MessageButton()
      .setLabel('')
      .setEmoji(client.emotes.arrl_ID)
      .setID('back')
      if (page === 1) {
        button.setStyle('grey')
        .setDisabled()
      } else {
        button.setStyle('blurple')
      }

      const button2 = new MessageButton()
      .setLabel('')
      .setEmoji(client.emotes.arrr_ID)
      .setID('next')
      if (maxPage - page === 0) {
        button2.setStyle('grey')
        .setDisabled()
      } else {
        button2.setStyle('blurple')
      }

      const buttonRow = new MessageActionRow()
      .addComponent(button)
      .addComponent(button2)

      await reaction.edit({ embed: embed, component: buttonRow })
        
      // eslint-disable-next-line no-empty
      try {await bt.defer()} catch (err) {}

      if (maxPage === 1) {
        return
      }
      const filter = (button) => button.clicker.user.id === message.author.id
      const collector = await reaction.createButtonCollector(filter, { time: 30000, dispose: true })
      const filter2 = (button) => button.clicker.user.id !== message.author.id
      const collector2 = reaction.createButtonCollector(filter2, { time: 30000, dispose: true })

      collector.on('collect', async buttonClick => {
        await collector.stop()
        await collector2.stop()
        let pageToProv
        if (buttonClick.id === 'next'){
          pageToProv = page + 1
        } 
        else if (buttonClick.id === 'back') {
          pageToProv = page - 1
        }
        await client.commands.get('warnlist').list(client, message, args, pf, cmd, mentioned, reaction, pageToProv, buttonClick, embed.color)
        return
      })
      

      collector2.on('collect', async buttonClick => {
        const replyEmbed = new MessageEmbed().setColor('RED').setDescription(`**${client.emotes.grverify} Nie wywołałeś tej wiadomości**`).setFooter(`🛠️ v${client.version} ┇ ⚡ RockyBot® 2021 Reply Engine`, buttonClick.clicker.user.displayAvatarURL({dynamic: true}))
        await buttonClick.reply.send({ embed: replyEmbed, ephemeral: true })
      })
      
      return
    }
    catch (err) {
      await client.base.get('cmd').error(client, message, pf, cmd, reaction, err)
      console.log(err)
    }
  }
}