const { Schema, model } = require("mongoose")

module.exports = model('updatelink',
    new Schema({
       link : String,
    })
)