import fs from "fs"
import { error } from "../base/cmd"

export = {
  name: 'nitro',

  async redirect(interaction: any) {
    try {
      const { execute } = require('./' + interaction.options.map((x: { name: any }) => x.name)[0])
      await execute(interaction)
    } catch (err) {
      error(interaction, err)
    }
  },

  createCMD(client: any) {
    const cmds = fs.readdirSync('./src/commands/nitro')

    let optionsToProv = []
    for (const file of cmds) {
      if (file === '.handler.ts') return
      const { options } = require(`./${file}`)
      optionsToProv.push(options)
    }
    client.application.commands.create({
      name: 'nitro',
      description: '🔰 Kategoria nitro',
      options: optionsToProv 
    })
  },

}