import fs from "fs"
import { error } from "../base/cmd"

export = {
  name: 'avatar',

  async redirect(o: any, interaction: any) {
    try {
      const command = require('./' + interaction.options.map((x: { name: any }) => x.name)[0])
      await command.execute(interaction)
    } catch (err) {
      error(interaction, err)
    }
  },

  createCMD(client: any) {
    const cmds = fs.readdirSync('./src/commands/avatar')

    let optionsToProv = []
    for (const file of cmds) {
      if (file === '.handler.ts') return
      const { options } = require(`./${file}`)
      optionsToProv.push(options)
    }
    client.application.commands.create({
      name: 'avatar',
      description: '🖼️ Kategoria avatar',
      options: optionsToProv 
    })
  },

}