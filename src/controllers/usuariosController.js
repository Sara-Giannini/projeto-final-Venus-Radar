const Usuarios = require('../models/usuariosModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const SECRET = `${process.env.TOKEN_SECRET}`

const newUser = (req, res) => {
    const senhaComHash = bcrypt.hashSync(req.body.senha, 10)
    req.body.senha = senhaComHash
    console.log(req.body)
    const usuario = new Usuarios(req.body)
    usuario.save(function (err) {
        if (err) {
            res.status(500).send({ message: err.message })
        }
        res.status(201).send(usuario)
    })
}

const login = (req, res) => {
    Usuarios.findOne({ email: req.body.email }, function (error, usuario) {
        if (error) {
            return res.status(500).send({ message: "Usuário não encontrado." })
        }
        if (!usuario) {
            return res
                .status(404)
                .send(`Ainda não existe um usuário com este email.: ${email}`)
        }
        const senhaValida = bcrypt.compareSync(req.body.senha, usuario.senha)
        if (!senhaValida) {
            return res.status(403).send("Senha incorreta..")
        }
        const token = jwt.sign({ email: req.body.email }, SECRET)
        return res.status(200).send(token)
    })
}

const updateUserById = async (req, res) => {
    try {
        const { nome, email, senha } = req.body
        const updateUserById = await Usuarios
            .findByIdAndUpdate(req.params.id, {
                nome, email, senha
            })
        res.status(200).json(updateUserById)
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: error.message })
    }
}

const deleteUserById = async (req, res) => {
    try {
        const { id } = req.params
        await Usuarios.findByIdAndDelete(id)
        res.status(200).json({ message: 'usuário deletado.' })
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: error.message })
    }
}

module.exports = {
    newUser,
    login,
    updateUserById,
    deleteUserById
}