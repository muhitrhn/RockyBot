const { MessageEmbed,MessageAttachment } = require("discord.js");
const got = require('got');

module.exports = {
  name: "meme",
  aliases: ["mem", "fm"],
  description: "Losowy mem",
  category: 'fun',
  utilisation: '{prefix}fm',
  async execute(client, message, args, pf, cmd) {
    
    const reaction = await client.base.get(`cmd`).start(client, message, cmd)

    try {

      let memeUrl, memeImage, memeTitle, memeUpvotes, memeNumComments
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

        const attachment = new MessageAttachment(memeImage, 'image.gif')
        const embed = new MessageEmbed()
        .setColor('RANDOM')
        .setTitle(`${memeTitle}\n👍 ${memeUpvotes} 💬 ${memeNumComments}`)
        .setURL(memeUrl)
        .setFooter(`💡 ${message.author.tag}\n🛠️ v${client.version} ┇ ⚡ RockyBot® 2021`, message.author.avatarURL({dynamic: true}));
        await message.lineReplyNoMention({embed, files: [attachment] })

      //Ready
      await reaction.delete()

    } catch (err) {
      await client.base.get(`cmd`).error(client, message, pf, cmd, reaction, err)
    }
  }
}
