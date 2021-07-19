import fs from "fs"
import { error } from "../base/cmd"

export = {
  name: 'music',

  async redirect(interaction: any) {
    try {
      const cmdss = fs.readdirSync('./src/commands/music')
      const cmds = cmdss.filter((x: any) => {x.endsWith('.ts')})
      const dirs = cmdss.filter((x: any) => {!x.endsWith('.ts')})

      if (cmds.includes(interaction.options.map((x: { name: any }) => x.name)[0])) {
        const { execute } = require('./' + interaction.options.map((x: any) => x.name)[0])
        await execute(interaction)
      } 
      else if (dirs.includes(interaction.options.map((x: { name: any }) => x.name)[0])) {
        const { execute } = require('./' + `${interaction.options.map((x: any) => x.name)[0]}/` + interaction.options.map((x: any) => x.name)[0].map((x: any) => x.name)[0])
        await execute(interaction)
      }
    } catch (err) {
      error(interaction, err)
    }
  },

  createCMD(client: any) {
    const cmdss = fs.readdirSync('./src/commands/music')
    const cmds = cmdss.filter((x: any) => {x.endsWith('.ts')})
    const dirs = cmdss.filter((x: any) => {!x.endsWith('.ts')})

    let optionsToProv = []
    for (const file of cmds) {
      if (file === '.handler.ts') return
      const { options } = require(`./${file}`)
      optionsToProv.push(options)
    }

    for (const dir of dirs) {
      const otherHandlerss = fs.readdirSync(`./src/commands/music/${dir}`)
      const otherHandlers = otherHandlerss.filter((x: any) => {x.endsWith('.ts')})
      for (const file of otherHandlers) {
        if (file !== '.handler.ts') return
        const { options } = require(`./${file}`)
        optionsToProv.push(options())
      }
    }
    

    client.application.commands.create({
      name: 'nitro',
      description: '🔰 Kategoria nitro',
      options: optionsToProv 
    })
  },

}

/*
  module.exports = {
    name: 'music',

    async redirect(client, interaction) {
      let command
      if (interaction.options.map(x => x.name)[0] === 'repeat') {
        command = require('./repeat/'+ interaction.options.map(x => x.options)[0].map(x => x.value)[0])
      } 
      else if (interaction.options.map(x => x.name)[0] === 'queue') {
        command = require('./queue/'+ interaction.options.map(x => x.options)[0].map(x => x.name)[0])
      } 
      else {
        command = require('./' + interaction.options.map(x => x.name)[0])
      }
      await command.execute(client, interaction)
    },

    createCMD(client) {
      client.application.commands.create({
        name: 'music',
        description: '🎵 Kategoria muzyka',
        options: [

          //Back command

          {
            name: 'back',
            description: '⏮️ Cofnij utwór',
            type: 1, 
          },

          //Pause command

          {
            name: 'pause',
            description: '⏸️ Zatrzymaj muzykę',
            type: 1, 
          },

          //Play command

          {
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
          },

          //Queue command

          {
            name: 'queue',
            description: '🔢 Kolejka odtwarzania',
            type: 2,
            options: [

              //Queue view command

              {
                name: 'view',
                description: '🔢 Wyświetl kolejkę odtwarzania',
                type: 1
              },

              //Queue clear command

              

              //Queue Delete command

              
            ]
          },

          //Resume command

          {
            name: 'resume',
            description: '▶️ Wznów grę',
            type: 1, 
          },

          //Skip command

          {
            name: 'skip',
            description: '⏭️ Pomiń utwór',
            type: 1, 
          },

          //Stop command

          {
            name: 'stop',
            description: '🛑 Wyczyść kolejkę i skończ grać',
            type: 1, 
          },

          //Repeat command

          {
            name: 'repeat',
            description: '🔁 Zmień tryb powtarzania utworu',
            type: 1,
            options: [
              {
                name: 'typ',
                description: '🔁 Zmień tryb powtarzania utworu',
                type: 'STRING',
                required: true,
                choices: [
                  {
                    name: '❌ Disable',
                    value: 'disable'
                  },
                  {
                    name: '🔁 Queue (default)',
                    value: 'queue'
                  },
                  {
                    name: '🔂 Track',
                    value: 'track'
                  },
                ]
              }
            ] 
          },

        ]
      })
    },

  }
*/