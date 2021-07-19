import fs from "fs"
import { error } from "../base/cmd"

export = {
  name: 'owner',

  async redirect(interaction: any) {
    try {
      const { execute } = require('./' + interaction.options.map((x: { name: any }) => x.name)[0])
      await execute(interaction)
    } catch (err) {
      error(interaction, err)
    }
  },

  createCMD(client: any) {
    const cmds = fs.readdirSync('./src/commands/owner')

    let optionsToProv = []
    for (const file of cmds) {
      if (file === '.handler.ts') return
      const { options } = require(`./${file}`)
      optionsToProv.push(options)
    }
    client.application.commands.create({
      name: 'owner',
      description: '⚠️ Kategoria owner',
      options: optionsToProv 
    })
  },

}

module.exports = {
  name: 'owner',

  async redirect(client, interaction) {
    const command = require('./' + interaction.options.map(x => x.name)[0])
    await command.execute(client, interaction)
  },

  createCMD(client) {
    client.application.commands.create({
      name: 'owner',
      description: '⚠️ Kategoria owner',
      options: [

        //Eval command

        

      ]
    })
  },

}