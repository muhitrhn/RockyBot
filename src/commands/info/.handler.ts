import { Client } from "discord.js"
import fs from "fs"
import { error } from "../base/cmd"

export = {
  name: 'info',

  async redirect(client: Client, interaction: any) {
    try {
      const { execute } = require('./' + interaction.options.map((x: { name: any }) => x.name)[0])
      await execute(client, interaction)
    } catch (err) {
      error(interaction, err)
    }
  },

  createCMD(client: any) {
    const cmds = fs.readdirSync('./src/commands/info')

    let optionsToProv = []
    for (const file of cmds) {
      if (file === '.handler.ts') return
      const { options } = require(`./${file}`)
      optionsToProv.push(options)
    }
    client.application.commands.create({
      name: 'info',
      description: '❓ Kategoria info',
      options: optionsToProv 
    })
  },

}