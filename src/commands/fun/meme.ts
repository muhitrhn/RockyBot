import { MessageEmbed, MessageAttachment } from 'discord.js'
import got from 'got'
import { config } from "../.."
import { error } from "../base/cmd"

async function execute(this: any, interaction: any, tryCache: any) {
  if (!tryCache) tryCache = 1
  else tryCache = tryCache + 1
  try {
    // eslint-disable-next-line no-empty
    try {await interaction.defer()} catch (err) {}

    let memeUrl:any , memeImage:any , memeTitle:any, memeUpvotes:any, memeNumComments:any
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
      .setFooter(`🛠️ v${config.version} ┇ ⚡ RockyBot® 2021`, interaction.user.displayAvatarURL({dynamic: true}))
      
    await interaction.editReply({embeds: [embed], files: [attachment]})
  } 
  catch (err) {
    if(tryCache < 5) {
      this.execute(interaction, tryCache)
    }
    error(interaction, err)
  }
}

const options = {
  name: 'meme',
  description: '🖼️ Losowy mem',
  type: 1,
}

export { execute, options }