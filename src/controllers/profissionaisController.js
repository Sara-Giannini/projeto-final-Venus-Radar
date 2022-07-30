const Profissionais = require('../models/profissionaisModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const SECRET = `${process.env.TOKEN_SECRET}`

const getAllPro = (req, res) => {
  Profissionais.find(function (err, profissionais) {
    if (err) {
      res.status(500).send({ message: err.message })
    }
    res.status(200).send(profissionais)
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
    const { nome, email, senha, ocupacao } =
      req.body
    const findPro = await Profissionais.findById(id)
    if (findPro == null) {
      return res.status(404).json({ message: "Profissional não encontrado" })
    }

    findPro.nome = nome || findPro.nome
    findPro.email = email || findPro.email
    findPro.senha = senha || findPro.senha
    findPro.ocupacao = ocupacao || findPro.ocupacao

    const savedPro = await findPro.save()
    res.status(200).json(savedPro)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: error.message })
  }
}

const deleteProrById = async (req, res) => {
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
    const findByIdAndDelete = await Profissionais.findByIdAndDelete(id)
    if (findByIdAndDelete == null) {
      return res.status(404).json({ message: `O ID do profissional não foi encontrado ${id}` })
    }
    await findByIdAndDelete.remove()
    res.status(200).json({ message: "Profissional deletado" })
  } catch (error) {
    res.status(500).send({ message: err.message })
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
