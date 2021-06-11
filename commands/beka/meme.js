const { MessageEmbed,MessageAttachment } = require("discord.js");
const got = require('got');

module.exports = {
  name: "meme",
  aliases: ["mem", "bm"],
  description: "Losowy mem",
  category: 'beka',
  utilisation: '{prefix}meme',
  
  async execute(client, message, args, pf, cmd) {

    //Start; 1/3
    reactionEmbed = new MessageEmbed()
    .setTitle(`${client.emotes.winLoad} Praca w toku... 1/3`)
    .setDescription(`${client.emotes.google} Losowanie pliku...`)
    .setThumbnail(`https://cdn.discordapp.com/attachments/850848194929492009/852901674997252106/1275442.png`)
    .setFooter(`💡 ${message.author.tag}\n🛠️ v${client.version} ┇ ⚡ RockyBot® 2021`, message.author.avatarURL({dynamic: true}));
    reaction = await message.lineReplyNoMention(reactionEmbed)
    errorEmbed = new MessageEmbed()
    .setTitle(`${client.emotes.warn}  Wystąpił problem z komendą \`${pf}${cmd}\``)
    .setThumbnail(`https://cdn.discordapp.com/attachments/852928154691567669/852928290045427733/753345.png`)
    .setColor('RED')
    .setFooter(`💡 ${message.author.tag}\n🛠️ v${client.version} ┇ ⚡ RockyBot® 2021`, message.author.avatarURL({dynamic: true}));

    //Random meme
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
    //Error in generation
    } catch (error) {
      errorEmbed.setDescription(`${client.emotes.x} Losowanie pliku`)
      reaction.edit(errorEmbed)
      return;
    }

    //2/3
    reactionEmbed.setTitle(`${client.emotes.winLoad} Praca w toku... 2/3`)
    .setDescription(`${client.emotes.grverify} Losowanie pliku\n${client.emotes.google} Tworzenie wiadomości...`)
    await reaction.edit(reactionEmbed)

    //Create embed
    try {
    embed = new MessageEmbed()
    .setColor('RANDOM')
    .setTitle(`${memeTitle}\n👍 ${memeUpvotes} 💬 ${memeNumComments}`)
    .setURL(memeUrl)
    .setFooter(`💡 ${message.author.tag}\n🛠️ v${client.version} ┇ ⚡ RockyBot® 2021`, message.author.avatarURL({dynamic: true}));
    //Error in creating embed
    } catch (error) {
      errorEmbed.setDescription(`${client.emotes.grverify} Losowanie pliku\n${client.emotes.x} Tworzenie wiadomości`)
      reaction.edit(errorEmbed)
      return;
    }

    //3/3
    reactionEmbed.setTitle(`${client.emotes.winLoad} Praca w toku.. 3/3`)
    .setDescription(`${client.emotes.grverify} Losowanie pliku\n${client.emotes.grverify} Tworzenie wiadomości\n${client.emotes.google} Załączanie pliku...`)
    await reaction.edit(reactionEmbed)
    
    //Send 
    try {
      attachment = new MessageAttachment(memeImage)
    await message.lineReplyNoMention({embed, files: [attachment] })
    //Error in attaching
    } catch (error) {
      errorEmbed.setDescription(`${client.emotes.grverify} Losowanie pliku\n${client.emotes.grverify} Tworzenie wiadomości\n${client.emotes.x} Załączanie pliku`)
      reaction.edit(errorEmbed)
      return;
    }

    //Ready
    await reaction.delete()
  }
}
