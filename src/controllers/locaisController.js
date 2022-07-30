const locaisModel = require('../models/locaisModel')
const jwt = require('jsonwebtoken')
const SECRET = `${process.env.TOKEN_SECRET}`

const getAll = (req, res) => {
  locaisModel.find(function (err, locais) {
    if (err) {
      res.status(500).send({ message: err.message })
    }
    res.status(200).send(locais)
  })
}

const getById = async (req, res) => {
  try {
    const findLocal = await locaisModel.findById(req.params.id)
    res.status(200).json(findLocal)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: error.message })
  }
}
const getByState = async (req, res) => {
  try {
    const { estado } = req.query
    const findEstado = await locaisModel.find({ estado: estado })
    res.status(200).json(findEstado)
  } catch (err) {
    res.status(500).send({ message: err.message })
  }
}

const getByCity = async (req, res) => {
  try {
    const { cidade } = req.query
    const findCidade = await locaisModel.find({ cidade: cidade })
    res.status(200).json(findCidade)
  } catch (err) {
    res.status(500).send({ message: err.message })
  }
}

const getByCategory = async (req, res) => {
  try {
    const { categoria: categoria } = req.query
    const findCategoria = await locaisModel.find({ categoria: categoria })
    res.status(200).json(findCategoria)
  } catch (err) {
    res.status(500).send({ message: err.message })
  }
}

const addNew = async (req, res) => {
  try {
    const authHeader = req.get("Autorização")
    if (!authHeader) {
      return res.status(401).send("Você precisa de autorização")
    }
    console.log(authHeader)
    const token = authHeader.split(" ")[1]
    jwt.verify(token, SECRET, async function (err) {
      if (err) {
        return res.status(403).send("Acesso negado")
      }
      const { nome, estado, cidade, endereco, categoria, comentario } = req.body
      const newLocal = new Book({
        nome,
        estado,
        cidade,
        endereco,
        categoria,
        comentario,
      })
      const savedLocal = await newLocal.save()
      res.status(201).json(savedLocal)
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: error.message })
  }
}

const updateById = async (req, res) => {
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
    const { nome, estado, cidade, endereco, categoria, comentario } =
      req.body
    const findLocal = await locaisModel.findById(id)
    if (findLocal == null) {
      return res.status(404).json({ message: "Local não encontrado" })
    }

    findLocal.nome = nome || findLocal.nome
    findLocal.estado = estado || findLocal.estado
    findLocal.cidade = cidade || findLocal.cidade
    findLocal.endereco = endereco || findLocal.endereco
    findLocal.categoria = categoria || findLocal.categoria
    findLocal.comentario = comentario || findLocal.comentario

    const savedLocal = await findLocal.save()
    res.status(200).json(savedLocal)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: error.message })
  }
}

const deleteById = async (req, res) => {
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
    const findByIdAndDelete = await locaisModel.findByIdAndDelete(id)
    if (findByIdAndDelete == null) {
      return res.status(404).json({ message: `O ID do local não foi encontrado ${id}` })
    }
    await findByIdAndDelete.remove()
    res.status(200).json({ message: "Local deletado" })
  } catch (error) {
    res.status(500).send({ message: err.message })
  }
}

module.exports = {
  getAll,
  getById,
  getByState,
  getByCity,
  getByCategory,
  addNew,
  updateById,
  deleteById
}
