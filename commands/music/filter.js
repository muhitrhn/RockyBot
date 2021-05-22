const { MessageEmbed } = require("discord.js");

module.exports = {
    name: 'filter',
    aliases: [`mf`, `filters`, `filtr`],
    category: 'music',
    description: "Wyświetla listę filtrów, dodanie argumentu włącza/wyłącza filtr",
    utilisation: '{prefix}filter <nazwa filtru>',

    async execute(client, message, args) {
        reaction = await message.react(client.emotes.google)
        const embed = new MessageEmbed()
        .setColor(`RED`)
        .setThumbnail(`https://cdn.discordapp.com/attachments/837601267827998770/845348622694613019/error-img-small.gif`)
        .setDescription(`${client.emotes.system}  Użyto komendy **${message.content}**`)
        .setFooter(`💡 ${message.author.tag}\n🛠️ v${client.version}`, message.author.displayAvatarURL())
        .setTimestamp()

        if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) {
            embed.setTitle(`${client.emotes.rverify}  Gram na innym kanale xD`)
            await message.lineReplyNoMention(embed)
            await reaction.remove()

        } else if (!client.player.getQueue(message)) {
            embed.setTitle(`${client.emotes.rverify}  Nic nie gra xD`)
            await message.lineReplyNoMention(embed)
            await reaction.remove()

        }  else if (!args[0]) {
            const filtersStatuses = [[], []];
            client.playerFilters.forEach((filterName) => {
                const array = filtersStatuses[0].length > filtersStatuses[1].length ? filtersStatuses[1] : filtersStatuses[0];
                array.push(filterName.charAt(0).toUpperCase() + filterName.slice(1) + " : " + (client.player.getQueue(message).filters[filterName] ? client.emotes.grverify : client.emotes.rverify));
            });
            embed.setColor(`RANDOM`)
            embed.setThumbnail(`https://cdn.discordapp.com/attachments/837601267827998770/845348342439608380/nutka.gif`)
            embed.addField(`${client.emotes.world}  Lista filtrów`, filtersStatuses[0].join('\n'), true)
            embed.addField(`** **`, filtersStatuses[1].join('\n'), true)
            embed.setDescription(`${client.emotes.siri}  **Dodaj** do komendy **nazwę filtru**, aby go **włączyć/wyłączyć**`)
            message.lineReplyNoMention(embed)
            await reaction.remove()

        } else {

        const filterToUpdate = client.playerFilters.find((x) => x.toLowerCase() === args[0].toLowerCase());

        if (!filterToUpdate) {
            embed.setTitle(`${client.emotes.rverify}  Napisałeś coś... ale to nie jest właściwy filtr`)
            await message.lineReplyNoMention(embed)
            await reaction.remove()
        } else {

        const filtersUpdated = {};

        filtersUpdated[filterToUpdate] = client.player.getQueue(message).filters[filterToUpdate] ? false : true;

        client.player.setFilters(message, filtersUpdated);

        if (filtersUpdated[filterToUpdate]) {
            embed.setTitle(`${client.emotes.grverify} \`Dodaję\` filtr do muzyki, im dłuższy utwór tym dłużej to trwa...`);
            embed.setThumbnail(`https://cdn.discordapp.com/attachments/837601267827998770/845616959952257104/loading.gif`)
            await message.lineReplyNoMention(embed)
            await reaction.remove()
        }
        else {
            embed.setTitle(`${client.emotes.rverify} \`Usuwam\` filtr z muzyki, im dłuższy utwór tym dłużej to trwa...`);
            embed.setThumbnail(`https://cdn.discordapp.com/attachments/837601267827998770/845616959952257104/loading.gif`)
            await message.lineReplyNoMention(embed)
            await reaction.remove()
        }
        }
    }
    },
};