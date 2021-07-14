const { MessageEmbed } = require('discord.js')

module.exports = {
  async execute(client, interaction) {

    const embed = new MessageEmbed()
        .setColor('#FFC000')
        .setFooter(`🛠️ v${client.version} ┇ ⚡ RockyBot® 2021`, interaction.user.displayAvatarURL({dynamic: true}))
        .setTitle(`${client.emotes.google} Komenda jeszcze nie jest gotowa`)
        .setDescription(`${client.emotes.warn} Na ten moment musisz używac \`/moderation warn delete\` dla każdego warna.`)

    return interaction.reply({embeds: [embed], ephemeral: true})
  }
}