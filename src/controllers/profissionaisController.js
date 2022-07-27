const Profissionais = require('../models/profissionaisModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const profissionais = require('../models/profissionaisModel')
const SECRET = process.env.SECRET

const getAllPro = (req, res) => {
    Profissionais.find(function (err, profissionais) {
        if (err) {
            res.status(500).send({ message: err.message })
        }
        res.status(200).send(locais)
    })
}

const getProbyOccupation = async (req, res) => {
    try {
        const { ocupacao: ocupacao } = req.query;
        const findOcupacao = await Profissionais.find({ ocupacao: ocupacao });
        res.status(200).json(findOcupacao);
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
}

const newPro = (req, res) => {
    const senhaComHash = bcrypt.hashSync(req.body.senha, 10)
    req.body.senha = senhaComHash
    console.log(req.body)
    const profissional = new Profissionais(req.body)
    profissional.save(function (err) {
        if (err) {
            res.status(500).send({ message: err.message })
        }
        res.status(201).send(profissional)
    })
}

const loginPro = (req, res) => {
    Profissionais.findOne({ email: req.body.email }, function (error, profissional) {
        if (!profissional) {
            return res.status(404).send('ainda não existe um profissional com este email.')
        }
        const senhaValida = bcrypt.compareSync(req.body.senha, profissional.senha)
        if (!senhaValida) {
            return res.status(403).send('senha inválida.')
        }
        const token = jwt.sign({ email: req.body.email }, SECRET)
        res.status(200).send(token)
    })
}

const updateProById = async (req, res) => {
    try {
        const { nome, email, senha, ocupacao } = req.body
        const updateProById = await profissionaisModel
            .findByIdAndUpdate(req.params.id, {
                nome, email, senha, ocupacao
            })
        res.status(200).json(updateProById)
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: error.message })
    }
}

const deleteProrById = async (req, res) => {
    try {
        const { id } = req.params
        await Profissionais.findByIdAndDelete(id)
        res.status(200).json({ message: 'profissional deletado.' })
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: error.message })
    }
}

module.exports = {
    getAllPro,
    getProbyOccupation,
    newPro,
    loginPro,
    updateProById,
    deleteProrById
}