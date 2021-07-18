import chalk from 'chalk'
import { config } from '../..'
import { refreshCache, refreshDiscordCmds } from '../../commands/base/cmdHandler'

module.exports = async (client: { user: { setActivity: (arg0: string) => void; tag: any }; guilds: { cache: { size: any } }; users: { cache: { size: any } }}) => {

  setInterval(() => {
		const randomIndex = Math.floor(Math.random() * (config.discord.activities.length - 1) + 1)
		const newActivity = config.discord.activities[randomIndex]

		client.user.setActivity(newActivity)
	}, 15 * 1000)

  console.log(chalk.redBright('---'))
	console.log(chalk.greenBright(`Zalogowano jako ${client.user.tag}`))
	console.log(chalk.greenBright(`Aktywny na ${client.guilds.cache.size} serwerach, razem użytkowników ${client.users.cache.size}`))
	console.log(chalk.redBright('---'))

  
          // Oswież cache
  await refreshCache()

          // Odśwież dane discorda
  if (config.refreshDiscordCmds) {
    await refreshDiscordCmds(client)
  }

}