const fs = require('fs')
const chalk = require('chalk')

module.exports = {
  name: 'cmdHandler',

  async refreshDiscordCmds(client) {

    if (client.config.deleteCommandsFirst) {
      await client.application.commands.set([])
    }

    console.log(chalk.whiteBright('Aktualizowanie bazy danych discorda...'))

    fs.readdirSync('./commands').filter(async dirs => {
      const commands = fs.readdirSync(`./commands/${dirs}`).filter(files => files.endsWith('.js') && files.startsWith('.'))

      for (const file of commands) {
        const command = require(`../${dirs}/${file}`)
        if (dirs === 'base') return
        try {
          await command.createCMD(client)
          console.log(chalk.yellowBright(`Dodano grupę ${dirs} do bazy discorda`))
        } catch (err) {
          console.log(chalk.red(`Grupa ${dirs} nie została dodana do bazy discorda`))
          console.log(err)
        }
      }
    })
  },

  async refreshCache(client) {

    console.log(chalk.whiteBright('Dodawanie handlerów...'))

    fs.readdirSync('./commands').filter(async dirs => {
      const handlers = fs.readdirSync(`./commands/${dirs}`).filter(files => files.endsWith('.js') && files.startsWith('.'))

      for (const file of handlers) {
        const handler = require(`../${dirs}/${file}`)
        if (dirs === 'base') return
        if (!handler.name) {
          console.log(chalk.red(`Handler folderu ${dirs} nie został dodany do pamięci podręcznej`))
        } else {
          await client.handlers.set(`${handler.name.toLowerCase()}`, handler)
  
          console.log(chalk.blueBright(`Dodano handler folderu ${dirs} do pamięci podręcznej`))
        }
      }
    })

    console.log(chalk.whiteBright('Wczytywanie listy wszystkich komend...'))

    fs.readdirSync('./commands').filter(async dirs => {
      const commands = fs.readdirSync(`./commands/${dirs}`).filter(files => files.endsWith('.js') && !files.startsWith('.'))

      for (const file of commands) {
        const command = require(`../${dirs}/${file}`)
        if (dirs === 'base') return
        await client.commands.set(`${dirs}${file}`, command)
      }
    })

      const commands = fs.readdirSync('./commands/mod/warn').filter(files => files.endsWith('.js') && !files.startsWith('.'))
      for (const file of commands) {
        const command = require(`../mod/warn/${file}`)
        await client.commands.set(`modwarn${file}`, command)
      }
  }
}
