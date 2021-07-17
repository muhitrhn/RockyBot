const { MessageEmbed, MessageAttachment } = require('discord.js')
const got = require('got')

module.exports = {

  async execute(client, interaction, tryCache) {
    if (!tryCache) tryCache = 1
    else tryCache = tryCache + 1
    try {
      // eslint-disable-next-line no-empty
      try {await interaction.defer()} catch (err) {}

      let memeUrl, memeImage, memeTitle, memeUpvotes, memeNumComments
      await got('https://www.reddit.com/r/memes/random/.json')
      .then(async response => {
        const [list] = JSON.parse(response.body)
        const [post] = list.data.children

        const permalink = post.data.permalink
        memeUrl = `https://reddit.com${permalink}`
        memeImage = post.data.url
        memeTitle = post.data.title
        memeUpvotes = post.data.ups
        memeNumComments = post.data.num_comments
      })
      const attachment = new MessageAttachment(memeImage, 'image.gif')

      const embed = new MessageEmbed()
        .setColor('RANDOM')
        .setTitle(`${memeTitle}\n👍 ${memeUpvotes} 💬 ${memeNumComments}`)
        .setURL(memeUrl)
        .setFooter(`🛠️ v${client.version} ┇ ⚡ RockyBot® 2021`, interaction.user.displayAvatarURL({dynamic: true}))
      
      return interaction.editReply({embeds: [embed], files: [attachment]})
    } 
    catch (err) {
      if(tryCache < 5) {
        return client.commands.get('funmeme.js').execute(client, interaction, tryCache)
      }
      return client.base.get('cmd').error(client, interaction, err)
    }
  }
}
