const info = require('./info')
const activities = require('./activities')
const emotes = require('./emotes')
const cmds = require('./cmds')
require('dotenv').config()

module.exports = {

    deleteCommandsFirst: cmds.deleteCommandsFirst,
    refreshDiscordCmds: cmds.refreshDiscordCmds,


    cmds: cmds.commands,

    emotes: emotes,

    beta: cmds.beta,

    releasedate: info.releasedate,
    version: info.version,
    news: info.news,
    github: info.github,
    changelog: info.changelog,
    author: info.author,

    discord: {
        betatoken: process.env.BETATOKEN,
        token: process.env.TOKEN,
        myBetaID: process.env.myBetaID,
        myID: process.env.myID,
        betaprefix: cmds.commands.betaPrefix,
        prefix: cmds.commands.prefix,
        ownerID: cmds.ownerID,
        testerID: cmds.testerID,
        activities: activities.activities
    }
}