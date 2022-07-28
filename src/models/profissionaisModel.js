const mongoose = require('mongoose')

const profissionaisSchema = new mongoose.Schema({
    nome: { type: String },
    email: { type: String },
    senha: { type: String },
    ocupacao: { type: String }
},
    {
        versionKey: false
    })

const profissionais = mongoose.model('profissionais', profissionaisSchema)

module.exports = profissionais
