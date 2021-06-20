module.exports = { 
  name: "check",
  
  async user(client, message, args) {
    let mentioned
    //NO MENTIONS
    if (message.mentions.members.size) {
      mentioned = message.mentions.users.first()
    //SOMEONE MENTIONED BY ID
    } else if (message.guild.member(args[0])) {
      mentioned = client.users.cache.get(args[0])
    } else {
      mentioned = message.author
    }
    return mentioned
  }, 

  async member(client, message, args) {
    let mentionMember = message.guild.member(args[0]), mentioned
    if (message.mentions.members.size) {
      mentioned = message.mentions.members.first()
    } else if (!mentionMember) {
      mentioned = message.member
    } else {
      mentioned = message.guild.member(args[0])
    }
    return mentioned
  },
}