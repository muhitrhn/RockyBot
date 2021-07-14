module.exports = {
  name: 'settings',

  async redirect(client, interaction) {
    const command = require('./' + interaction.options.map(x => x.name)[0])
    await command.execute(client, interaction)
  },

  createCMD(client) {
    client.application.commands.create({
      name: 'settings',
      description: 'Kategoria ustawienia',
      options: [

        //Eval command

        {
          name: 'mutedrole',
          description: 'Ustaw rolę wyciszenia na serwerze',
          type: 1, 
          options: [
            {
              type: 'ROLE',
              name: 'rola',
              description: 'Rola, którą mam ustawić jako rolę wyciszenia',
              required: true
            }
          ]
        },

      ]
    })
  },

}