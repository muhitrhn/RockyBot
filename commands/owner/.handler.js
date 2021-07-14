module.exports = {
  name: 'owner',

  async redirect(client, interaction) {
    const command = require('./' + interaction.options.map(x => x.name)[0])
    await command.execute(client, interaction)
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