const mongoose = require('mongoose')

const usuariosSchema = new mongoose.Schema({
    nome: { type: String },
    email: { type: String },
    senha: { type: String },
},
    {
        versionKey: false
    })

const usuarios = mongoose.model('usuarios', usuariosSchema)

module.exports = usuarios