const locaisModel = require('../models/locaisModel')

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
        const { estado } = req.query;
        const findEstado = await locaisModel.find({ estado: estado });
        res.status(200).json(findEstado);
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
}

const getByCity = async (req, res) => {
    try {
        const { cidade } = req.query;
        const findCidade = await locaisModel.find({ cidade: cidade });
        res.status(200).json(findCidade)
    } catch (err) {
        res.status(500).send({ message: err.message })
    }
}

const getByCategory = async (req, res) => {
    try {
        const { categoria: categoria } = req.query;
        const findCategoria = await locaisModel.find({ categoria: categoria });
        res.status(200).json(findCategoria);
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
}

const addNew = async (req, res) => {
    try {
        const { nome, estado, cidade, endereco, categoria, comentario } = req.body

        const newLocal = new locaisModel({
            nome, estado, cidade, endereco, categoria, comentario
        })
        const savedLocal = await newLocal.save()
        res.status(201).json(savedLocal)
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: error.message })
    }
}

const updateById = async (req, res) => {
    try {
        const { nome, estado, cidade, endereco, categoria, comentario } = req.body;
        const updatedLocal = await locaisModel.findByIdAndUpdate(req.params.id, {
            nome, estado, cidade, endereco, categoria, comentario
        })
        const localUpdated = await locaisModel.findByIdAndUpdate(req.params.id)
        res.status(200).json(localUpdated)
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: error.message })
    }
}

const deleteById = async (req, res) => {
    try {
        const { id } = req.params
        await locaisModel.findByIdAndDelete(id)
        const message = `deletado com sucesso`
        res.status(200).json({ message })
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: error.message })
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
