module.exports = {
  name: 'music',

  async redirect(client, interaction) {
    let command
    if (interaction.options.map(x => x.name)[0] === 'repeat') {
      command = require('./repeat/'+ interaction.options.map(x => x.options)[0].map(x => x.value)[0])
    } 
    else if (interaction.options.map(x => x.name)[0] === 'queue') {
      command = require('./queue/'+ interaction.options.map(x => x.options)[0].map(x => x.name)[0])
    } 
    else {
      command = require('./' + interaction.options.map(x => x.name)[0])
    }
    await command.execute(client, interaction)
  },

  createCMD(client) {
    client.application.commands.create({
      name: 'music',
      description: '🎵 Kategoria muzyka',
      options: [

        //Back command

        {
          name: 'back',
          description: '⏮️ Cofnij utwór',
          type: 1, 
        },

        //Pause command

        {
          name: 'pause',
          description: '⏸️ Zatrzymaj muzykę',
          type: 1, 
        },

        //Play command

        {
          name: 'play',
          description: '🎵 Zagraj muzykę',
          type: 1, 
          options: [
            {
              type: 'STRING',
              name: 'muzyka',
              description: '📛 Nazwa/link do playlisy/utworu youtube/spotify',
              required: true
            }
          ]
        },

        //Queue command

        {
          name: 'queue',
          description: '🔢 Kolejka odtwarzania',
          type: 2,
          options: [

            //Queue view command

            {
              name: 'view',
              description: '🔢 Wyświetl kolejkę odtwarzania',
              type: 1
            },

            //Queue clear command

            {
              name: 'clear',
              description: '❌ Wyczyść kolejkę odtwarzania',
              type: 1
            },

            //Queue Delete command

            {
              name: 'delete',
              description: '♻️ Usuń konkretny utwór',
              type: 1, 
              options: [
                {
                  type: 'INTEGER',
                  name: 'numer',
                  description: '🔢 Numer utworu z playlisty (komenda /music queue view)',
                  required: true
                }
              ]
            },
          ]
        },

        //Resume command

        {
          name: 'resume',
          description: '▶️ Wznów grę',
          type: 1, 
        },

        //Skip command

        {
          name: 'skip',
          description: '⏭️ Pomiń utwór',
          type: 1, 
        },

        //Stop command

        {
          name: 'stop',
          description: '🛑 Wyczyść kolejkę i skończ grać',
          type: 1, 
        },

        //Repeat command

        {
          name: 'repeat',
          description: '🔁 Zmień tryb powtarzania utworu',
          type: 1,
          options: [
            {
              name: 'typ',
              description: '🔁 Zmień tryb powtarzania utworu',
              type: 'STRING',
              required: true,
              choices: [
                {
                  name: '❌ Disable',
                  value: 'disable'
                },
                {
                  name: '🔁 Queue (default)',
                  value: 'queue'
                },
                {
                  name: '🔂 Track',
                  value: 'track'
                },
              ]
            }
          ] 
        },

      ]
    })
  },

}