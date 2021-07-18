import fs from "fs"

export = {
  name: 'avatar',

  async redirect(interaction: any) {
    import { error } from '../base/cmd'
    try {
      const command = require('./' + interaction.options.map((x: { name: any }) => x.name)[0])
      await command.execute(interaction)
    } catch (err) {
      error(interaction, err)
    }
  },

  createCMD(client: any) {
    const cmds = fs.readdirSync('./src/commands/avatar')

    let option = []
    for (const file of cmds) {
      const { options } = require(`./${file}`)
      option.push(options)
    }
    client.application.commands.create({
      name: 'avatar',
      description: '🖼️ Kategoria avatar',
      options: option 
    })
  },

}