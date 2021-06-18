const { MessageEmbed,MessageAttachment } = require("discord.js");
const got = require('got');

module.exports = {
  name: "meme",
  aliases: ["mem", "bm"],
  description: "Losowy mem",
  category: 'beka',
  utilisation: '{prefix}bm',
  
  async execute(client, message, args, pf, cmd) {
    
    //Start
    const reactionEmbed = new MessageEmbed()
    .setTitle(`${client.emotes.winLoad} Praca w toku... 1/2`)
    .setDescription(`${client.emotes.arrr} Losowanie pliku...`)
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

      //Random meme
      let memeUrl, memeImage, memeTitle, memeUpvotes, memeNumComments
      try {
        await got('https://www.reddit.com/r/memes/random/.json')
        .then(async response => {
          const [list] = JSON.parse(response.body);
          const [post] = list.data.children;

          const permalink = post.data.permalink;
          memeUrl = `https://reddit.com${permalink}`;
          memeImage = post.data.url;
          memeTitle = post.data.title;
          memeUpvotes = post.data.ups;
          memeNumComments = post.data.num_comments;
        })
      //err in generation
      } catch (err) {
        errEmbed.setDescription(`${client.emotes.x} Losowanie pliku`)
        reaction.edit(errEmbed)
        return;
      }

      reactionEmbed.setTitle(`${client.emotes.winLoad} Praca w toku.. 2/2`)
      .setDescription(`${client.emotes.grverify} Losowanie pliku\n${client.emotes.arrr} Załączanie pliku...`)
      await reaction.edit(reactionEmbed)
      
      //Send
      try {
        const attachment = new MessageAttachment(memeImage)
        const embed = new MessageEmbed()
        .setColor('RANDOM')
        .setTitle(`${memeTitle}\n👍 ${memeUpvotes} 💬 ${memeNumComments}`)
        .setURL(memeUrl)
        .setFooter(`💡 ${message.author.tag}\n🛠️ v${client.version} ┇ ⚡ RockyBot® 2021`, message.author.avatarURL({dynamic: true}));
        await message.lineReplyNoMention({embed, files: [attachment] })
      //err in attaching
      } catch (err) {
        errEmbed.setDescription(`${client.emotes.grverify} Losowanie pliku\n${client.emotes.x} Załączanie pliku`)
        reaction.edit(errEmbed)
        return;
      }

      //Ready
      await reaction.delete()
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
