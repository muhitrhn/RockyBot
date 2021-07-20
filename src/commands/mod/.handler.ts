import { CommandInteraction } from "discord.js"
import fs from "fs"
import { error } from "../base/cmd"

const name = 'mod'
const description = '🛠️ Kategoria moderacja'

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

async function createCMD(client: any) {
  let optionsToProv = [], otherHandlers: any, dirr: any
  fs.readdirSync(`./src/commands/${name}`).filter(files => !files.endsWith('.ts')).filter(async dir => {
    otherHandlers = fs.readdirSync(`./src/commands/${name}/${dir}`).filter(x => x.startsWith('.handler'))
    dirr = dir
  })
  
  if(otherHandlers) {
    for (const file of otherHandlers) {
      const { options } = require(`./${dirr}/${file}`)
      const toProv = await options()
      optionsToProv.push(toProv)
    }
  }

  const cmds = fs.readdirSync(`./src/commands/${name}`).filter(files => !files.endsWith('.handler.ts') && files.endsWith('.ts'))
  for (const file of cmds) {
    const { options } = require(`./${file}`)
    optionsToProv.push(options)
  }

  
  await client.application.commands.create({
    name: name,
    description: description,
    options: optionsToProv 
  })
}

export = { name, redirect, createCMD }