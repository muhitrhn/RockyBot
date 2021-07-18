import fs from 'fs'
import chalk from 'chalk'
import { config, handlers } from '../..'

const name = 'cmdHandler'

const refreshDiscordCmds = async function(client: any) {

  if (config.deleteCommandsFirst) {
    await client.application.commands.set([])
  }

  console.log(chalk.whiteBright('Aktualizowanie bazy danych discorda...'))

  fs.readdirSync('./src/commands').filter(async dirs => {
    const commands = fs.readdirSync(`.src//commands/${dirs}`).filter(files => files.endsWith('.js') && files.startsWith('.'))

    for (const file of commands) {
      const { createCMD } = await import(`../${dirs}/${file}`)
      if (dirs === 'base') return
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

const refreshCache = async function() {

  console.log(chalk.whiteBright('Dodawanie handlerów...'))

  fs.readdirSync('./src/commands').filter(async dirs => {
    const handlerss = fs.readdirSync(`./src/commands/${dirs}`).filter(files => files.endsWith('.js') && files.startsWith('.'))

    for (const file of handlerss) {
      const handler = await import(`../${dirs}/${file}`)
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

export {
  name, refreshDiscordCmds, refreshCache
}

