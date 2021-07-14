const { MessageEmbed } = require('discord.js')

module.exports = {
  async execute(client, interaction) {

    const embed = new MessageEmbed()
        .setColor('#FFC000')
        .setFooter(`🛠️ v${client.version} ┇ ⚡ RockyBot® 2021`, interaction.user.displayAvatarURL({dynamic: true}))
        .setTitle(`${client.emotes.google} Komenda w trakcie przebudowy`)
        .setDescription(`${client.emotes.warn} Z powodu wprowadzenia komend z ukosnikiem, całe wnętrze bota zostało przebudowane przez co komenda help nie działa, w ciągu najbliższych dni zostanie wypuszczona jej nowa wersja\n\n${client.emotes.grverify} **Przydatne informacje:**\nUżyj /[kategoria] [komenda], teraz discord sam podpowie jej nazwę i argumenty`)

    return interaction.reply({embeds: [embed], ephemeral: true})
  }
}