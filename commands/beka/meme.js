const { MessageEmbed } = require("discord.js");
const got = require('got');

module.exports = {
  name: "meme",
  aliases: ["mem", "bm"],
  description: "Losowy mem",
  category: 'beka',
  utilisation: '{prefix}mem',

  async execute(client, message) {
    reaction = await message.react(client.emotes.google)

    embed = new MessageEmbed()

    got('https://www.reddit.com/r/memes/random/.json')
		.then(async response => {
			const [list] = JSON.parse(response.body);
			const [post] = list.data.children;

			const permalink = post.data.permalink;
			const memeUrl = `https://reddit.com${permalink}`;
			const memeImage = post.data.url;
			const memeTitle = post.data.title;
            const memeUpvotes = post.data.ups;
			const memeNumComments = post.data.num_comments;


			embed.setTitle(`${client.emotes.grverify}  Losowy mem z reddita xD`)
            .setThumbnail(`https://cdn.discordapp.com/attachments/850848194929492009/852263551418236968/1933576.png`)
			.setColor('RANDOM')
			.setImage(memeImage)
            .setDescription(`${client.emotes.system}  Użyto komendy **${message.content}**\n[${memeTitle}](${memeUrl})\n👍 ${memeUpvotes} 💬 ${memeNumComments}`)
            .setFooter(`💡 ${message.author.tag}\n🛠️ v${client.version}`, message.author.displayAvatarURL())
            .setTimestamp()

            
            await message.lineReplyNoMention(embed)
            if(reaction) await reaction.remove()  

		})
  }
}