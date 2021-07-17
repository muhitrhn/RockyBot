const chalk = require('chalk')

module.exports = async (client) => {

  setInterval(() => {
		const randomIndex = Math.floor(Math.random() * (client.config.discord.activities.length - 1) + 1)
		const newActivity = client.config.discord.activities[randomIndex]

		client.user.setActivity(newActivity)
	}, 15 * 1000)

  console.log(chalk.redBright('---'))
	console.log(chalk.greenBright(`Zalogowano jako ${client.user.tag}`))
	console.log(chalk.greenBright(`Aktywny na ${client.guilds.cache.size} serwerach, razem użytkowników ${client.users.cache.size}`))
	console.log(chalk.redBright('---'))

  
          // Oswież cache
  await client.base.get('cmdHandler').refreshCache(client)

          // Odśwież dane discorda
  if (client.config.refreshDiscordCmds) {
    await client.base.get('cmdHandler').refreshDiscordCmds(client)
  }

}