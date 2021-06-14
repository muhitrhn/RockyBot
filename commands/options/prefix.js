const { MessageEmbed } = require("discord.js");
const prefixModel = require("../../models/prefix")

module.exports = {
  name: "prefix",
  aliases: [`gop`],
  description: "Zmień prefix serwera",
  category: 'options',
  utilisation: '{prefix}prefix <nowy prefix>',

  async execute(client, message, args, prefix) {
    const oldPrefix = prefix

    const reaction = await message.react(client.emotes.google)

    const embed = new MessageEmbed()
    .setFooter(`💡 ${message.author.tag}\n🛠️ v${client.version}`, message.author.displayAvatarURL({dynamic: true}))
    .setTimestamp()

    if(!message.member.hasPermission('MANAGE_GUILD') && !client.ownerID.includes(message.author.id)) {
        embed.setColor("RED")
        .setTitle("🔒  Komenda niedostępna")
        .setDescription(`${client.emotes.siren} Brakujące uprawnienia: \`ZARZĄDZANIE SERWEREM\`\n${client.emotes.warn} Upewnij się, że masz potrzebne **uprawnienia**\n\n${client.emotes.rverify} *Trwają prace nad zmianą na nowy typ komendy (buildprogress i lepsza wydajność), wyczekuj wersji 0.18.5~1*`) 
        .setThumbnail("https://cdn.discordapp.com/attachments/837601267827998770/845616959952257104/loading.gif")       
        if(reaction) await reaction.remove()
        message.lineReply(embed)
        .then(msg => {
            message.react(client.emotes.x)
            msg.delete({ timeout: 8000 })
          })
    } else if (!args[0]) {
        embed.setColor("RED")
        .setTitle(`${client.emotes.question}  Jaki prefix chcesz ustawić?`)
        .setDescription(`${client.emotes.rverify} *Trwają prace nad zmianą na nowy typ komendy (buildprogress i lepsza wydajność), wyczekuj wersji 0.18.5~1*`)
        .setThumbnail("https://cdn.discordapp.com/attachments/837601267827998770/845616959952257104/loading.gif")       
        if(reaction) await reaction.remove()
        message.lineReply(embed)
        .then(msg => {
            message.react(client.emotes.x)
            msg.delete({ timeout: 8000 })
          })
        } else {
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

        embed.setColor('GREEN')
        .setTitle(`${client.emotes.grverify}  Zmieniono prefix z \`${oldPrefix}\` na \`${args[0]}\``)
        .setThumbnail(`https://cdn.discordapp.com/attachments/850848194929492009/852278226364792893/190411.png`)
        .setDescription(`${client.emotes.rverify} *Trwają prace nad zmianą na nowy typ komendy (buildprogress i lepsza wydajność), wyczekuj wersji 0.18.5~1*`)
        message.lineReplyNoMention(embed)
        if(reaction) await reaction.remove()
            
        }


}
}