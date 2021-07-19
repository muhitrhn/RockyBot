import { CommandInteraction } from "discord.js"
import fs from "fs"
import { error } from "../base/cmd"

const name = 'music'
const description = '🎵 Kategoria muzyka'

async function redirect(interaction: CommandInteraction) {
  try {
    let subcommand: boolean = false
    try {
      const jo = interaction.options.getSubCommandGroup()
      if (jo) {
        subcommand = true
      }
    } catch (err) {}
     
    if (subcommand) {
      const { execute } = require('./' + `${interaction.options.getSubCommandGroup()}/` + interaction.options.getSubCommand())
      await execute(interaction)
    }
    else {
      const { execute } = require('./' + interaction.options.getSubCommand())
      await execute(interaction)
    }
  } 
  catch (err) {
    error(interaction, err)
    console.log(err)
  }
}

function createCMD(client: any) {
  let optionsToProv = []
  fs.readdirSync(`./src/commands/${name}`).filter((x: any) => !x.endsWith('.ts')).filter(async dir => {
    const otherHandlers = fs.readdirSync(`./src/commands/${name}/${dir}`).filter((x: any) => {x.endsWith('.ts')})
    for (const file of otherHandlers) {
      if (file !== '.handler.ts') return
      const { options } = require(`./${file}`)
      optionsToProv.push(options())
    }
  })

  const cmds = fs.readdirSync(`./src/commands/${name}`).filter(files => files.endsWith('.ts'))
    for (const file of cmds) {
      if (file === '.handler.ts') return
      const { options } = require(`./${file}`)
      optionsToProv.push(options)
    }
  
  client.application.commands.create({
    name: name,
    description: description,
    options: optionsToProv 
  })
}

export = { name, redirect, createCMD }


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

          

          //Pause command

          

          //Play command

          


          //Resume command

          

          //Skip command

          
          //Stop command

          

          //Repeat command

         

        ]
      })
    },

  }
*/