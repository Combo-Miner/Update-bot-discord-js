
const Discord = require('discord.js');
const mongoose = require('mongoose');
const Link = require("../../models/updatebot")

module.exports = {
  name: 'linkcheck',
  description: 'Vérifie le lien actuel',
  run: async (client, message, args) => {

    Link.findOne({}, (err, link) => {
      if (err) {
        console.error(err);
        return message.channel.send('Une erreur est survenue lors de la récupération du lien.');
      }

      return message.channel.send(`Le lien actuel est : ${link.link}`);
    });
  }
};