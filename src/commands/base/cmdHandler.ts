import fs from 'fs'
import chalk from 'chalk'
import { config, handlers } from '../..'
import { Client } from 'discord.js'

async function refreshDiscordCmds(client: Client) {

  console.log(chalk.whiteBright('Aktualizowanie bazy danych discorda...'))

  // client.application?.commands.set([])

  fs.readdirSync('./dist/commands').filter(async dirs => {
    const commands = fs.readdirSync(`./dist/commands/${dirs}`).filter(files => files.endsWith('.ts') && files.startsWith('.'))

    for (const file of commands) {
      if (dirs === 'base') return
      const { createCMD } = require(`../${dirs}/${file}`)
      try {
        await createCMD(client)
        console.log(chalk.yellowBright(`Dodano grupę ${dirs} do bazy discorda`))
      } catch (err) {
        console.log(chalk.red(`Grupa ${dirs} nie została dodana do bazy discorda`))
        console.log(err)
      }
    }
  })
}

async function refreshCache() {

  console.log(chalk.whiteBright('Dodawanie handlerów...'))

  fs.readdirSync('./dist/commands').filter(async dirs => {
    const handlerss = fs.readdirSync(`./dist/commands/${dirs}`).filter(files => files.endsWith('.ts') && files.startsWith('.'))

    for (const file of handlerss) {
      const handler = require(`../${dirs}/${file}`)
      if (dirs === 'base') return
      if (!handler.name) {
        console.log(chalk.red(`Handler folderu ${dirs} nie został dodany do pamięci podręcznej`))
      } else {
        handlers.set(`${handler.name.toLowerCase()}`, handler)
  
        console.log(chalk.blueBright(`Dodano handler folderu ${dirs} do pamięci podręcznej`))
      }
    }
  })
}

export { refreshDiscordCmds, refreshCache }

