const djsVersion = require('discord.js').version
const { MessageEmbed } = require('discord.js');
const os = require('os-utils');
const oss = require("os")
const getos = require('getos')
const prettyMilliseconds = require("pretty-ms");

module.exports = {
    name: "info",
    aliases: ["ii"],
    description: "Sprawdza info o bocie",
    category: 'info',
    utilisation: '{prefix}info',

    async execute(client, message) {
        emotes = client.emotes
        reaction = await message.react(emotes.google)
        embed = new MessageEmbed()
        embed.setColor("RANDOM")
        .setTitle(`${emotes.system}  Użyto komendy ${message.content}`)
        .setDescription(`${emotes.staff} *Powered by **os**, **os-utils** and **getos** packages xD*\n`)
        .setThumbnail(client.user.avatarURL())          
        .setFooter(`💡 ${message.author.tag}\n🛠️ v${client.version}`, message.author.displayAvatarURL())
        .setTimestamp()

        await os.cpuUsage(async function(v){
        embed.addField(`${emotes.motherboard} -- ZASOBY -- ${emotes.motherboard}`,
        `<:RAM:837613245572448266> **RAM**\n${emotes.rverify} **Użyte**: \`${await ((process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2))}MB\`\n${emotes.grverify} **Wolne**: \`${(await (oss.totalmem() / 1024 / 1024 / 1000) - (await process.memoryUsage().heapUsed / 1024 / 1024 / 1000)).toFixed(1)}GB\`\n${emotes.cpu} **CPU**\n${emotes.rverify} **Zużycie**: \`${(await v * 100).toFixed(2)}%\`
        `)})
        setTimeout(async () => {
            await getos(async function(e, os) {
                embed.addField(`${emotes.ubuntu} -- SYSTEM -- ${emotes.ubuntu}`,
                 `${emotes.system} **System**: \`${os.os}\`\n${emotes.ubuntu} **Distro**: \`${os.dist}\`\n${emotes.rbverify} **Wersja**: \`${os.release}\`\n${emotes.world} **Czas pracy**: \`${prettyMilliseconds(oss.uptime() * 1000)}\`
                 `)})
            setTimeout(async () => {
                await embed.addField(`${emotes.gearspin} -- SILNIKI -- ${emotes.gearspin}`,
                `${emotes.NJS} **Node.js**: \`${process.version}\`\n${emotes.DJS} **Discord.js**: \`v${djsVersion}\`
                `)
    
            await embed.addField(`🤖 -- BOT -- 🤖`,
                `${emotes.world} **Czas pracy**: \`${prettyMilliseconds(os.processUptime() * 1000)}\`\n🏓 **Ping**: \`${client.ws.ping}ms\`\n${emotes.siri} **Prefix**: \`${client.prefix}\`
                `)   

            await message.lineReplyNoMention(embed)
            if(reaction) await reaction.remove()
            }, 500);
        }, 1000);
    
  
    }
}