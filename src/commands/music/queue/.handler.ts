import fs from "fs"

async function options() {
  const cmds = fs.readdirSync('./src/commands/music/queue').filter(file => !file.startsWith('.handler.ts'))
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