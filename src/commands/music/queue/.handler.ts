import fs from "fs"

async function options() {
  const cmds = fs.readdirSync('./dist/commands/music/queue').filter(file => !file.startsWith('.handler'))
  let optionsToProv = []
  
  for (const file of cmds) {
    const { options } = require(`./${file}`)
    optionsToProv.push(options)
  }

  return  {
    name: 'queue',
    description: '🔢 Kolejka odtwarzania',
    type: 2,
    options: optionsToProv
  }
}

export { options }