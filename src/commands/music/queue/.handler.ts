import fs from "fs"

async function options() {
  const cmds = fs.readdirSync('./src/commands/music/queue')
  let optionsToProv = []
  for (const file of cmds) {
    if (file === '.handler.ts') return
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