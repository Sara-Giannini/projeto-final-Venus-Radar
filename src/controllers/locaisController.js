const Locais = require('../models/locaisModel')

const getAll = (req, res) => {
    Locais.find(function (err, locais) {
        if (err) {
            res.status(500).send({ message: err.message })
        }
        res.status(200).send(locais)
    })
}

const getById = async (req, res) => {
    try {
        const findLocal = await Locais.findById(req.params.id)
        res.status(200).json(findLocal)
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: error.message })
    }
}

const getByState = async (req, res) => {
    try {
        const { estado } = req.query;
        const findEstado = await Locais.find({ estado: estado });
        res.status(200).json(findEstado);
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
}

const getByCity = async (req, res) => {
    try {
        const { cidade: cidade } = req.query;
        const findCidade = await Locais.find({ cidade: cidade });
        res.status(200).json(findCidade);
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
}

const getByCategory = async (req, res) => {
    try {
        const { categoria: categoria } = req.query;
        const findCategoria = await Locais.find({ categoria: categoria });
        res.status(200).json(findCategoria);
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
}

const addNew = async (req, res) => {
    try {
        const { nome, estado, cidade, categoria, descricao } = req.body

        const newLocal = new Locais({
            nome, estado, cidade, categoria, descricao
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
        const { nome, estado, cidade, categoria, descricao } = req.body
        const updatedLocal = await Locais
            .findByIdAndUpdate(req.params.id, {
                nome, estado, cidade, categoria, descricao
            })
        res.status(200).json(updatedLocal)
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: error.message })
    }
}

const deleteById = async (req, res) => {
    try {
        const { id } = req.params
        await Locais.findByIdAndDelete(id)
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