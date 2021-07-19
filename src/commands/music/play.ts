import { CommandInteraction, MessageEmbed } from 'discord.js'
import { NoSubscriberBehavior, StreamType, createAudioPlayer, createAudioResource, joinVoiceChannel } from '@discordjs/voice'
import ytdl from 'ytdl-core'
import spotify from 'spotify-url-info'
import prettyMs from 'pretty-ms'
import { default as YouTube } from 'youtube-sr'
import { config, queue } from '../..'

async function execute(interaction: CommandInteraction) {
  let serverQueue = queue.get(interaction.guildId)
  
  const embed = new MessageEmbed()
    .setColor('RANDOM')
    .setFooter(`🛠️ v${config.version} ┇ ⚡ RockyBot® 2021`, interaction.user.displayAvatarURL({dynamic: true}))

  //@ts-ignore
  const voiceChannel = interaction.member.voice.channel

  if (!voiceChannel) {
    embed.setTitle(`${config.emotes.world}  Nie jesteś na kanale głosowym`)
      .setThumbnail(config.cmds.errorImgs[Math.floor(Math.random() * config.cmds.errorImgs.length)])
      .setColor('#FFC000')

    await interaction.reply({embeds: [embed], ephemeral: true})
    return
  }

  if (!voiceChannel.joinable || !voiceChannel.speakable) {
    embed.setTitle('🔒  Bot nie ma wymaganych uprawnień...')
      .setThumbnail(config.cmds.errorImgs[Math.floor(Math.random() * config.cmds.errorImgs.length)])
      .setDescription('**...ŁĄCZENIE lub ROZMOWA**')
      .setColor('RED')

    await interaction.reply({embeds: [embed], ephemeral: true})
    return
  }

  await interaction.defer()

  let songs = [], playlist, cache, progress = 0
  const type = checkType(interaction.options.getString('muzyka', true))

  if (type === 'youtube_video') {
    const songInfo = await YouTube.getVideo(interaction.options.getString('muzyka', true))
    songs.push({
      title: songInfo.title,
      length: prettyMs(songInfo.duration),
      id: songInfo.id
    })
  } 
  else if (type === 'youtube_playlist') {
    playlist = await YouTube.getPlaylist(interaction.options.getString('muzyka', true))
    await playlist.fetch()
    playlist.videos.forEach(song => {
      songs.push({
        title: song.title,
        length: prettyMs(song.duration),
        id: song.id
      })
    })
  }
  else if (type === 'youtube_search') {
    //@ts-ignore
    const song = await YouTube.search(interaction.options.getString('muzyka', true), { limit: 1 })
    if (song[0]) {
      songs.push({
        //@ts-ignore
        title: song[0].title,
        //@ts-ignore
        length: prettyMs(song[0].duration),
        //@ts-ignore
        id: song[0].id
      })
    }
    else {
      embed.setTitle(`${config.emotes.grverify} Nie znalazłem wyników...`)
        .setDescription(`**...dla zapytania \`${interaction.options.getString('muzyka', true)}\` w serwisie Youtube**`)
        .setFooter(`🛠️ v${config.version} ┇ ⚡ RockyBot® 2021`, interaction.user.displayAvatarURL({dynamic: true}))
        .setThumbnail(config.cmds.errorImgs[Math.floor(Math.random() * config.cmds.errorImgs.length)])

      await interaction.editReply({embeds: [embed]})
      return
    }
  }
  else if (type === 'spotify_song') {
    const spotifyData = await spotify.getData(interaction.options.getString('muzyka', true))
    if (spotifyData) {
      //@ts-ignore
      const song = await YouTube.search(spotifyData.name + ' - ' + spotifyData.artists[0].name, { limit: 1 })
      songs.push({
        //@ts-ignore
        title: song[0].title,
        //@ts-ignore
        length: prettyMs(song[0].duration),
        //@ts-ignore
        id: song[0].id
      })
    }
  } 
  else if (type === 'spotify_playlist') {
    playlist = await spotify.getTracks(interaction.options.getString('muzyka', true))
    if (playlist) {
      cache = playlist.length - 1
      const embThum  = config.cmds.musicImgs.add[Math.floor(Math.random() * config.cmds.musicImgs.add.length)]
      embed.setTitle(`${config.emotes.winLoad} Dodaję \`${playlist.length}\` utworów do kolejki...`)
        .setFooter(`🛠️ v${config.version} ┇ ⚡ RockyBot® 2021`, interaction.user.displayAvatarURL({dynamic: true}))
        .setThumbnail(embThum)
        .setDescription(`**...kanału ${voiceChannel.toString()}**\n\n${config.emotes.google} Użyłeś linku do playlisty spotify, teraz muszę znaleźć każdy utwór na youtube...\n${config.emotes.gearspin} Ukończono: **${progress}%**`)
      await interaction.editReply({embeds: [embed]})

      //@ts-ignore
      const song = await YouTube.search(playlist[0].name + ' - ' + playlist[0].artists[0].name, { limit: 1 })

      songs.push({
        //@ts-ignore
        title: song[0].title,
        //@ts-ignore
        length: prettyMs(song[0].duration),
        //@ts-ignore
        id: song[0].id
      })
      playlist.shift()
    }
  }
      
  if (!serverQueue) {
    const connection = joinVoiceChannel({
      channelId: voiceChannel.id,
      //@ts-ignore
      guildId: interaction.guildId?.toString(),
      selfDeaf: true,
      adapterCreator: voiceChannel.guild.voiceAdapterCreator
    })

    const player = createAudioPlayer({
      behaviors: {
        noSubscriber: NoSubscriberBehavior.Pause,
        maxMissedFrames: 10000
      }
    })

    const queueConstruct = {
      player: player,
      textChannel: interaction.channel,
      voiceChannel: voiceChannel,
      repeatMode: 'queue',
      connection: connection,
      songs: songs,
      volume: 100,
      playing: true
    }

    queue.set(interaction.guildId, queueConstruct)
    serverQueue = queue.get(interaction.guildId)
    serverQueue.connection.subscribe(player)

    await play(interaction)

    serverQueue.connection.on('stateChange', async (o: any, n: any) => {
      if(n.status === 'disconnected') {
        await serverQueue.player.stop()
        serverQueue.songs = []
        return play(interaction)
      }
      return
    })

    serverQueue.player.on('idle', async () => {
      if (!serverQueue.repeatMode) {
        serverQueue.songs.shift()
      } 
      else if (serverQueue.repeatMode === 'queue') {
        serverQueue.songs.push(serverQueue.songs[0])
        serverQueue.songs.shift()
      } 
  
      return play(interaction)
    })
    serverQueue.player.on('error', () => {return})

     /*   const checkch = setInterval(async () => {
          if(!voiceChannel.members.filter(x => x.user.id !== client.user.id).map(x => x)[0]) {
            const embed = new MessageEmbed()
              .setColor('RANDOM')
              .setFooter(`❌ Zatrzymano\n🛠️ v${client.version} ┇ ⚡ RockyBot® 2021`, interaction.user.displayAvatarURL({dynamic: true}))
              .setTitle(`${client.emotes.rverify} Kanał jest pusty...`)
              .setDescription(`**...opuściłem kanał ${serverQueue.voiceChannel.toString()}**\n*${client.emotes.gearspin} Kolejka została wyczyszczona*`)
              .setThumbnail(client.cmds.errorImgs[Math.floor(Math.random() * client.cmds.errorImgs.length)])

            await serverQueue.textChannel.send({embeds: [embed]})
            await serverQueue.connection.destroy()
            client.queue.delete(interaction.guild.id)
            clearInterval(checkch)
          }
        }, 1 * 60000) */
  } 

  if (cache) {
    //@ts-ignore
    for (const spotifyData of playlist) {
      embed.setDescription(`**...kanału ${voiceChannel.toString()}**\n\n${config.emotes.google} *Użyłeś linku do playlisty spotify, teraz wyszukuję każdy utwór na youtube...*\n${config.emotes.gearspin} Ukończono: **${progress}%**`)
      await interaction.editReply({embeds: [embed]})

      //@ts-ignore
      const song = await YouTube.search(spotifyData.name + ' - ' + spotifyData.artists[0].name)
      songs.push({
        title: song[0].title,
        length: prettyMs(song[0].duration),
        id: song[0].id
      })
      //@ts-ignore
      progress = Math.round(100-cache/playlist.length*100)
      cache = cache - 1
    }
  }

  if (serverQueue) {
    songs.forEach(song => {
      serverQueue.songs.push(song)
    })
  }

  if (type === 'spotify_playlist' || type === 'youtube_playlist') {
    embed.setTitle(`${config.emotes.grverify} Dodałem \`${songs.length}\` utworów...`)
      .setDescription(`**...do kolejki kanału ${voiceChannel.toString()}**`)
      .setFooter(`💡 Utworów w kolejce: ${serverQueue.songs.length}\n🛠️ v${config.version} ┇ ⚡ RockyBot® 2021`, interaction.user.displayAvatarURL({dynamic: true}))
      .setThumbnail(config.cmds.musicImgs.add[Math.floor(Math.random() * config.cmds.musicImgs.add.length)])
      } 
  else {
    embed.setTitle(`${config.emotes.grverify} Dodałem \`${songs[0].title}\` do kolejki...`)
      .setDescription(`**...kanału ${voiceChannel.toString()}**`)
      .setFooter(`💡 Utworów w kolejce: ${serverQueue.songs.length}\n🛠️ v${config.version} ┇ ⚡ RockyBot® 2021`, interaction.user.displayAvatarURL({dynamic: true}))
      .setThumbnail(config.cmds.musicImgs.add[Math.floor(Math.random() * config.cmds.musicImgs.add.length)])
  }
      
  await interaction.editReply({embeds: [embed]})

  if (interaction.channelId !== serverQueue.textChannel.id) {
    await serverQueue.textChannel.send({embeds: [embed]})
  }
  return
} 

 function checkType(query: any) {
    const spotifySongRegex = /https?:\/\/(?:embed\.|open\.)(?:spotify\.com\/)(?:track\/|\?uri=spotify:track:)((\w|-){22})/
    const spotifyPlaylistRegex = /https?:\/\/(?:embed\.|open\.)(?:spotify\.com\/)(?:playlist\/|\?uri=spotify:playlist:)((\w|-){22})/

    if (spotifySongRegex.test(query) && query.startsWith('http')) return 'spotify_song'
    if (spotifyPlaylistRegex.test(query) && query.startsWith('http')) return 'spotify_playlist'
    if (YouTube.validate(query, 'PLAYLIST')) return 'youtube_playlist'
    if (YouTube.validate(query, 'VIDEO')) return 'youtube_video'

    return 'youtube_search'
  }

async function play(interaction: CommandInteraction) {
  const serverQueue = queue.get(interaction.guildId)
  const song = serverQueue.songs[0]

  if (!song) {
    const embed = new MessageEmbed()
      .setColor('RANDOM')
      .setFooter(`❌ Zatrzymano\n🛠️ v${config.version} ┇ ⚡ RockyBot® 2021`, interaction.user.displayAvatarURL({dynamic: true}))
      .setTitle(`${config.emotes.rverify} Koniec kolejki...`)
      .setDescription(`**...kanału ${serverQueue.voiceChannel.toString()}**`)
      .setThumbnail(config.cmds.errorImgs[Math.floor(Math.random() * config.cmds.errorImgs.length)])

    await serverQueue.textChannel.send({embeds: [embed]})
    await serverQueue.connection.destroy()
    return queue.delete(interaction.guildId)
  }

  let songId = song.id
      
  if (song.author) {
    const toPlay = await YouTube.search(song.title + ' - ' + song.author)
    songId = toPlay[0].id
  }

  const resource = createAudioResource(ytdl(songId, { filter: 'audioonly' }), {
    inputType: StreamType.Arbitrary
  })


  await serverQueue.player.play(resource)

  const embed = new MessageEmbed()
    .setColor('RANDOM')
    .setFooter(`💡 Utworów w kolejce: ${serverQueue.songs.length}\n🛠️ v${config.version} ┇ ⚡ RockyBot® 2021`, interaction.user.displayAvatarURL({dynamic: true}))
    .setTitle(`${config.emotes.boombox} Teraz odtwarzam \`${song.title}\`...`)
    .setDescription(`**...na kanale ${serverQueue.voiceChannel.toString()}**`)
    .setThumbnail(config.cmds.musicImgs.play[Math.floor(Math.random() * config.cmds.musicImgs.play.length)])

  serverQueue.textChannel.send({embeds: [embed]})
} 

const options = {
  name: 'play',
  description: '🎵 Zagraj muzykę',
  type: 1, 
  options: [
    {
      type: 'STRING',
      name: 'muzyka',
      description: '📛 Nazwa/link do playlisy/utworu youtube/spotify',
      required: true
    }
  ]
}

export { execute, options }