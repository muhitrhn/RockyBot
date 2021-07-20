import fs from "fs"

async function options() {
  const cmds = fs.readdirSync('./dist/commands/mod/warn').filter(file => !file.startsWith('.handler'))
  let optionsToProv: any = []
  
  for (const file of cmds) {
    const { options } = require(`./${file}`)
    optionsToProv.push(options)
  }

  return  {
    name: 'warn',
    description: '❗ Ostrzeżenia',
    type: 2,
    options: optionsToProv
  }
}

export { options }