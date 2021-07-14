const { MessageEmbed } = require("discord.js")

module.exports = {
  name: 'fun',

  async redirect(client, interaction) {
    try {
      const command = require('./' + interaction.options.map(x => x.name)[0])
      await command.execute(client, interaction)
    } 
    catch (err) {
      const errEmbed = new MessageEmbed()
        .setTitle(`${client.emotes.world}  Nie znaleziono komendy...`)
        .setThumbnail(client.cmds.errorImgs[Math.floor(Math.random() * client.cmds.errorImgs.length)])
        .setDescription('...to nie problem z komendą, wystąpił wewnętrzny błąd handlera')
        .setColor('RED')
        .setFooter(`💡 ${interaction.user.tag}\n🛠️ v${client.version} ┇ ⚡ RockyBot® 2021 AntiCrash Engine`, interaction.user.displayAvatarURL({dynamic: true}))

      try {
        return interaction.editReply({embeds: [errEmbed], components: []})
      } 
      catch (err) {
        return interaction.reply({embeds: [errEmbed], components: []})
      }
    }
  },

  createCMD(client) {
    client.application.commands.create({
      name: 'fun',
      description: 'Kategoria fun',
      options: [

        //Budowa command

        {
          name: 'budowa',
          description: 'Budowa! BUDOWA!',
          type: 1, 
        },

        //Kamien command

        {        
          name: 'kamień',
          description: 'Wyślij kamień',
          type: 1,
        },

        //Meme command

        {
          name: 'meme',
          description: 'Losowy mem',
          type: 1,
        },

        //Rymowanka command

        {
          name: 'rymowanka',
          description: 'Wyślij losową rymowankę',
          type: 1,
        },

        //Stonoga command

        {
          name: 'stonoga',
          description: 'Zbychu Stonoga, kto go nie zna xD',
          type: 1,
        },

        //Tuskotronic command

        {
          name: 'tuskotronic',
          description: 'Kurczaki, ziemniaki... Kto nie zna tej piosenki? xD',
          type: 1,
        },

        //Wideo command

        {
          name: 'wideo',
          description: 'Wyślij śmieszne wideo',
          type: 1,
        }

      ]
    })
  },

}