import { options as send } from './send'
import { options as deleteCmd } from './delete'
import { options as trigger } from './trigger'

export = {
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
        send,
        deleteCmd,
        trigger,

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
      ]
    })
  },

}