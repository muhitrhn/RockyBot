const { MessageEmbed } = require("discord.js")

module.exports = {
  name: 'nitro',

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
      name: 'nitro',
      description: 'Kategoria nitro',
      options: [

        //Emoji command

        {
          name: 'emoji',
          description: 'Wyślij customowe emoji',
          type: 1, 
          options: [
            {
              type: 'STRING',
              name: 'nazwa',
              description: 'Część lub cała nazwa emoji, które mam wysłać',
              required: true
            }
          ]
        },

        //React command

        {
          name: 'react',
          description: 'Zareaguj na wiadomość',
          type: 1,
          options: [
            {
              type: 'INTEGER',
              name: 'numer',
              description: 'Numer wiadomości, NIE WIĘKSZY NIŻ 40, licząc od dołu',
              required: true
            },
            {
              type: 'STRING',
              name: 'nazwa',
              description: 'Nazwa lub część nazwy emoji, którego mam użyć',
              required: true
            }
          ]
        },

        
      ]
    })
  },

}