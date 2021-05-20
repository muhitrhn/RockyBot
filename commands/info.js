require('discord-reply');
const djsVersion = require('discord.js').version
const { version } = require('../package.json'); 
const { MessageEmbed } = require('discord.js');
const os = require('os-utils');
const oss = require("os")
const getos = require('getos')
require('dotenv').config();
var prefix = process.env.PREFIX;
const prettyMilliseconds = require("pretty-ms");
const gr = "<a:greenverify:837704119086612502>"
const red = "<a:redverify:837704198388056175>"
try {
module.exports = {
    name: "info",
    description: "Info about bot",
    execute(message) {
        message.react("<a:Google_Loading:826382993948934164>")
        const embed = new MessageEmbed()
        .setColor("RANDOM")
        .setTitle(`<:systemmessageuser:838387012230053917>  Użyto komendy ${message}`)
        .setDescription("<a:Staff:843734135972691968> *Powered by **os**, **os-utils** and **getos** packages*\n<:ubuntu:837617906971181057> XDDD\n")
        .setThumbnail(message.client.user.avatarURL())

       os.cpuUsage(function(v){
        embed.addField(`<:motherboard:843225362015191061> -- ZASOBY -- <:motherboard:843225362015191061>`,
        `<:RAM:837613245572448266> **RAM**\n${red} **Użyte**: \`${((process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2))}MB\`\n${gr} **Wolne**: \`${((oss.totalmem() / 1024 / 1024 / 1000) - (process.memoryUsage().heapUsed / 1024 / 1024 / 1000)).toFixed(1)}GB\`\n<:cpu:837673971947274296> **CPU**\n${red} **Zużycie**: \`${(v * 100).toFixed(2)}%\`
        `)})

        setTimeout(() => {getos(function(e, os) {
            embed.addField(`<:ubuntu:837617906971181057> -- SYSTEM -- <:ubuntu:837617906971181057>`,
             `<:systemmessageuser:838387012230053917> **System**: \`${os.os}\`\n<:ubuntu:837617906971181057> **Distro**: \`${os.dist}\`\n<:Blob_Verification:838387058254938142> **Wersja**: \`${os.release}\`\n<a:Black_World:838382299166801921> **Czas pracy**: \`${prettyMilliseconds(oss.uptime() * 1000)}\`
             `)})}, 1000);
        
        setTimeout(() => {
            embed.addField(`<a:gearSpinning:826727876635262977> -- SILNIKI -- <a:gearSpinning:826727876635262977>`,
            `<:nodejs:837619941380718602> **Node.js**: \`${process.version}\`\n<:discordjs:837622356901756938> **Discord.js**: \`v${djsVersion}\`
            `)

            embed.addField(`🤖 -- BOT -- 🤖`,
            `<a:Black_World:838382299166801921> **Czas pracy**: \`${prettyMilliseconds(os.processUptime() * 1000)}\`\n🏓 **Ping**: \`${message.client.ws.ping}ms\`\n<a:Siri_Loading:826383904729989160> **Prefix**: \`${prefix}\`
            `)   
            
            embed.setFooter(`💡 ${message.author.tag}\n🛠️ v${version}`, message.author.displayAvatarURL())
            embed.setTimestamp()

            message.lineReplyNoMention(embed).then(() => message.reactions.cache.get('826382993948934164').remove())
        }, 2000);
    }
}} catch (error) {
    console.log(error)
}