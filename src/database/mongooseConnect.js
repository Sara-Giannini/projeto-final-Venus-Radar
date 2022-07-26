const DATABASE_URI = "mongodb+srv://sara593:WNz3LXNYkW1xsB8w@cluster0.p4lkr.mongodb.net/projeto_final"
const mongoose = require('mongoose')

const connect = async () => {
    try {
        await mongoose.connect(DATABASE_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        console.log('banco conectado')
    } catch (error) {
        console.error(error)
    }
}

module.exports = {
    connect
}
