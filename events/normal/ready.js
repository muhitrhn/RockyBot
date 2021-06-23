const chalk = require('chalk')
const Dashboard = require('../../dashboard/dashboard')

module.exports = async (client) => {
	
	console.log(chalk.redBright('---'))
	console.log(chalk.greenBright(`Zalogowano jako ${client.user.tag}`))
	console.log(chalk.greenBright(`Aktywny na ${client.guilds.cache.size} serwerach, razem użytkowników ${client.users.cache.size}`))
	console.log(chalk.redBright('---'))
  Dashboard(client)

  setInterval(() => {
		const randomIndex = Math.floor(Math.random() * (client.config.discord.activities.length - 1) + 1)
		const newActivity = client.config.discord.activities[randomIndex]

		client.user.setActivity(newActivity)
	}, 15 * 1000)

}