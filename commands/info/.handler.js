const { MessageEmbed } = require("discord.js")

module.exports = {
  name: 'info',

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
      name: 'info',
      description: 'Kategoria info',
      options: [

        //Changelog command

        {
          name: 'changelog',
          description: 'Wyświetl listę zmian',
          type: 1, 
        },

        //Guildinfo command

        {        
          name: 'guildinfo',
          description: 'Info o serwerze',
          type: 1,
        },

        //Help command

        {        
          name: 'help',
          description: 'Pomoc z botem',
          type: 1,
        },

        //Ping command

        {
          name: 'ping',
          description: 'Sprawdź ping bota',
          type: 1,
        },

        //Storage command

        {
          name: 'storage',
          description: 'Info o ilosci dostepnych zasobow do komend',
          type: 1,
        },

        //Userinfo command

        {
          name: 'userinfo',
          description: 'Info o użytkowniku',
          type: 1,
          options: [
            {
              type: 'USER',
              name: 'użytkownik',
              description: 'Użytkownik, o którym wyświetlą się informacje',
              required: false
            }
          ]
        },
      ]
    })
  },

}