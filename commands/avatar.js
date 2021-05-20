require('discord-reply');
const { version } = require('../package.json');
const { MessageEmbed,MessageAttachment } = require('discord.js');
const DIG = require("discord-image-generation");

try {
module.exports = {
  name: "avatar",
  description: 'Wysyła avatar twój/oznaczonego użytkownika', // Required for slash commands
  execute(message,args) {
 message.react("<a:Google_Loading:826382993948934164>")

 if(args[0]) {
  var arg = args[0].toLowerCase();
} else {
  var arg = undefined
}

let embed = new MessageEmbed()
.setColor('RANDOM')
.setTimestamp()
.setFooter(`💡 ${message.author.tag}\n🛠️ v${version}\n`, message.author.avatarURL())
.setImage("https://cdn.discordapp.com/attachments/783091756593053726/810591417838731315/1JOZT-rbar.gif")

//NO MENTIONS
if (!message.mentions.members.size) {
  var mentioned = "User {id: 'undefined'}"
  if (!message.author.avatarURL()) {
    embed.setTitle(`<a:Warning:826731315570278461>  ${message.author.tag} nie ma avataru ¯\\_(ツ)_/¯`)
    message.lineReplyNoMention(embed).then(() => message.reactions.cache.get('826382993948934164').remove())
    var avatar = undefined
  } else {
    embed.setDescription(`<:systemmessageuser:838387012230053917>  Użyto komendy: **${message}**`)
    var avatar = `${message.author.displayAvatarURL({ dynamic: false, format: 'png' })}?size=4096`
  }
//SOMEONE MENTIONED
} else {
  var mentioned = message.mentions.users.first()
  if(!mentioned.displayAvatarURL()) {
    embed.setTitle(`<a:Warning:826731315570278461>  ${mentioned.tag} nie ma avataru ¯\\_(ツ)_/¯`)
    message.lineReplyNoMention(embed).then(() => message.reactions.cache.get('826382993948934164').remove())
    var avatar = undefined
  } else {
    embed.setDescription(`<:systemmessageuser:838387012230053917>  Użyto komendy: **${message}**`)
    var avatar = `${mentioned.displayAvatarURL({ dynamic: false, format: `png` })}?size=4096`
  }
}


if(avatar){
//.AVATAR
    if(!arg || args[0] === `<@${mentioned.id}>` || args[0] === `<@!${mentioned.id}>`){
      message.lineReplyNoMention({embed, files: [avatar] }).then(() => message.reactions.cache.get('826382993948934164').remove())
    }


//.DELETE
    else if(arg === "delete"){
      new DIG.Delete().getImage(avatar).then((image) => {
      let attachment = new MessageAttachment(image, "delete.png")
      message.lineReplyNoMention({embed, files: [attachment]}).then(() => message.reactions.cache.get('826382993948934164').remove())})
    }


//.INVERT
    else if(arg === "invert"){
      new DIG.Invert().getImage(avatar).then((image) => {
      let attachment = new MessageAttachment(image, "invert.png")
      message.lineReplyNoMention({embed, files: [attachment]}).then(() => message.reactions.cache.get('826382993948934164').remove())})
      }


//.JAIL
    else if(arg === "jail"){
      new DIG.Jail().getImage(avatar).then((image) => {
      let attachment = new MessageAttachment(image, "jail.png")
      message.lineReplyNoMention({embed, files: [attachment]}).then(() => message.reactions.cache.get('826382993948934164').remove())})
    }


//.NOTSTONKS
    else if(arg === "notstonks"){
      new DIG.NotStonk().getImage(avatar).then((image) => {
        let attachment = new MessageAttachment(image, "NotStonks.png")
        message.lineReplyNoMention({embed, files: [attachment]}).then(() => message.reactions.cache.get('826382993948934164').remove())})
    }


//.STONKS
    else if(arg === "stonks"){
      new DIG.Stonk().getImage(avatar).then((image) => {
      let attachment = new MessageAttachment(image, "stonks.png")
      message.lineReplyNoMention({embed, files: [attachment]}).then(() => message.reactions.cache.get('826382993948934164').remove())})
    }


//.TRIGGER/TRIGGERED
    else if(arg === "trigger" || arg === "triggered"){
      new DIG.Triggered().getImage(avatar).then((image) => {
        let attachment = new MessageAttachment(image, "triggered.gif")
        message.lineReplyNoMention({embed, files: [attachment]}).then(() => message.reactions.cache.get('826382993948934164').remove())})
    }



//CANCEL
    else {
      setTimeout(() => {
        message.lineReply("<a:vega_x:844675044415897630>").then((msg) => {
          message.reactions.cache.get('826382993948934164').remove()
          msg.react("<a:timer6:844672772169138197>").then(() => {
              setTimeout(() => {
                msg.delete()
              }, 5500);
            })})
      }, 500);
    }
  }
  }
}
} catch (error) {
  console.log(error)
}