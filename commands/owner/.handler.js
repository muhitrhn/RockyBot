const { MessageEmbed } = require("discord.js")

module.exports = {
  name: 'owner',

  async redirect(client, interaction) {
    try {
      const command = require('./' + interaction.options.map(x => x.name)[0])
      await command.execute(client, interaction)
    } 
    catch (err) {
      console.log(err)
      const errEmbed = new MessageEmbed()
        .setTitle(`${client.emotes.world}  Nie znaleziono komendy...`)
        .setThumbnail(client.cmds.errorImgs[Math.floor(Math.random() * client.cmds.errorImgs.length)])
        .setDescription('...to nie problem z komendą, wystąpił wewnętrzny błąd handlera')
        .setColor('RED')
        .setFooter(`💡 ${interaction.user.tag}\n🛠️ v${client.version} ┇ ⚡ RockyBot® 2021 AntiCrash Engine`, interaction.user.displayAvatarURL({dynamic: true}))

      try {
        await interaction.editReply({embeds: [errEmbed], components: []})
      } 
      catch (err) {
        await interaction.reply({embeds: [errEmbed], components: []})
      }
    }
  },

  createCMD(client) {
    client.application.commands.create({
      name: 'owner',
      description: 'Kategoria owner',
      options: [

        //Eval command

        {
          name: 'eval',
          description: 'TYLKO DLA WŁAŚCICIELA',
          type: 1, 
          options: [
            {
              type: 'STRING',
              name: 'kod',
              description: 'Kod do wykonania',
              required: true
            }
          ]
        },

      ]
    })
  },

}