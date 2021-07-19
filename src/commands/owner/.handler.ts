import { CommandInteraction } from "discord.js"
import fs from "fs"
import { error } from "../base/cmd"

const name = 'owner'
const description = '⚠️ Kategoria owner'

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