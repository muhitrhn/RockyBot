module.exports = {
  name: 'fun',

  async redirect(client, interaction) {
    const command = require('./' + interaction.options.map(x => x.name)[0])
    await command.execute(client, interaction)
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

        //Ship command

        {
          name: 'ship',
          description: '💕 Zobacz, jak bardzo są w sobie zakochani',
          type: 1,
          options: [
            {
              type: "STRING",
              name: 'opcja',
              description: 'Pierwsza rzecz/osoba do sprawdzenia',
              required: false
            },
            {
              type: "STRING",
              name: 'opcja2',
              description: 'Druga rzecz/osoba do sprawdzenia',
              required: false
            }
          ]
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