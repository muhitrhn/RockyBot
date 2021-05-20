require('discord-reply');
const { version } = require('../package.json');
const { MessageEmbed } = require("discord.js");
const i = "<:LightBlueSmallDot:844561940248395787>"
const f = "<:MagentaSmallDot:844562735198765096>"

try {
module.exports = {
  name: "help",
  description: 'Pomoc', // Required for slash commands
  execute(message,args) {
    message.react("<a:Google_Loading:826382993948934164>")
    const embed = new MessageEmbed()
    .setColor("RANDOM")
    .setTitle(`<a:Staff:843734135972691968>  Pomoc dotarła xD`)
    .setThumbnail(message.client.user.displayAvatarURL())
    .setImage("https://cdn.discordapp.com/attachments/783091756593053726/810591417838731315/1JOZT-rbar.gif")
    .setFooter(`💡 ${message.author.tag}\n🛠️ v${version}`, message.author.displayAvatarURL())
    embed.setTimestamp()

    if(args[0]){
    var arg = args[0].toLowerCase();
    }
    
    //Normal help
    if(!args[0]) {
    embed.setDescription(`<:systemmessageuser:838387012230053917>  Użyto komendy **${message}**`)
    embed.addField("<:ubuntu:837617906971181057>  Użycie: \`help <argument>\`\n<a:greenverify:837704119086612502>  Dostępne argumenty", `
    ${f} \`avatar\`\n${i} \`beka\`\n${f} \`info\`\n${i} \`moderacja\`\n
    `)
    message.lineReplyNoMention(embed).then(() => message.reactions.cache.get('826382993948934164').remove())
   } 




   //Avatar help
   else if(arg === "avatar") {
    embed.setDescription(`<:systemmessageuser:838387012230053917>  Użyto komendy **${message}**`)
    embed.addField(`\n<:ubuntu:837617906971181057>  Użycie: \`avatar <argument>\`\n<:motherboard:843225362015191061>  \*  -  opcjonalne\n<a:greenverify:837704119086612502>  Dostępne argumenty`, `
    ${f} wzmianka\*\n${i} \`delete\` wzmianka\*\n${f} \`invert\` wzmianka*\n${i} \`jail\` wzmianka\*\n${f} \`notStonks\` wzmianka*\n${i} \`stonks\` wzmianka*\n${f} \`trigger\` || \`triggered\` wzmianka\*
    `)
    message.lineReplyNoMention(embed).then(() => message.reactions.cache.get('826382993948934164').remove())
   }
   


   //Beka help
   else if(arg === "beka") {
    embed.setDescription(`<:systemmessageuser:838387012230053917>  Użyto komendy **${message}**`)
    embed.addField("<:ubuntu:837617906971181057>  Użycie: \`beka <argument>\`\n<a:greenverify:837704119086612502>  Dostępne argumenty komendy", `
    ${f} \`budowa\`\n${i} \`kamien\`\n${f} \`stonoga\`\n${i} \`tuskotronic\`\n${f} \`wideo\`
    `)
    message.lineReplyNoMention(embed).then(() => message.reactions.cache.get('826382993948934164').remove())
   }


   //Info help
   else if(arg === "info") {
    embed.setDescription(`<:systemmessageuser:838387012230053917>  Użyto komendy **${message}**`)
    embed.addField("<:ubuntu:837617906971181057>  Użycie: \`<komenda>\`\n<a:greenverify:837704119086612502>  Dostępne komendy:", `
    ${f} \`info\`\n${i} \`ping\`
    `)
    message.lineReplyNoMention(embed).then(() => message.reactions.cache.get('826382993948934164').remove())
   }


   //Moderation help
   else if(arg === "moderacja") {
    embed.setDescription(`<:systemmessageuser:838387012230053917>  Użyto komendy **${message}**`)
     embed.addField("<:ubuntu:837617906971181057>  Użycie: \`<komenda>\`\n<a:greenverify:837704119086612502>  Dostępne komendy:", `
     ${f} \`clear\`\n${i} ~~\`kick\`~~\n${f}~~\`ban\`~~
     `)
     message.lineReplyNoMention(embed).then(() => message.reactions.cache.get('826382993948934164').remove())
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
}} catch (error) {
  console.log(error)
}
