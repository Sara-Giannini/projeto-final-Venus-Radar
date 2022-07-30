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
    const authHeader = req.get("Autorização")
    if (!authHeader) {
      return res.status(401).send("Você precisa de autorização")
    }
    const token = authHeader.split(" ")[1]
    await jwt.verify(token, SECRET, async function (err) {
      if (err) {
        return res.status(403).send("Acesso negado")
      }
    })
    const { id } = req.params
    const { nome, email, senha } =
      req.body
    const findUser = await Usuarios.findById(id)
    if (findUser == null) {
      return res.status(404).json({ message: "Usuário não encontrado" })
    }

    findUser.nome = nome || findUser.nome
    findUser.email = email || findUser.email
    findUser.senha = senha || findUser.senha

    const savedUser = await findUser.save()
    res.status(200).json(savedUser)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: error.message })
  }
}

const deleteUserById = async (req, res) => {
  try {
    const authHeader = req.get("Autorização")
    if (!authHeader) {
      return res.status(401).send("Você precisa de autorização")
    }
    const token = authHeader.split(" ")[1]
    jwt.verify(token, SECRET, async function (err) {
      if (err) {
        return res.status(403).send("Acesso negado")
      }
    })
    const { id } = req.params
    const findByIdAndDelete = await Usuarios.findByIdAndDelete(id)
    if (findByIdAndDelete == null) {
      return res.status(404).json({ message: `O ID do Usuário não foi encontrado ${id}` })
    }
    await findByIdAndDelete.remove()
    res.status(200).json({ message: "Usuário deletado" })
  } catch (error) {
    res.status(500).send({ message: err.message })
  }
}

module.exports = {
  newUser,
  login,
  updateUserById,
  deleteUserById
}