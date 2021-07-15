module.exports = {
  name: 'avatar',

  async redirect(client, interaction) {
    const command = require('./' + interaction.options.map(x => x.name)[0])
    await command.execute(client, interaction)
  },

  createCMD(client) {
    client.application.commands.create({
      name: 'avatar',
      description: '🖼️ Kategoria avatar',
      options: [

        //Avatar command

        {
          name: 'send',
          description: '🖼️ Wyślij czyjś avatar',
          type: 1,
          options: [
              {
                type: 'USER',
                name: 'użytkownik',
                description: '👥 Użytkownik, którego avatar chcesz zobaczyć',
                required: false
              }
          ]   
        },

        //Delete command

        {        
          name: 'delete',
          description: '❌ Nie lubisz kogoś? To usuń jego lub siebie xD',
          type: 1,
          options: [
              {
                type: 'USER',
                name: 'użytkownik',
                description: '👥 Użytkownik, którego chcesz usunąć',
                required: false
              }
          ]
        },

        //Invert command

        {
          name: 'invert',
          description: '👾 Odwróć kolorki swojego lub czyjegoś avatara',
          type: 1,
          options: [
              {
                type: 'USER',
                name: 'użytkownik',
                description: '👥 Użytkownik, w którego avatarze chcesz odwrócić kolory',
                required: false
              }
          ]
        },

        //Jail command

        {
          name: 'jail',
          description: '🏚️ Zamknij siebie lub kogoś w więzieniu',
          type: 1,
          options: [
            {
              type: 'USER',
              name: 'użytkownik',
              description: '👥 Użytkownik, którego chcesz zamknąć w więzieniu',
              required: false
            }
          ]
        },

        //NotStonks command

        {
          name: 'notstonks',
          description: '↘️ Nie stonks',
          type: 1,
          options: [
            {
              type: 'USER',
              name: 'użytkownik',
              description: '👥 Użytkownik, którego avatar chcesz przerobić na nie stonks',
              required: false
            }
          ]
        },

        //Stonks command

        {
          name: 'stonks',
          description: '↗️ Stonks!',
          type: 1,
          options: [
            {
              type: 'USER',
              name: 'użytkownik',
              description: '👥 Użytkownik, którego avatar chcesz przerobić na stonks',
              required: false
            }
          ]
        },

        //Trigger command

        {
          name: 'trigger',
          description: '🤬 Wkurz siebie lub kogoś xD',
          type: 1,
          options: [
            {
              type: 'USER',
              name: 'użytkownik',
              description: '👥 Użytkownik, którego chcesz wkurzyć',
              required: false
            }
          ]
        }

      ]
    })
  },

}