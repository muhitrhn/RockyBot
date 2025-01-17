import mainCfg from './maincfg'
import activities from './activities'
import emotes from './emotes'
import cmds from './cmds'
require('dotenv').config()

export = {

    refreshDiscordCmds: mainCfg.refreshDiscordCmds,

    cmds: cmds.commands,

    emotes: emotes,

    beta: false,

    releasedate: mainCfg.releasedate,
    version: mainCfg.version,
    github: mainCfg.github,
    changelog: mainCfg.changelog,
    author: mainCfg.author,

    discord: {
        betatoken: process.env.BETATOKEN,
        token: process.env.TOKEN,
        ownerID: cmds.ownerID,
        testerID: cmds.testerID,
        activities: activities.activities
    }
}