require('dotenv').config
const express = require('express')
const cors = require('cors')
const mongoose = require('./database/mongooseConnect')
const locaisRoutes = require('./routes/locaisRoutes')
const usuariosRoutes = require('./routes/usuariosRoutes')

const app = express()

app.use(express.json())
app.use(cors())

mongoose.connect()

app.use(locaisRoutes)
app.use(usuariosRoutes)

module.exports = app