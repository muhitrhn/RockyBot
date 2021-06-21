const chalk = require('chalk')

module.exports = async (client) => {
	
	console.log(chalk.redBright('-------------------------------------------------'))
	console.log(chalk.redBright('|'),chalk.greenBright(`       Zalogowano jako ${client.user.tag}         `),chalk.redBright('|'))
	console.log(chalk.redBright('|'),chalk.greenBright(`Aktywny na ${client.guilds.cache.size} serwerach, razem użytkowników ${client.users.cache.size}`),chalk.redBright('|'))
	console.log(chalk.redBright('-------------------------------------------------'))
	setInterval(() => {
		const randomIndex = Math.floor(Math.random() * (client.config.discord.activities.length - 1) + 1)
		const newActivity = client.config.discord.activities[randomIndex]

		client.user.setActivity(newActivity)
	}, 15 * 1000)

}