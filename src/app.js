require('dotenv-safe').config()
const express = require('express')
const cors = require('cors')
const mongoose = require('./database/mongooseConnect')
const locaisRoutes = require('./routes/locaisRoutes')
const usuariosRoutes = require('./routes/usuariosRoutes')
const profissionaisRoutes = require('./routes/profissionaisRoutes')

const app = express()

app.use(express.json())
app.use(cors())

mongoose.connect()

app.use(locaisRoutes)
app.use(usuariosRoutes)
app.use(profissionaisRoutes)

const swaggerUi = require('swagger-ui-express');

const swaggerFile = require('../swagger/swagger_output.json');

app.use('/minha-rota-de-documentacao', swaggerUi.serve, swaggerUi.setup(swaggerFile));

module.exports = app