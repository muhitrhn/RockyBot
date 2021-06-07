const info = require('./info')
const activities = require(`./activities`)
const emotes = require(`./emojis`)
require("dotenv").config()

module.exports = {
    attachments: {
        wideo: "845271742637539358",
        tuskotronic: "845282882456256522",
        stonoga: "845284178940919808",
        kamien: "845285007094054952",
        budowa: "845285645596622898",
        rymowanka: "850655868529147914",
    },

    ChangesChannel: "851491557160124452",

    emojis: emotes.emojis,

    beta: info.beta,

    releasedate: info.releasedate,
    version: info.version,
    news: info.news,
    github: info.github,
    changelog: info.changelog,

    discord: {
        betatoken: process.env.BETATOKEN,
        token: process.env.TOKEN,
        myBetaID: process.env.myBetaID,
        myID: process.env.myID,
        betaprefix: "!",
        prefix: '.',
        ownerID: info.ownerID,
        testerID: info.testerID,
        activities: activities.activities,
    },
};