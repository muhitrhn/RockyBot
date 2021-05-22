const info = require('./info')
const activities = require(`./activities`)
require("dotenv").config()

module.exports = {
    attachments: {
        wideo: "845271742637539358",
        tuskotronic: "845282882456256522",
        stonoga: "845284178940919808",
        kamien: "845285007094054952",
        budowa: "845285645596622898"
    },


    emojis: {
        ubuntu: '<:ubuntu:837617906971181057>',
        warn: '<a:Warning:826731315570278461>',
        system: '<:systemmessageuser:838387012230053917>',
        RAM: "<:RAM:837613245572448266>",
        NJS: "<:nodejs:837619941380718602>",
        motherboard: "<:motherboard:843225362015191061>",
        magentaDot: "<:MagentaSmallDot:844562735198765096>",
        yellowDot: "<:YellowSmallDot:845043290637860974>",
        blueDot: "<:LightBlueSmallDot:844561940248395787>",
        DJS: "<:discordjs:837622356901756938>",
        cpu: "<:cpu:837673971947274296>",
        rbverify: "<a:verifyxd:844299503146106880>",
        x: "<a:vega_x:845253379113484298>",
        timer6: "<a:timer6:844672772169138197>",
        staff: "<a:Staff:843734135972691968>",
        siri: "<a:Siri_Loading:826383904729989160>",
        siren: "<a:Siren:826730448289923072>",
        grverify: "<a:greenverify:837704119086612502>",
        rverify: "<a:redverify:837704198388056175>",
        gearspin: "<a:gearSpinning:826727876635262977>",
        world: "<a:Black_World:838382299166801921>",
        google: "<a:Google_Loading:826382993948934164>",
        question: "<:Question_mark:845341315348430939>",
        boombox: '<:Boombox:845342914728296529>',
        },

    beta: info.beta,

    releasedate: info.releasedate,
    version: info.version,
    news: info.news,

    consolelog: "845258768727932938",

    discord: {
        betatoken: process.env.BETATOKEN,
        token: process.env.TOKEN,
        myBetaID: process.env.myBetaID,
        myID: process.env.myID,
        betaprefix: "!",
        prefix: '.',
        ownerID: `643084165209784331`,
        activities: activities.activities,
    },

    playerFilters: ['8D', 'gate', 'haas', 'phaser', 'treble', 'tremolo', 'vibrato', 'reverse', 'karaoke', 'flanger', 'mcompand', 'pulsator', 'subboost', 'bassboost', 'vaporwave', 'nightcore', 'normalizer', 'surrounding'],
};