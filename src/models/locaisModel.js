const mongoose = require('mongoose')

const localSchema = mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        default: mongoose.Types.ObjectId
    },
    nome: { type: String, required: true },
    estado: { type: String, required: true },
    cidade: { type: String, required: true },
    endereço: { type: String, required: true },
    categoria: { type: String, required: true },
    descricao: { String }
},
    { timestamps: true }
)

const locais = mongoose.model('locais', localSchema)
module.exports = locais