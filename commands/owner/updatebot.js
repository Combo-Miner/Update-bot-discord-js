const { Client, Message, MessageEmbed, MessageSelectMenu, MessageActionRow, MessageButton, Util } = require("discord.js");
const fs = require("fs");
const { Headers } = require("node-fetch2");
const fetch = require("node-fetch2")
const DecompressZip = require('decompress-zip');
const headers = new Headers();
const lien = require("../../models/updatebot")
headers.append('User-Agent', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3');



module.exports = {
  name: "updatebot",
  helpname: "update",
  description: "Permet de mis à jour son bot",

  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    lien.findOne({}).then(async (data, err) => {
      if (err) return;
      if (!data) return message.channel.send("Il n'y a aucune mis a jour de disponible pour le momemnt")
      let url = data.link

      const download = async () => {
        const response = await fetch(url, { headers: headers });
        return Buffer.from(await response.arrayBuffer());
      };

      const buffer = await download();

      fs.writeFileSync('bot-files.zip', buffer);

      const unzipper = new DecompressZip('bot-files.zip');
      unzipper.on('error', err => {
        console.log(err);
      });

      unzipper.extract({
        path: process.cwd()
      });

      //fs.unlinkSync('bot-files.zip');
      client.destroy()
      client.login(client.config.token)
      const { exec } = require('child_process');

      message.channel.send('Mise à jour terminée !');
      exec('node .', (err, stdout, stderr) => {
        if (err) {
          console.error(err);
          return;
        }

      });


    })

  }
}