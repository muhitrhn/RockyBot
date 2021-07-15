module.exports = {
  name: 'nitro',

  async redirect(client, interaction) {
    const command = require('./' + interaction.options.map(x => x.name)[0])
    await command.execute(client, interaction)
  },

  createCMD(client) {
    client.application.commands.create({
      name: 'nitro',
      description: '🔰 Kategoria nitro',
      options: [

        //Emoji command

        {
          name: 'emoji',
          description: '💬 Wyślij customowe emoji',
          type: 1, 
          options: [
            {
              type: 'STRING',
              name: 'nazwa',
              description: '📛 Część lub cała nazwa emoji, które mam wysłać',
              required: true
            }
          ]
        },

        //React command

        {
          name: 'react',
          description: '📤 Zareaguj na wiadomość',
          type: 1,
          options: [
            {
              type: 'INTEGER',
              name: 'numer',
              description: '🔢 Numer wiadomości, NIE WIĘKSZY NIŻ 40, licząc od dołu',
              required: true
            },
            {
              type: 'STRING',
              name: 'nazwa',
              description: '📛 Nazwa lub część nazwy emoji, którego mam użyć',
              required: true
            }
          ]
        },

        
      ]
    })
  },

}