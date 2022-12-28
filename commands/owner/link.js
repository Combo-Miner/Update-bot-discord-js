const { Client, Message, MessageEmbed } = require("discord.js");
const Link = require("../../models/updatebot")

module.exports = {
  name: "link",
  helpname : "link  lien",
  description: "Permet de update le lien",
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    if (!args[0]) {
      return message.channel.send('Veuillez fournir un nouveau lien !');
    }
let id = args[0].split("/")[5]
let newLink = `https://drive.google.com/uc?export=download&id=${id}`

    Link.findOne({}, (err, link) => {
      if (err) {
        console.error(err);
        return message.channel.send('Une erreur est survenue lors de la récupération du lien.');
      }

 
      link.link = newLink;
      link.save((err) => {
        if (err) {
          console.error(err);
          return message.channel.send('Une erreur est survenue lors de la mise à jour du lien.');
        }
        return message.channel.send(`Le lien a été mis à jour avec succès `)
      })
    })

    
  },
};