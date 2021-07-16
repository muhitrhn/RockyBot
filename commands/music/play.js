const { MessageEmbed } = require('discord.js')
const { NoSubscriberBehavior, StreamType, createAudioPlayer, createAudioResource, joinVoiceChannel } = require('@discordjs/voice')
const ytdl = require('ytdl-core')
const spotify = require('spotify-url-info')
const prettyMs = require('pretty-ms')
const YouTube = require('youtube-sr').default

module.exports = {

  async execute(client, interaction) {
    try {
      let serverQueue = client.queue.get(interaction.guild.id)

      const embed = new MessageEmbed()
        .setColor('RANDOM')
        .setFooter(`🛠️ v${client.version} ┇ ⚡ RockyBot® 2021`, interaction.user.displayAvatarURL({dynamic: true}))

      const voiceChannel = interaction.member.voice.channel

      if (!voiceChannel) {
        embed.setTitle(`${client.emotes.world}  Nie jesteś na kanale głosowym`)
          .setThumbnail(client.cmds.errorImgs[Math.floor(Math.random() * client.cmds.errorImgs.length)])
          .setColor('#FFC000')

        return interaction.reply({embeds: [embed], ephemeral: true})
      }

      if (!voiceChannel.joinable || !voiceChannel.speakable) {
        embed.setTitle('🔒  Bot nie ma wymaganych uprawnień...')
          .setThumbnail(client.cmds.errorImgs[Math.floor(Math.random() * client.cmds.errorImgs.length)])
          .setDescription('**...ŁĄCZENIE lub ROZMOWA**')
          .setColor('RED')

        return interaction.reply({embeds: [embed], ephemeral: true})
      }

      await interaction.defer()

      let songs = [], playlist, cache
      const type = this.checkType(interaction.options.map(x => x.options)[0].map(x => x.value)[0])

      if (type === 'youtube_video') {
        const songInfo = await YouTube.getVideo(interaction.options.map(x => x.options)[0].map(x => x.value)[0])
        songs.push({
          title: songInfo.title,
          length: prettyMs(songInfo.duration),
          id: songInfo.id
        })
      } 
      else if (type === 'youtube_playlist') {
        playlist = await YouTube.getPlaylist(interaction.options.map(x => x.options)[0].map(x => x.value)[0])
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
        const song = await YouTube.search(interaction.options.map(x => x.options)[0].map(x => x.value)[0], { limit: 1 })
        if (song[0]) {
          songs.push({
            title: song[0].title,
            length: prettyMs(song[0].duration),
            id: song[0].id
          })
        }
        else {
          embed.setTitle(`${client.emotes.grverify} Nie znalazłem wyników...`)
            .setDescription(`**...dla zapytania \`${interaction.options.map(x => x.options)[0].map(x => x.value)[0]}\` w serwisie Youtube**`)
            .setFooter(`🛠️ v${client.version} ┇ ⚡ RockyBot® 2021`, interaction.user.displayAvatarURL({dynamic: true}))
            .setThumbnail(client.cmds.errorImgs[Math.floor(Math.random() * client.cmds.errorImgs.length)])

          return interaction.editReply({embeds: [embed]})
        }
      }
      else if (type === 'spotify_song') {
        const spotifyData = await spotify.getData(interaction.options.map(x => x.options)[0].map(x => x.value)[0])
        if (spotifyData) {
          const song = await YouTube.search(spotifyData.name + ' - ' + spotifyData.artists[0].name, { limit: 1 })
          songs.push({
            title: song[0].title,
            length: prettyMs(song[0].duration),
            id: song[0].id
          })
        }
      } 
      else if (type === 'spotify_playlist') {
        playlist = await spotify.getTracks(interaction.options.map(x => x.options)[0].map(x => x.value)[0])
        if (playlist) {
          cache = playlist.length - 1
          const embThum  = client.cmds.musicImgs.add[Math.floor(Math.random() * client.cmds.musicImgs.add.length)]
          embed.setTitle(`${client.emotes.winLoad} Dodaję \`${playlist.length}\` utworów do kolejki...`)
            .setFooter(`🛠️ v${client.version} ┇ ⚡ RockyBot® 2021`, interaction.user.displayAvatarURL({dynamic: true}))
            .setThumbnail(embThum)
            .setDescription(`**...kanału ${voiceChannel.toString()}**\n\n${client.emotes.google} Użyłeś linku do playlisty spotify, teraz muszę znaleźć każdy utwór na youtube...\n${client.emotes.gearspin} Pozostało: **${cache}**`)
          await interaction.editReply({embeds: [embed]})

          const song = await YouTube.search(playlist[0].name + ' - ' + playlist[0].artists[0].name, { limit: 1 })

          songs.push({
            title: song[0].title,
            length: prettyMs(song[0].duration),
            id: song[0].id
          })
          playlist.shift()
        }
      }
      
      if (!serverQueue) {
        const connection = joinVoiceChannel({
          channelId: voiceChannel.id,
          guildId: interaction.guild.id,
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

        await client.queue.set(interaction.guild.id, queueConstruct)
        serverQueue = client.queue.get(interaction.guild.id)
        serverQueue.connection.subscribe(player)

        await this.play(client, interaction)

        serverQueue.connection.on('stateChange', async (o, n) => {
          if(n.status === 'disconnected') {
            await serverQueue.player.stop()
            serverQueue.songs = []
            return this.play(client, interaction)
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
  
          return this.play(client, interaction)
        })
        serverQueue.player.on('error', () => {return})

        const checkch = setInterval(async () => {
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
            return clearInterval(checkch)
          }
        }, 1000)

        if (cache) {
          for (const spotifyData of playlist) {
            embed.setDescription(`**...kanału ${voiceChannel.toString()}**\n\n${client.emotes.google} *Użyłeś linku do playlisty spotify, teraz wyszukuję każdy utwór na youtube...*\n${client.emotes.gearspin} Pozostało: **${cache}**`)
            await interaction.editReply({embeds: [embed]})

            const song = await YouTube.search(spotifyData.name + ' - ' + spotifyData.artists[0].name, { limit: 1 })
            songs.push({
              title: song[0].title,
              length: prettyMs(song[0].duration),
              id: song[0].id
            })
            cache = cache - 1
          }
        }
        
      } else {

        if (cache) {
          for (const spotifyData of playlist) {
            embed.setDescription(`**...kanału ${voiceChannel.toString()}**\n\n${client.emotes.google} Użyłeś linku do playlisty spotify, teraz muszę znaleźć każdy utwór na youtube...\n${client.emotes.gearspin} Pozostało: **${cache}**`)
            await interaction.editReply({embeds: [embed]})

            const song = await YouTube.search(spotifyData.name + ' - ' + spotifyData.artists[0].name, { limit: 1 })
            songs.push({
              title: song[0].title,
              length: prettyMs(song[0].duration),
              id: song[0].id
            })
            cache = cache - 1
          }
        }

        songs.forEach(song => {
          serverQueue.songs.push(song)
        })
      }

      if (type === 'spotify_playlist' || type === 'youtube_playlist') {
        embed.setTitle(`${client.emotes.grverify} Dodałem \`${songs.length}\` utworów...`)
          .setDescription(`**...do kolejki kanału ${voiceChannel.toString()}**`)
          .setFooter(`💡 Utworów w kolejce: ${serverQueue.songs.length}\n🛠️ v${client.version} ┇ ⚡ RockyBot® 2021`, interaction.user.displayAvatarURL({dynamic: true}))
          .setThumbnail(client.cmds.musicImgs.add[Math.floor(Math.random() * client.cmds.musicImgs.add.length)])
      } 
      else {
        embed.setTitle(`${client.emotes.grverify} Dodałem \`${songs[0].title}\` do kolejki...`)
          .setDescription(`**...kanału ${voiceChannel.toString()}**`)
          .setFooter(`💡 Utworów w kolejce: ${serverQueue.songs.length}\n🛠️ v${client.version} ┇ ⚡ RockyBot® 2021`, interaction.user.displayAvatarURL({dynamic: true}))
          .setThumbnail(client.cmds.musicImgs.add[Math.floor(Math.random() * client.cmds.musicImgs.add.length)])
      }
      
      await interaction.editReply({embeds: [embed]})

      if (interaction.channel.id !== serverQueue.textChannel.id) {
        await serverQueue.textChannel.send({embeds: [embed]})
      }
      return
    } 
    catch (err) {
      console.error(err)
      return client.base.get('cmd').error(client, interaction, err)
    }
  },

  checkType(query) {
    const spotifySongRegex = /https?:\/\/(?:embed\.|open\.)(?:spotify\.com\/)(?:track\/|\?uri=spotify:track:)((\w|-){22})/
    const spotifyPlaylistRegex = /https?:\/\/(?:embed\.|open\.)(?:spotify\.com\/)(?:playlist\/|\?uri=spotify:playlist:)((\w|-){22})/

    if (spotifySongRegex.test(query) && query.startsWith('http')) return 'spotify_song'
    if (spotifyPlaylistRegex.test(query) && query.startsWith('http')) return 'spotify_playlist'
    if (YouTube.validate(query, 'PLAYLIST')) return 'youtube_playlist'
    if (YouTube.validate(query, 'VIDEO')) return 'youtube_video'

    return 'youtube_search'
  },

  async play(client, interaction) {
    try {
      const serverQueue = client.queue.get(interaction.guild.id)
      const song = serverQueue.songs[0]

      if (!song) {
        const embed = new MessageEmbed()
          .setColor('RANDOM')
          .setFooter(`❌ Zatrzymano\n🛠️ v${client.version} ┇ ⚡ RockyBot® 2021`, interaction.user.displayAvatarURL({dynamic: true}))
          .setTitle(`${client.emotes.rverify} Koniec kolejki...`)
          .setDescription(`**...kanału ${serverQueue.voiceChannel.toString()}**`)
          .setThumbnail(client.cmds.errorImgs[Math.floor(Math.random() * client.cmds.errorImgs.length)])

        await serverQueue.textChannel.send({embeds: [embed]})
        await serverQueue.connection.destroy()
        return client.queue.delete(interaction.guild.id)
      }

      let songId = song.id
      
      if (song.author) {
        const toPlay = await YouTube.search(song.title + ' - ' + song.author, { limit: 1 })
        songId = toPlay[0].id
      }

      const resource = createAudioResource(ytdl(songId, { filter: 'audioonly' }), {
        inputType: StreamType.Arbitrary
      })


      await serverQueue.player.play(resource)

      const embed = new MessageEmbed()
        .setColor('RANDOM')
        .setFooter(`💡 Utworów w kolejce: ${serverQueue.songs.length}\n🛠️ v${client.version} ┇ ⚡ RockyBot® 2021`, interaction.user.displayAvatarURL({dynamic: true}))
        .setTitle(`${client.emotes.boombox} Teraz odtwarzam \`${song.title}\`...`)
        .setDescription(`**...na kanale ${serverQueue.voiceChannel.toString()}**`)
        .setThumbnail(client.cmds.musicImgs.play[Math.floor(Math.random() * client.cmds.musicImgs.play.length)])

      serverQueue.textChannel.send({embeds: [embed]})
    } 
    catch (err) {
      console.error(err)
      return client.base.get('cmd').error(client, interaction, err)
    }
  }
}