module.exports = {
  name: 'mod',

  async redirect(client, interaction) {
    let command
    if (interaction.options.map(x => x.name)[0] === 'warn') {
      command = require('./warn/'+ interaction.options.map(x => x.options)[0].map(x => x.name)[0])
    } 
    else {
      command = require('./' + interaction.options.map(x => x.name)[0])
    }
    await command.execute(client, interaction)
  },

  createCMD(client) {
    client.application.commands.create({
      name: 'mod',
      description: '🛠️ Kategoria moderacja',
      options: [

        //Ban command

        {
          name: 'ban',
          description: '🔐🚷 Zbanuj oznaczonego użytkownika',
          type: 1, 
          options: [
            {
              type: 'USER',
              name: 'użytkownik',
              description: '👥 Użytkownik, którego mam zbanować',
              required: true
            },
            {
              type: 'STRING',
              name: 'powód',
              description: '❔ Powód bana',
              required: false
            }
          ]
        },

        //Clear command

        {
          name: 'clear',
          description: '🔐♻️ Wyczyść wiadomości',
          type: 1,
          options: [
            {
              type: 'INTEGER',
              name: 'liczba',
              description: '🔢 Liczba między 1 a 1000 (liczba wiadomości do usunięcia)',
              required: true
            }
          ]
        },

        //Kick command

        {
          name: 'kick',
          description: '🔐🚀 Wyrzuć oznaczonego użytkownika',
          type: 1,
          options: [
            {
              type: 'USER',
              name: 'użytkownik',
              description: '👥 Użytkownik, którego mam wyrzucić',
              required: true
            },
            {
              type: 'STRING',
              name: 'powód',
              description: '❔ Powód wyrzucenia',
              required: false
            }
          ]
        },

        //Mute command

        {
          name: 'mute',
          description: '🔐🔇 Wycisz oznaczonego użytkownika',
          type: 1,
          options: [
            {
              type: 'USER',
              name: 'użytkownik',
              description: '👥 Użytkownik, którego mam wyciszyć',
              required: true
            },
            {
              type: 'STRING',
              name: 'powód',
              description: '❔ Powód wyciszenia',
              required: false
            }
          ]
        },

        //Unban command

        {
          name: 'unban',
          description: '🔐✅ Odbanuj kogoś',
          type: 1,
          options: [
            {
              type: 'STRING',
              name: 'id',
              description: '🆔 ID użytkownika, którego mam odbanować',
              required: true
            },
            {
              type: 'STRING',
              name: 'powód',
              description: '❔ Powód odbanowania',
              required: false
            }
          ]
        },

        //Unmute command

        {
          name: 'unmute',
          description: '🔐🔉 Odcisz oznaczonego użytkownika',
          type: 1,
          options: [
            {
              type: 'USER',
              name: 'użytkownik',
              description: '👥 Użytkownik, którego mam odciszyć',
              required: true
            },
            {
              type: 'STRING',
              name: 'powód',
              description: '❔ Powód odciszenia',
              required: false
            }
          ]
        },

        //Warn command

        {
          name: 'warn',
          description: '❗ Ostrzeżenia',
          type: 2,
          options: [

            //Warn someone

            {
              name: 'add',
              description: '🔐❗ Ostrzeż kogoś',
              type: 1,
              options: [
                {
                  type: 'USER',
                  name: 'użytkownik',
                  description: '👥 Użytkownik, którego mam ostrzec',
                  required: true
                },
                {
                  type: 'STRING',
                  name: 'powód',
                  description: '❔ Powód ostrzeżenia',
                  required: true
                }
              ]
            },

            //Delete warn

            {
              name: 'delete-by-id',
              description: '🔐♻️ Usuń ostrzeżenie',
              type: 1,
              options: [
                {
                  type: 'STRING',
                  name: 'id',
                  description: '🆔 ID warna',
                  required: true
                }
              ]
            },

            //Clear warns

            {
              name: 'delete-by-user',
              description: '🔐♻️ Wyczyść czyjeś ostrzeżenia',
              type: 1,
              options: [
                {
                  type: 'USER',
                  name: 'użytkownik',
                  description: '👥 Użytkownik, którego listę warnów chcesz wyczyścić',
                  required: true
                }
              ]
            },

            //List of warns

            {
              name: 'list',
              description: '🧾 Czyjaś lub Twoja lista ostrzeżeń',
              type: 1,
              options: [
                {
                  type: 'USER',
                  name: 'użytkownik',
                  description: '👥 Użytkownik, którego listę warnów chcesz zobaczyć',
                  required: false
                }
              ]
            },
          ]
        }


      ]
    })
  },

}