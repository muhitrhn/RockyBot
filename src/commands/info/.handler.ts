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

/*
module.exports = {
  name: 'info',

  async redirect(client, interaction) {
    const command = require('./' + interaction.options.map(x => x.name)[0])
    await command.execute(client, interaction)
  },

  createCMD(client) {
    client.application.commands.create({
      name: 'info',
      description: '❓ Kategoria info',
      options: [

        //Changelog command

        

        //Guildinfo command

        
        //Help command

        {        
          name: 'help',
          description: '❔ Pomoc z botem',
          type: 1,
        },

        //Ping command

        {
          name: 'ping',
          description: '🏓 Sprawdź ping bota',
          type: 1,
        },

        //Storage command

        {
          name: 'storage',
          description: '📪 Info o ilosci dostepnych zasobow do komend',
          type: 1,
        },

        //Userinfo command

        {
          name: 'userinfo',
          description: '👤 Info o użytkowniku',
          type: 1,
          options: [
            {
              type: 'USER',
              name: 'użytkownik',
              description: '👥 Użytkownik, o którym wyświetlą się informacje',
              required: false
            }
          ]
        },
      ]
    })
  },

} */