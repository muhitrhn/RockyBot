require('discord-reply');
const { version } = require('../package.json');
const { MessageEmbed, MessageAttachment } = require('discord.js');
const fs = require('fs');


try {
module.exports = {
  name: "beka",
  description: 'Beka XD', // Required for slash commands
  execute(message,args) {
    message.react("<a:Google_Loading:826382993948934164>")
    
if(args[0]) {
    var arg = args[0].toLowerCase();
} 



   //Niet
if(!args[0]) {
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
   


//Wideo command
else if(arg === "wideo") {
   var images = fs.readdirSync("./cmds_src/wideo/")
    let chosenFile = images[Math.floor(Math.random() * images.length)] 
    let embed = new MessageEmbed()
    embed.setColor('RANDOM')
    embed.setImage("https://cdn.discordapp.com/attachments/783091756593053726/810591417838731315/1JOZT-rbar.gif")
    embed.setDescription(`<:systemmessageuser:838387012230053917>  Użyto komendy **${message}**`)
    embed.setFooter(`💡 ${message.author.tag}\n🛠️ v${version}`, message.author.displayAvatarURL())
    embed.setTimestamp()
   const attachment = new MessageAttachment(`./cmds_src/wideo/${chosenFile}`, 'Wideo.mp4')
   message.lineReplyNoMention({embed, files: [attachment]}).then(() => message.reactions.cache.get('826382993948934164').remove())
}



//Tuskotronic command
else if(arg === "tuskotronic") {
    var images = fs.readdirSync("./cmds_src/tuskotronic/")
    let chosenFile = images[Math.floor(Math.random() * images.length)] 
    let embed = new MessageEmbed()
    embed.setColor('RANDOM')
    embed.setImage("https://cdn.discordapp.com/attachments/783091756593053726/810591417838731315/1JOZT-rbar.gif")
    embed.setDescription(`<:systemmessageuser:838387012230053917>  Użyto komendy **${message}**`)
    embed.setFooter(`💡 ${message.author.tag}\n🛠️ v${version}`, message.author.displayAvatarURL())
    embed.setTimestamp()
   const attachment = new MessageAttachment(`./cmds_src/tuskotronic/${chosenFile}`, 'Tuskotronic.mp4')
   message.lineReplyNoMention({embed, files: [attachment]}).then(() => message.reactions.cache.get('826382993948934164').remove())
}



//Stonoga command
else if(arg === "stonoga") {
    var images = fs.readdirSync("./cmds_src/stonoga/")
    let chosenFile = images[Math.floor(Math.random() * images.length)] 
    let embed = new MessageEmbed()
    embed.setColor('RANDOM')
    embed.setImage("https://cdn.discordapp.com/attachments/783091756593053726/810591417838731315/1JOZT-rbar.gif")
    embed.setDescription(`<:systemmessageuser:838387012230053917>  Użyto komendy **${message}**`)
    embed.setFooter(`💡 ${message.author.tag}\n🛠️ v${version}`, message.author.displayAvatarURL())
    embed.setTimestamp()
   const attachment = new MessageAttachment(`./cmds_src/stonoga/${chosenFile}`, 'ZbychuStonoga.mp4')
   message.lineReplyNoMention({embed, files: [attachment]}).then(() => message.reactions.cache.get('826382993948934164').remove())
}



//Kamień command
else if(arg === "kamien" || arg === "kamień") {
    var images = fs.readdirSync("./cmds_src/kamien/")
    let chosenFile = images[Math.floor(Math.random() * images.length)] 
    let embed = new MessageEmbed()
    embed.setColor('RANDOM')
    embed.setImage("https://cdn.discordapp.com/attachments/783091756593053726/810591417838731315/1JOZT-rbar.gif")
    embed.setDescription(`<:systemmessageuser:838387012230053917>  Użyto komendy **${message}**`)
    embed.setFooter(`💡 ${message.author.tag}\n🛠️ v${version}`, message.author.displayAvatarURL())
    embed.setTimestamp()
   const attachment = new MessageAttachment(`./cmds_src/kamien/${chosenFile}`, 'Kamien XD.png')
   message.lineReplyNoMention({embed, files: [attachment]}).then(() => message.reactions.cache.get('826382993948934164').remove())
    }



  //Budowa command
  else if(arg === "budowa") {

    var images = fs.readdirSync("./cmds_src/budowa/")
    let chosenFile = images[Math.floor(Math.random() * images.length)] 
    let embed = new MessageEmbed()
    embed.setColor('RANDOM')
    embed.setImage("https://cdn.discordapp.com/attachments/783091756593053726/810591417838731315/1JOZT-rbar.gif")
    embed.setDescription(`<:systemmessageuser:838387012230053917>  Użyto komendy **${message}**`)
    embed.setFooter(`💡 ${message.author.tag}\n🛠️ v${version}`, message.author.displayAvatarURL())
    embed.setTimestamp()
   const attachment = new MessageAttachment(`./cmds_src/budowa/${chosenFile}`, 'Budowa wjeżdża! BUDOWA!.mp4')
   message.lineReplyNoMention({embed, files: [attachment]}).then(() => message.reactions.cache.get('826382993948934164').remove())
    }

   //Niet
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
} catch (error) {
  console.log(error)
}